// Vendored from @openai/sites-vite-plugin 0.2.0 (openai/sites#9).
// See sites-vite-plugin.LICENSE for the upstream MIT license.
import { access, cp, mkdir, rm } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { resolve } from "node:path";
import type { Plugin } from "vite";

const localCookieName = "__sites_local_auth";
const localHosts = new Set(["localhost", "127.0.0.1", "::1"]);
const localAddresses = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);
const authPaths = new Set([
  "/signin-with-chatgpt",
  "/signout-with-chatgpt",
  "/callback",
]);

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

export function sites({ mockAuth = true } = {}): Plugin {
  let root = process.cwd();
  let command: "build" | "serve" = "build";

  return {
    name: "sites",
    configResolved(config) {
      root = config.root;
      command = config.command;
    },
    configureServer(server) {
      if (!mockAuth) return;
      const secure = Boolean(server.config.server.https);

      server.config.logger.info("Sites local sign-in: enter an email to test an account.");
      server.middlewares.use((request, response, next) => {
        for (const name of Object.keys(request.headers)) {
          if (name.startsWith("oai-authenticated-user-")) {
            removeHeader(request, name);
          }
        }

        let authority: URL;
        let url: URL;
        try {
          authority = new URL(
            `${secure ? "https" : "http"}://${request.headers.host}`,
          );
          url = new URL(request.url ?? "/", authority);
        } catch {
          if (authPaths.has((request.url ?? "/").split("?")[0])) {
            respond(response, 403);
          } else {
            next();
          }
          return;
        }

        const hostname = authority.hostname
          .replace(/^\[|\]$/g, "")
          .toLowerCase();
        if (
          !localHosts.has(hostname) ||
          !localAddresses.has(request.socket.remoteAddress ?? "") ||
          url.origin !== authority.origin
        ) {
          if (authPaths.has(url.pathname)) respond(response, 403);
          else next();
          return;
        }

        const cookies = (request.headers.cookie ?? "")
          .split(";")
          .map((cookie) => cookie.trim())
          .filter(Boolean);
        const signInCookies = cookies
          .filter((cookie) => cookie.startsWith(`${localCookieName}=`))
          .map((cookie) => cookie.slice(localCookieName.length + 1));
        const applicationCookies = cookies.filter(
          (cookie) => !cookie.startsWith(`${localCookieName}=`),
        );
        if (applicationCookies.length !== cookies.length) {
          removeHeader(request, "cookie");
          if (applicationCookies.length) {
            setHeader(request, "cookie", applicationCookies.join("; "));
          }
        }

        if (url.pathname === "/callback") {
          respond(response, 501);
          return;
        }

        const signIn = url.pathname === "/signin-with-chatgpt";
        const signOut = url.pathname === "/signout-with-chatgpt";
        const localIdentity =
          signInCookies.length === 1
            ? localIdentityFromCookie(signInCookies[0])
            : null;
        if (!signIn && !signOut) {
          if (localIdentity) {
            setHeader(request, "oai-authenticated-user-id", localIdentity.userId);
            setHeader(request, "oai-authenticated-user-email", localIdentity.email);
            setHeader(
              request,
              "oai-authenticated-user-full-name",
              encodeURIComponent(localIdentity.fullName),
            );
            setHeader(
              request,
              "oai-authenticated-user-full-name-encoding",
              "percent-encoded-utf-8",
            );
          }
          next();
          return;
        }

        if (
          (request.headers.origin && request.headers.origin !== url.origin) ||
          request.headers["sec-fetch-site"] === "cross-site"
        ) {
          respond(response, 403);
          return;
        }

        if (
          request.headers["next-router-prefetch"] !== undefined ||
          request.headers["x-middleware-prefetch"] === "1" ||
          [request.headers.purpose, request.headers["sec-purpose"]].some(
            (value) =>
              typeof value === "string" &&
              value
                .split(/[;,]/)
                .some((part) => part.trim().toLowerCase() === "prefetch"),
          )
        ) {
          respond(response, 204);
          return;
        }

        if (
          request.method !== "GET" &&
          (!signOut || request.method !== "POST")
        ) {
          response.setHeader("Allow", signIn ? "GET" : "GET, POST");
          respond(response, 405);
          return;
        }

        if (signIn) {
          const email = normaliseEmail(url.searchParams.get("email"));
          if (!email) {
            renderLocalSignIn(response, safeReturn(url.searchParams.get("return_to")));
            return;
          }

          response.statusCode = 302;
          response.setHeader("Cache-Control", "private, no-store");
          response.setHeader("Location", safeReturn(url.searchParams.get("return_to")));
          response.setHeader(
            "Set-Cookie",
            `${localCookieName}=${encodeURIComponent(email)}; Path=/; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`,
          );
          response.end();
          return;
        }

        response.statusCode = request.method === "POST" ? 303 : 302;
        response.setHeader("Cache-Control", "private, no-store");
        response.setHeader(
          "Location",
          safeReturn(url.searchParams.get("return_to")),
        );
        response.setHeader(
          "Set-Cookie",
          `${localCookieName}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`,
        );
        response.end();
      });
    },
    async closeBundle() {
      if (command !== "build") return;

      const outputDirectory = resolve(root, "dist", ".openai");
      const hostingConfig = resolve(root, ".openai", "hosting.json");
      const drizzleSource = resolve(root, "drizzle");

      await rm(outputDirectory, { recursive: true, force: true });
      await mkdir(outputDirectory, { recursive: true });

      await cp(hostingConfig, resolve(outputDirectory, "hosting.json"));
      if (await exists(drizzleSource)) {
        await cp(drizzleSource, resolve(outputDirectory, "drizzle"), {
          recursive: true,
        });
      }
    },
  };
}

