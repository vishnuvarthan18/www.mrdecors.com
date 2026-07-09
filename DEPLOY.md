# Deploying MR Decors to Cloudflare

The site runs on **Cloudflare Workers** (via the OpenNext adapter) with
**D1** (portfolio database) and **R2** (uploaded images). Local `next dev`
uses a local D1 + R2 automatically (miniflare), so what you see locally is
what deploys.

## One-time setup

```bash
# 1. Log in to your Cloudflare account
npx wrangler login

# 2. Create the D1 database, then paste the printed database_id
#    into wrangler.jsonc -> d1_databases[0].database_id
npx wrangler d1 create mr-decors-db

# 3. Create the R2 bucket for uploaded images
npx wrangler r2 bucket create mr-decors-uploads

# 4. Create the portfolio table + seed data on the REMOTE database
npx wrangler d1 migrations apply mr-decors-db --remote

# 5. Set the admin secrets (used by the /admin login)
npx wrangler secret put ADMIN_PASSWORD        # choose a strong password
npx wrangler secret put ADMIN_SESSION_SECRET  # paste a long random string
```

Generate a session secret with:
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## Deploy

```bash
npm run deploy
```

This builds with OpenNext and publishes the Worker. Your site goes live at
`https://mr-decors-website.mrdecors.workers.dev` once deployed.

## Custom domain (`mrdecors.com`)

`wrangler.jsonc` is already configured for `mrdecors.com` and `www.mrdecors.com`.
For those routes to work, the domain must use **Cloudflare DNS** (it currently
points to Squarespace via Google Domains).

1. In the [Cloudflare dashboard](https://dash.cloudflare.com), click **Add a site**
   and enter `mrdecors.com`. Choose the Free plan.
2. Cloudflare will show two nameservers (e.g. `ada.ns.cloudflare.com`).
3. At your domain registrar (Google Domains / Squarespace Domains), replace the
   current nameservers with Cloudflare's.
4. Wait for DNS to propagate (usually 15 minutes to a few hours).
5. Redeploy:

```bash
npm run deploy
```

Cloudflare will create the DNS records for the Worker automatically. After that,
`https://www.mrdecors.com` and `https://mrdecors.com` will serve this app.

Until DNS is moved, use the workers.dev URL above.

## Local development

```bash
npm run dev            # normal Next.js dev (local D1 + R2 via miniflare)
```

If the local portfolio is ever empty, seed the local database:

```bash
npx wrangler d1 migrations apply mr-decors-db --local
```

## Instagram (optional)

1. Create a free account at behold.so and connect the `mr_laser_art` Instagram.
2. Copy the feed ID and set `NEXT_PUBLIC_BEHOLD_FEED_ID` (in the build env or
   wrangler `vars`), then redeploy. The live feed replaces the fallback grid.

## Notes

- After changing `wrangler.jsonc`, run `npm run cf-typegen` to refresh types.
- Images uploaded via `/admin` are stored in R2 and served through
  `/api/media/<file>`.
- Changing the admin password later: `npx wrangler secret put ADMIN_PASSWORD`.
