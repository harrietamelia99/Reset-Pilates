This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Momence (booking)

Environment variables live in `.env.local` locally and in Vercel for production. See `.env.example` for names.

1. **Customer booking (embedded Momence):** “Book” goes to **`/book`**, which iframes the studio Momence URL ([storefront example](https://momence.com/u/reset-pilates-NZotvt)). **`NEXT_PUBLIC_MOMENCE_SCHEDULE_URL`** overrides that default only if Momence gives you a new link; redeploy after changing it.
2. **OAuth Public API (`api.momence.com`):** create a **Public API client** in Momence ([Developer API / Apps & integrations](https://momence.com/dashboard/profile?host-redirect=public-api-clients)).
3. Follow [Momence OAuth2](https://api.docs.momence.com/docs/getting-started): use `MOMENCE_CLIENT_ID` and `MOMENCE_CLIENT_SECRET`, then store short-lived `MOMENCE_ACCESS_TOKEN` and `MOMENCE_REFRESH_TOKEN` after you exchange a code or run the staff password flow. A single bearer pasted as **`MOMENCE_TOKEN`** is treated the same as **`MOMENCE_ACCESS_TOKEN`**.
4. **`lib/server/momence-config.ts`** reads this for future API work.
5. **Post-booking transactional email:** `POST /api/webhooks/booking` expects header `x-reset-booking-secret` matching **`BOOKING_WEBHOOK_SECRET`** — configure in Momence if their webhooks match the payload in `app/api/webhooks/booking/route.ts`.
6. **Primary list API (`hostId` + `token` query params — different host from OAuth API):** set **`MOMENCE_HOST_ID`** and **`MOMENCE_PRIMARY_SITE_TOKEN`** (see `.env.example`). Helpers live in **`lib/server/momence-primary-api.ts`**. While logged into **`/studio`**, you can sanity-check responses with `GET /api/studio/momence-primary/Events` (same for `Videos`, `Memberships`, `Products`, `Teachers`). Prefer using that proxy or server code so the site token never ships to browsers.