function removeHeader(request: IncomingMessage, name: string): void {
  delete request.headers[name];
  for (let index = request.rawHeaders.length - 2; index >= 0; index -= 2) {
    if (request.rawHeaders[index]?.toLowerCase() === name) {
      request.rawHeaders.splice(index, 2);
    }
  }
}

function setHeader(
  request: IncomingMessage,
  name: string,
  value: string,
): void {
  removeHeader(request, name);
  request.headers[name] = value;
  request.rawHeaders.push(name, value);
}

function respond(response: ServerResponse, status: number): void {
  response.statusCode = status;
  response.setHeader("Cache-Control", "private, no-store");
  response.end();
}

type LocalIdentity = {
  userId: string;
  email: string;
  fullName: string;
};

function localIdentityFromCookie(value: string): LocalIdentity | null {
  let email: string | null;
  try {
    email = normaliseEmail(decodeURIComponent(value));
  } catch {
    return null;
  }
  if (!email) return null;

  const name = email
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");
  return {
    userId: `local_mobora_${encodeURIComponent(email)}`,
    email,
    fullName: name || "MOBORA customer",
  };
}

function normaliseEmail(value: string | null): string | null {
  const email = value?.trim().toLowerCase();
  if (!email || email.length > 254) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

function renderLocalSignIn(response: ServerResponse, returnTo: string): void {
  response.statusCode = 200;
  response.setHeader("Cache-Control", "private, no-store");
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.end(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sign in | MOBORA</title>
<style>body{margin:0;background:#0d120d;color:#f6f5ee;font-family:Arial,sans-serif;display:grid;min-height:100vh;place-items:center}.card{width:min(420px,calc(100% - 40px));box-sizing:border-box;padding:36px;border:1px solid #405134;border-radius:18px;background:#172015;box-shadow:0 24px 80px #0008}.eyebrow{color:#b7c77b;letter-spacing:.12em;font-size:12px;font-weight:bold}h1{font-size:32px;margin:12px 0}p,small{color:#b9c6ae;line-height:1.55}label{display:block;margin:24px 0 8px;font-weight:bold}input{box-sizing:border-box;width:100%;padding:14px;border:1px solid #526c3e;border-radius:10px;background:#0d120d;color:#fff;font-size:16px}button{width:100%;margin-top:20px;padding:14px;border:0;border-radius:10px;background:#f0ad79;color:#17120d;font-weight:bold;font-size:16px;cursor:pointer}small{display:block;margin-top:20px}</style></head>
<body><main class="card"><div class="eyebrow">MOBORA · LOCAL DEVELOPMENT</div><h1>Sign in to test an account</h1><p>Enter the email for the account you want to test. Admin access appears only for the authorised admin email.</p><form method="get" action="/signin-with-chatgpt"><input type="hidden" name="return_to" value="${escapeHtml(returnTo)}"><label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email" required placeholder="you@example.com"><button type="submit">Continue to MOBORA</button></form><small>This local-only screen is for testing. The published site uses its standard sign-in system.</small></main></body></html>`);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function safeReturn(value: string | null): string {
  if (!value?.startsWith("/") || value.startsWith("//")) return "/";

  try {
    const url = new URL(value, "http://localhost");
    if (url.origin !== "http://localhost" || authPaths.has(url.pathname)) {
      return "/";
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}
