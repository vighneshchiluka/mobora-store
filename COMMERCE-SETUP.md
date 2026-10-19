# MOBORA commerce

The published storefront remains owner-private. Customer sign-in uses the Sites platform’s ChatGPT sign-in; MOBORA registration then saves name and mobile number in D1. No passwords are stored. The configured admin is **moboraaccessories@gmail.com**; sign in with that email at `/admin`. All dashboard APIs check the admin allowlist on the server.

## Payment connection

Razorpay Standard Checkout is implemented, with server-created orders, INR amounts calculated from the catalogue, HMAC signature checks and captured-payment verification against Razorpay’s API. Available UPI apps (GPay, Paytm and others), debit/credit cards, RuPay and netbanking depend on merchant activation and customer device. MOBORA never collects card data or UPI PINs.

Set these values in secure Sites runtime settings, then redeploy. Do not put secrets in Git, the hosting manifest, browser code or chat.

| Variable | Purpose |
| --- | --- |
| `ADMIN_EMAILS` | Already configured to the authorised admin email. |
| `RAZORPAY_KEY_ID` | Merchant test key ID first; use live ID only after testing. |
| `RAZORPAY_KEY_SECRET` | Matching secret key, stored as a secret. |
| `RAZORPAY_WEBHOOK_SECRET` | Secret for validating Razorpay webhook bodies. |
| `SHIPPING_PAISE` | Explicit flat delivery charge in paise; `0` means free shipping. |
| `PAYMENTS_ENABLED` | `true` enables payment after the keys and shipping are configured. |

Until then, checkout saves clearly labelled order requests and takes no payment. Existing requests retain indicative totals and cannot be paid directly; start a fresh checkout once final prices and shipping are configured. Review the catalogue prices and availability before enabling payments.

Configure automatic capture in Razorpay. Standard Checkout returns through a browser handler; the backend verifies its HMAC and independently checks for a captured payment of the correct amount, currency and gateway order ID. Orders which are only authorised remain unpaid. Both customer and admin refresh can reconcile captured payments.

Webhook endpoint: `/api/payments/webhook`. Subscribe to `payment.captured` and `order.paid`. **The current private Site access boundary blocks unauthenticated Razorpay webhooks.** While private, use browser verification and order refresh for reconciliation. For a public launch, explicitly change audience only when requested, test the webhook from Razorpay, and confirm the production sign-in flow, support contact, business address, shipping, returns and privacy arrangements. No paid launch or public access was enabled in this update.

Test payment success, failure, dismissal, retry, authorised-but-not-captured, duplicate and out-of-order webhook delivery, payment refresh, refund handling and mobile UPI intents with merchant test credentials before using live keys. No gateway transaction has been run because merchant keys were not supplied.

## Order management

Dashboard: `/admin`. Customer orders: `/orders`. Account registration: `/account`. Wishlist: `/wishlist`. Checkout: `/checkout`.

The dashboard shows the latest 100 orders, profiles and legacy enquiries. It provides search, status filtering, address/contact review, private artwork access, payment totals and courier/tracking fields. Payment statuses are provider-verified, not admin-editable. Paid orders move through confirmed → processing → printing → shipped → delivered (processing can ship directly for accessories). Shipping requires courier and tracking number. Unpaid requests can be cancelled. Paid cancellation/refunds must be handled in Razorpay; automatic refund reconciliation and notification emails/SMS are not implemented.

## Validation and local data

Schema migrations in `drizzle/` create customer, wishlist, order and event tables. Production migrations are applied by Sites publication. Preview state is separate and is never deployed.

Run `node tests/commerce-api.mjs` against the local preview with no local admin allowlist first. It validates auth, origin protection, server pricing, retry idempotency, wishlist persistence, artwork requirements and payment gating. Then use an ignored local `.dev.vars` containing `ADMIN_EMAILS="seedy@sites.test"`, restart preview, and run `node tests/admin-api.mjs`. Local mock identity is provided by the existing Sites preview plugin only; it is absent in production. All sample records remain local.

Original vector artwork for Coffee & Little Joys, Somewhere With You and Midnight Botanica is included in `public/designs/`. Illustrations are previews; manufacturing cutout templates still require supplier verification.
