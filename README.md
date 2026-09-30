# Beyond the Headline Count

An interactive P302 editorial data story for the **entirely fictional Meridian Signal Group**. All campaigns, outlets, articles, excerpts and annotations are invented. The story moves from an apparent volume winner to distinct stories and message inclusion in campaign-specific priority outlets.

Built independently with **Vue 3, TypeScript, Vite and D3 scales with Vue-rendered SVG**. No database, AI service, notifications, shared backend state, or analytics feed. Fonts and data are served locally with the app. All four chapters work without animation; JavaScript is required to render the Vue application.

- Repository: https://github.com/andy-fitts-slalom/beyond-the-headline-count (public, as subsequently authorized)
- Production URL: pending final deployment verification; see [progress](docs/PROGRESS.md).
- Vercel project: `andy-protogen/beyond-the-headline-count`; connected GitHub repository, intended production branch `main`.

## Run and verify

Node 22 or 24 and npm are supported.

```sh
npm ci
npm run dev
npm run generate:data
npm test
npm run build
npm run preview
npm run test:e2e
```

The browser suite uses installed Google Chrome by default. In CI or with Playwright-managed Chromium:

```sh
npx playwright install chromium
PLAYWRIGHT_CHANNEL=chromium npm run test:e2e
```

Run the same suite against production:

```sh
PLAYWRIGHT_BASE_URL=https://beyond-the-headline-count.vercel.app npm run test:e2e
```

Tests cover deterministic data, links/originals, deduplication, rates and denominator invariance, rankings, null versus zero, article evidence, resets, empty search, download success/failure, keyboard focus, reduced motion, direct chapter loads/refresh, responsive layouts and automated accessibility. See [verification](docs/VERIFICATION.md) for observed results and limitations.

## Dataset and measures

`npm run generate:data` deterministically regenerates `src/data/dataset.json`; no random seed or external source is required. The six-week window is February 2–March 15, 2026. There are 240 article records across three campaigns. [Data dictionary and generation assumptions](docs/DATA.md) explain the deliberately constructed distributions and prepared editorial annotations.

- **Published coverage:** count of article records, including syndicated copies.
- **Distinct stories:** unique `storyGroupId` values. Every group identifies one original article and belongs to one campaign.
- **Priority placements:** articles in outlets specifically prioritized by their campaign.
- **Priority message inclusion:** eligible articles with `messageIncluded=true` divided by all priority-placement articles. Both numerator and denominator are shown. Zero priority placements produce `null` / “Unavailable,” never 0%.

All charts and numerical narrative claims derive from the local records through `src/data/metrics.ts`. The volume toggle changes only the second volume chart. Campaign selection highlights comparisons without filtering populations. Evidence search affects only the supporting article list, which previews up to six matches; the complete dataset is downloadable. The unavailable-data demonstration is separate from the campaign records.

## Interpretation limits

Syndication can extend distribution; it is not inherently bad. Article counts are not unique audience reach. Message inclusion is not proof of reader understanding, behavior change or revenue impact. Labels are prepared fictional editorial annotations, not runtime AI judgments. The constructed data illustrates a scenario, not generalizable research or a causal result.

## Project structure

- `src/App.vue`: editorial narrative, controls, evidence and methods
- `src/components/VolumeChart.vue`: shared D3 scale / SVG comparison
- `src/data/`: complete typed JSON source and shared metrics
- `scripts/generate-data.mjs`: deterministic authoring assumptions
- `tests/`: unit and browser acceptance checks
- `docs/`: decisions, data dictionary, verification and durable continuation notes
- `public/licenses/`: full font license notices shipped with the site

See [BRIEF.md](BRIEF.md) for the acceptance contract and [AGENTS.md](AGENTS.md) before continuing work. Original prototype code is MIT licensed. Dependencies retain their own licenses; see [third-party notices](docs/THIRD_PARTY_NOTICES.md).

## Deployment

Vercel settings are in `vercel.json`: Vite, `npm ci`, `npm run build`, output `dist`. Use the dedicated project only. Production is built from `main`; chapter URLs use document anchors such as `/#message`, so direct loads and refreshes need no client-side route rewrite. Unknown paths should remain 404s.

To deploy manually with authorized account access:

```sh
npx vercel link --project beyond-the-headline-count --scope andy-protogen
npx vercel --prod --scope andy-protogen
```

Never commit `.vercel`, `.env*`, credentials or build output. Open and test the production URL after changes before calling the deployment verified.
