# AZHELHA | أزهلها

Arabic-first, RTL service marketplace prototype for Al Kharj. Built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, Lucide and accessible Radix dialog primitives. IBM Plex Sans Arabic is bundled locally with no external font request.

## Run locally

Requires Node.js 20.9+ (Node 22 or 24 recommended).

```bash
npm ci
npm run dev
```

Open http://localhost:3000. For production output:

```bash
npm run typecheck
npm test
npm run build
npm start
```

The project uses Next.js static export. `out/` can be hosted on any static hosting provider. `next start` is not supported with static export; use `npm start` instead.

## Try the prototype

- Discover workshops; select a service, edit the vehicle, filter prices/rating/neighborhood/warranty/availability, sort results, and compare up to three workshops.
- Inspect a workshop, then book in three steps. Confirmation creates a demo reference and saves the booking.
- Account → quotations has a seeded engine diagnosis quotation. Approve or reject it.
- The top role switch opens the workshop experience. Select the workshop, manage bookings, advance sequential statuses, and send updates.
- A diagnosis repair cannot move to repair until its initial quotation is approved. New charges create an additional quotation and pause repair until separately approved. Rejected charges are excluded from totals.
- Workshops can manage prices and service availability. Price changes affect new bookings only.
- Advance a fixed-price booking to completed, then return to the customer view and submit the four-category review. Only completed bookings can be reviewed, once.
- Completed bookings show workshop warranty details and a hypothetical 5% commission calculation.

## Source structure

- `app/`: Next.js entry points, metadata, local fonts and responsive design tokens/styles.
- `components/ui.tsx`: reusable buttons, accessible focus-trapped dialogs, section headings and empty states.
- `components/azhelha.tsx`: customer/workshop screens and shared persistent demo interactions.
- `lib/domain.ts`: typed vehicles, 10 fictional workshops, services, sample bookings, quotes, review and repair rules.
- `tests/domain.test.ts`: approval, rejection, extra charges, status transitions and review restrictions.

## Simulated features

All workshops, ratings, appointments, locations, distances, reviews and prices are fictional and labeled in the UI. Prices are illustrative final amounts, not tax invoices. State persists in browser localStorage under `azhelha-demo-v1`; customer and workshop roles share it, including updates across tabs on the same origin. Remove that key to reset the demo. There is no real authentication, payment, booking delivery, inventory, notification or multi-user synchronization. Car compatibility must be confirmed by a real workshop. Loyalty is a future-feature preview only. Workshop warranties are workshop promises; AZHELHA does not independently guarantee repairs. The commission is an unapproved business hypothesis.

## Before production

Add authenticated customer/workshop roles, a durable database and server-enforced authorization and quote-approval state machine with audit logs. Validate all persisted data on the server; the browser is not a security boundary. Integrate real workshop onboarding, service/vehicle compatibility, accurate availability and maps, transaction-backed reviews, published ranking criteria, messaging/notifications and Saudi privacy/legal requirements. If payments are added, use a licensed gateway, proper VAT invoicing, refunds and reconciliations. Define signed commercial and warranty policies. Add full browser, accessibility, cross-device and integration coverage before launch.

## Verification

`npm test` runs six domain tests. Browser QA additionally covers workshop filters, comparison, a confirmed three-step booking, initial and additional quotation approval, blocked repair before approval, role synchronization, persisted state after reload, completed-booking review, desktop/mobile layout overflow, and uncaught browser errors. The optional `scripts/browser-qa.cjs` requires Playwright Core and Chromium; set `AZHELHA_PLAYWRIGHT_MODULE` and `AZHELHA_CHROMIUM_PATH` to their local paths and run against a clean preview on port 3000. It creates test bookings in that browser context only.
