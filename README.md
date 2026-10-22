# PromptCraft

A gallery of ready-to-use AI website prompts. Browse, preview, click **Copy prompt**, paste into Lovable / Bolt / Cursor / Claude — launch a landing page in minutes.

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server
npm test           # vitest in watch mode (CI: npm test -- --run)
npm run build      # production build → dist/
```

## Structure

- `src/data/prompts.json` — **the whole prompt catalog lives here.** To add a prompt, copy an existing entry and fill the fields (`id`, `title`, `category` — one of `SaaS | Portfolio | 3D | Fintech | Agency | Ecommerce`, `tier` — `free | premium`, `featured`, `popularity` (number, higher = more popular), `addedAt` (`YYYY-MM-DD`), `description`, `prompt`). No code changes needed — the data-integrity tests enforce the shape.
- `src/data/site.js` — brand name, tagline, tier labels. Rename the site here.
- `src/lib/promptLibrary.js` — filtering/sorting logic (pure, unit-tested).
- `src/lib/useCopy.js` — copy-to-clipboard with `execCommand` fallback.
- `src/pages/` — Home (gallery), PromptDetail, Backgrounds (animated demos), Pricing.
- `src/index.css` — Tailwind + the animated background demos (CSS keyframes).

## Rename checklist

1. `src/data/site.js` — `SITE_NAME`, `TAGLINE`.
2. `index.html` — `<title>` and meta description (static shell, one edit).

## Deploying (static hosts)

`npm run build` emits `dist/`. The app uses client-side routing, so configure your host for SPA fallback — the built-in `public/_redirects` handles Netlify natively; on other hosts set a catch-all rewrite of any path to `/index.html`. Deep links like `/prompt/beaconstack` then work on refresh.
