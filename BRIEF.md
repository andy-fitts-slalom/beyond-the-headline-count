# Beyond the Headline Count — Project Brief

## What is this?

An interactive editorial data story for communications leadership at Meridian Signal Group, a fictional media company with streaming, publishing, podcast, and live-event businesses. Regional press teams report campaign results to a central communications team.

The story's point of view is: the campaign with the most coverage did not carry its intended message most consistently in the outlets it aimed to reach. Lead the reader from an appealing headline count to a more thoughtful comparison of distinct stories, priority placements, and message inclusion.

This is a P302 narrative experience. It should have an opening question, a reveal, supporting evidence, and a clear takeaway. Every campaign, article, outlet, annotation, and number is invented for this demonstration. The results illustrate a fictional scenario, not findings about a real company or the wider industry.

## Data

Create a deterministic local JSON dataset under `src/data/`, with TypeScript types, a data dictionary, and documented generation assumptions. Use three invented campaigns across six weeks and approximately 240 article records. Possible campaign premises are a podcast launch, a streaming showcase, and a digital magazine series.

- Campaigns: ID, name, purpose, dates, intended audience, and one explicitly defined primary message.
- Outlets: ID, fictional name, category, and relevant audience. Priority status is specific to each campaign, not a universal outlet quality score.
- Articles: ID, campaign ID, outlet ID, date, fictional headline and excerpt, original-story group ID, and a Boolean message-inclusion annotation.
- Story groups: stable IDs linking an original article to syndicated copies. Every article belongs to exactly one group; every group belongs to one campaign and has an identifiable original article.
- Provide several readable article examples so a user can inspect what a message-inclusion label means. These are prepared fictional editorial annotations, not live AI judgments.

Design a coherent dataset in which the campaign with the highest published-item count has more repeated coverage and a lower message-inclusion rate in its priority outlets. Another campaign should show fewer items but stronger message inclusion. Include enough variation to avoid a perfectly tidy ranking on every measure. Derive all displayed numbers from the records; do not hard-code chart claims separately.

## Metric definitions

- Published coverage: number of article records.
- Distinct stories: number of unique original-story group IDs.
- Priority placements: article records appearing in an outlet marked as a priority for that campaign.
- Message-inclusion rate in priority placements: priority-placement articles containing the campaign's primary message divided by all priority-placement articles. Display numerator and denominator.
- A campaign with no priority placements has an unavailable rate, not a zero-percent result.

Syndication is not automatically bad or worthless. Article counts are not unique audience reach. Message inclusion is not proof of reader understanding, behavior change, or revenue impact. Make those distinctions in the narrative and methodology.

## Story structure and layout

1. **The apparent winner:** present the three campaigns and their raw coverage totals. Ask what a volume-only report would conclude.
2. **What the count hides:** transform the comparison from published items to distinct stories, explaining repeated coverage with a concrete example.
3. **Did the message appear where it mattered?** compare priority placements and message-inclusion rates. Let readers inspect supporting article examples.
4. **A better reporting question:** finish with a concise comparison of the campaigns and a takeaway about defining success before counting coverage.

Use a readable editorial layout with a clear narrative spine, annotated charts, and restrained transitions. A sticky graphic may support the desktop story. On mobile, keep each explanation next to its chart and provide explicit next/back controls where useful. All content must remain understandable without scroll-triggered animation.

## Interactions and behavior

- Toggle published-item versus distinct-story counts in the volume section. Clearly label that the toggle changes the volume comparison, not the denominator of the separate message-inclusion chart.
- Select a campaign to highlight its path through the story; retain comparisons needed to understand the main argument.
- Open article evidence and see its campaign, outlet priority status, message label, and story group.
- Provide a small methodology/data view with definitions and a downloadable copy of the fictional dataset.
- Include reset controls and an explicit unavailable-data example or test fixture. Avoid turning the story into an unrestricted dashboard with a narrative that contradicts the selected filters.

## Style and design intent

Use an editorial visual identity with strong typography, ample whitespace, and a limited palette. The opening chart should make the initial conclusion easy to see; subsequent sections should reveal why it is incomplete. Do not rely on animation alone to convey the reveal.

