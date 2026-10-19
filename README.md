# MOBORA

React + Next.js App Router source, Tailwind CSS, Redux Toolkit. Sites uses the supplied Vinext compatibility runtime to deploy Next.js routes to Cloudflare Workers. Durable enquiries use D1; original customer artwork uses private R2 storage.

## Run locally

Use Node 22.13+ and npm. Run `npm ci`, then `npm run db:generate` only when changing the schema. Build once, then apply each pending local SQL migration with `node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_wonderful_grim_reaper.sql`. Do not replay an already applied migration. Run `npm run dev`.

## Implemented

Phone brand/model selection; category, name and price filters; sorting; original cover illustrations; six Instagram product photos with post attribution; custom photo and text preview; original artwork uploads; Redux bag; durable enquiry submission with server catalogue validation; Mumbai landing page; server-rendered headings and content; canonical metadata, Open Graph, Organization schema, robots and sitemap.

## Before accepting paid orders

Replace the sample products, indicative prices, model compatibility and photos with your confirmed inventory. Confirm permission for product imagery. Provide real business contact details and address if applicable. Configure payment verification and fulfilment, final shipping/returns and upload deletion/retention policies, bot protection and authenticated owner enquiry management. Enquiries are stored in D1, but no email notification or owner dashboard is connected yet. Public image upload and enquiry endpoints should receive rate limiting/bot protection before public launch. Site defaults to owner-private; private deployments cannot be indexed by search engines. SEO groundwork does not guarantee ranking. Add your final public domain to metadata, robots and sitemap, then verify Google Search Console and submit sitemap when publicly launched.

## Artwork

Preview is illustrative and uses centred cropping; camera placement varies by model. Original files and optional text are retained for human artwork confirmation; no production print template or automated print file is claimed. The hero and catalogue illustrations are original SVG/CSS-style designs. Gallery photos were obtained from the user-specified Instagram page on 19 October 2026. They are presented as Ganraj collection examples, not as verified MOBORA inventory.


## Clean storefront update

The homepage and /mobile-cover use a centred, searchable brand/model accordion. /accessories is a dedicated catalogue for grips, cables, chargers and screen protectors. Both catalogues have min/max prices, budget presets, category/type, colour, sort and search controls. Accessories also filter by device compatibility. Mobile filters collapse with a Show products button. The selected phone carries between pages in session storage; bag items persist locally. DM Sans is hosted locally with its SIL Open Font License in public/fonts/OFL.txt. The original Instagram photos remain in an expandable collection section. Paid checkout and an owner dashboard remain unimplemented as described above.