Provide visible focus, keyboard-operable controls, meaningful chart text or data tables, and reduced-motion behavior. Do not encode campaigns only by color. Label the project and its dataset as fictional without interrupting every paragraph.

## Tech

- Vue 3, TypeScript, and Vite.
- D3 scales and shapes with Vue-rendered SVG for bespoke charts; avoid competing control of the same DOM nodes.
- Purpose-built CSS and semantic HTML for the editorial layout. A full dashboard component library is unnecessary.
- Local JSON, with no database, live analytics feed, or AI API required.
- Unit tests for deduplication, rates, denominators, and chart/narrative consistency; browser tests for the toggle, campaign selection, evidence view, and mobile reading flow.

## Acceptance criteria

A first-time reader can state the main takeaway after completing the story. The volume toggle changes the appropriate counts correctly; evidence supports every numerical narrative claim; rates expose their denominator; and no view implies unique reach or causal business impact. The story works with keyboard navigation, reduced motion, and phone-sized screens. The production build and deployed URL work, including direct loads and refreshes.

## Repository and delivery

Use a dedicated private GitHub repository named `beyond-the-headline-count` under `andy-fitts-slalom`, plus a separate Vercel project with the same name if available. Record any necessary Vercel naming adjustment.

Keep `BRIEF.md`, `README.md`, and `LICENSE` in the root. Use an MIT license for original prototype code and preserve dependency notices. The README covers the fictional premise, setup, commands, dataset generation, metric definitions, methodology limits, and live URL. Keep agent instructions and dated design decisions/progress in an organized `docs/` structure and an appropriate root `AGENTS.md`.

Make and push descriptive commits as the planning, dataset, story structure, interactions, and verification are completed. Do not invent history or claim real user-research results. Verify the final deployed reading experience and document any remaining limitations.


## 2026-09-30 — Frame naming, design and publication addendum

This dated addendum supersedes naming, presentation and delivery details above while preserving the original planning evidence. **Frame** is the interactive editorial data story of the fictional **Vesper Media Group**. The narrative headline remains “Beyond the headline count.” No real client, proprietary organization material or real research informs the product.

Upgrade the already adopted Meridian UI 1.0.0 to the portable `vendor/vesper-ui-2.0.0.tgz` (`@vesper/ui` 2.0.0). Use the VesperBrand V-and-star mark, semantic paper/editorial tokens, locally served DM Sans UI and Libre Caslon Display. Preserve Vue/TypeScript/Vite, D3 scales/shapes and Vue-rendered SVG, native evidence dialog and print reading. Keep a single local campaign palette from `vesperChartStyle('paper')`: signal→0, frame→1, folio→2. Direct names, counts, underline/outline selection and numerator/denominator labels accompany color.

Preserve all four chapters, the reporting takeaway, direct anchors, retained comparisons, volume toggle, rate cards, searchable evidence with focus return, syndication disclosure, final comparison table, methodology, unavailable example and complete JSON download. The 240 records, six-week window, campaign IDs, original dataset metadata title and metric definitions remain unchanged; the product name Frame does not rename the campaign ID frame. Download filename becomes `frame-fictional-dataset.json`, with unchanged contents.

Delivery is the dedicated public repository https://github.com/andy-fitts-slalom/frame and Vercel project https://vercel.com/andy-protogen/frame. Work, descriptive milestone commits and pushes are authorized on main only, with existing history preserved. The existing production domain remains https://beyond-the-headline-count.vercel.app. A new domain/routing change was blocked by automatic approval review in the parent task; no routing change is authorized here. Password protection is optional, and the fictional site should remain accessible to reviewers.

Acceptance includes a live accessible build, working original flows, root README and MIT LICENSE, useful agent/context docs, descriptive history, media-appropriate hierarchy, responsive/error states, and evidence in PROGRESS, DECISIONS and VERIFICATION. Run npm test, npm run build and npm run test:e2e before push; inspect rendered phone/desktop, keyboard, reduced motion, print and 200% zoom-equivalent behavior. Open the production URL and verify its main revision after push. Record actual results and limitations without claiming participant research or native-device certification.
