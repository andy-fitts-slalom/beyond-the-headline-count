# Progress and continuation

## README visual refresh — 2026-10-01

The README now embeds `docs/screenshots/vesper-3.0.0/readme-hero.png`, captured from the local Vesper UI 3.0 production build at 1440 × 1150 after fonts loaded. The editorial hero and opening chapter were inspected without browser page errors. No data or runtime source changed; 7 unit tests, production build and 20 browser tests passed.

## Production confirmation — 2026-10-01

Commit `4ae4a02` was pushed to `main`. [GitHub verification](https://github.com/andy-fitts-slalom/frame/actions/runs/36832939589) passed, and Vercel reported the deployment complete. Opened [production Frame](https://beyond-the-headline-count.vercel.app/) in Chrome and confirmed the enlarged condensed headline, petrol emphasis, pale salt-flat background and four-chapter navigation. Existing domain and routes remain unchanged.


## Vesper UI 3.0 selected direction — 2026-10-01

- Adopted the chosen Frame image direction: pale salt-flat texture, cool gray paper tokens, bold Barlow Condensed display headings, petrol second line, and a quieter sticky chapter bar. The generated texture is bundled in the independent Vesper 3.0.0 tarball.
- Kept the fictional dataset, metric functions, chapter structure, interactions and routes unchanged. Updated one browser assertion from the superseded Caslon font to Barlow Condensed.
- Local verification: 7/7 unit tests, production build and 20/20 browser tests passed. Browser checks cover 320/390/768/1440px, keyboard/dialog states, print and 200% zoom-equivalent layout. The initial browser-server bind failed under sandbox permissions; the rerun passed with local-server access.
- Compared the selected 1487 × 1058 reference and rendered local Frame page side by side at the same CSS viewport; see `design-qa.md`. Production status is recorded after push. Earlier 2.0.0 results below are historical.


## Documentation sweep — 2026-09-30

Refreshed README onboarding, workflows, setup, project structure and dated verification context. Corrected current branding guidance and explicitly marked superseded planning/migration records as historical. Vesper UI 2.0.0 remains the vendored dependency; runtime source and package manifests contain no Meridian references. Historical screenshots, branch deployment exclusions and compatibility storage keys are preserved.

Validation: 7 unit tests, production build and 20 local browser tests passed; README local links resolve. Browser preview startup initially hit sandbox EPERM, then passed with approved local-server access. No application behavior or dataset changed. Existing production evidence remains dated; this documentation sweep does not claim a new live-site verification.

## Current handoff — Frame / Vesper 2.0.0, live and verified

- Main-only upgrade; all prior commits and screenshot evidence retained.
- npm test: 7 passed; npm run build: passed; npm run test:e2e: 20 passed.
- Rendered desktop, narrow-phone, dialog, zoom-equivalent and print screenshots inspected; see docs/screenshots/vesper-2.0.0.
- Live: https://beyond-the-headline-count.vercel.app — opened and inspected; all 20 production browser checks passed.
- Main commits: c7a129f (rebrand), b6e480b (tests/evidence). Git-triggered production deployment dpl_EmLpomr7bhtY13sjTvMwobc69LJy is Ready for b6e480bf05c710dede3af417d321871ea84eaf71.
- Independent archive install/build passed without a sibling package folder. GitHub Actions run 36824681618 passed its install/unit/build/browser steps.
- No domain or routing changes. The parent task's automatic approval review block on a new production domain remains; explicit approval is required for that separate change.

## Historical handoff — Meridian UI 1.0.0 migration complete, not deployed

- Current checkout: p-case-studies/p302-data-story. Review branch: refactor/meridian-ui-1.0.0. User authorized discrete GitHub milestone pushes; main remains untouched.
- Shared release is committed in vendor/ with npm lockfile integrity. Clean independent install/build passed.
- Local preview: http://127.0.0.1:4387. Restart with npm run preview -- --host 127.0.0.1 --port 4387 --strictPort.
- Required checks: 7 unit tests, production compilation and 19 browser tests pass. Original 12 journey checks remain unchanged. New checks cover four widths, SVG label sizes/color consistency, modal and recovery states, keyboard, 200% zoom-equivalent layout and print.
- Dataset SHA-256 unchanged: a4e7b743f77d0a52582ca64e7ca1a856b9e4dd824ea4d826521b5c0e1b6cf374. Domain metrics/generator untouched.
- Representative screenshots and state/viewport index: docs/screenshots/meridian-1.0.0/README.md. Detailed verification and limitations: docs/VERIFICATION.md.
- No unresolved implementation blocker. No refactor deployment: vercel.json disables this branch; a separate publication request is required before merging/pushing main or deploying. Previous live-site verification below does not verify this migration.

## Prior production handoff — 2026-09-30 (predates Meridian migration)

- Live: https://beyond-the-headline-count.vercel.app (opened and verified).
- Public repository: https://github.com/andy-fitts-slalom/beyond-the-headline-count.
- Vercel: Andy-Protogen / beyond-the-headline-count, linked to the repository with production branch main. No manual connection step remains.
- Seven unit tests, 12 local browser checks, 12 production browser checks, production build and GitHub Actions passed.
- No blocked steps. Remaining validation limits are in docs/VERIFICATION.md.
- Continue here: read BRIEF.md, AGENTS.md, docs/DATA.md and docs/DECISIONS.md. Use npm ci, npm test, npm run build, npm run test:e2e. Production checks use PLAYWRIGHT_BASE_URL.
- Local preview was served at http://127.0.0.1:4173; restart with npm run preview if needed.
- The record below is chronological; earlier pending statuses are historical, not current blockers.

## 2026-09-30 — Planning

- Workspace initially contained only BRIEF.md; compared byte-for-byte with supplied source (identical), then copied source as requested.
- No existing repository or ancestor AGENTS.md was found.
- GitHub identity verified outside the network sandbox: andy-fitts-slalom, repo/workflow scopes. Requested repository was not found under this account.
- Initial sandbox authentication failure was misleading; the unsandboxed authenticated check succeeded.
- Plan: deterministic mock records and shared metrics → editorial Vue structure → interactions → independent data and browser review → dedicated private GitHub/Vercel publication → deployed verification.
- Vercel account/team access remains to be checked. No deployment has been created or verified.

## 2026-09-30 — Dataset milestone

- Created dedicated repository and pushed planning commit. User subsequently authorized public visibility; GitHub now confirms PUBLIC.
- Deterministic dataset: 240 records; Signal 120 items / 24 stories / 18 of 60 priority inclusions, Frame 72 / 42 / 27 of 36, Folio 48 / 36 / 24 of 30.
- Seven initial metric tests pass: regeneration, referential integrity, dates, originals, deduplication, rankings, denominator independence and unavailable vs zero.
- Vercel CLI authenticated as andyfitts-4966; one accessible team: Andy-Protogen (andy-protogen), Hobby.
- User offered to connect Vercel to GitHub. Continue local implementation and deployment preparation; intended production branch is main.

## 2026-09-30 — Story structure and core interactions

- Four editorial chapters implemented with record-derived SVG bars, rate cards and comparison table.
- Implemented volume toggle, persistent highlighting across comparisons, reset, article evidence dialog, evidence search, JSON download and unavailable-data fixture.
- Independent review identified and fixed fragment-root evidence navigation, long chart labels, and a hard-coded unavailable example. Campaign names simplified to Signal, Frame and Folio; purposes retain campaign type.
- Production build and metric tests pass. Fonts are self-hosted; static reading does not depend on animation or external requests.
- Created Vercel project beyond-the-headline-count under sole available team andy-protogen. Browser acceptance suite and deployment verification are in progress.

## 2026-09-30 — Verification milestone

- All 12 browser acceptance cases pass across desktop and 390×844 phone viewports, with reduced motion, zero axe violations and zero console/uncaught browser errors.
- Reviewed actual screenshots for hero and message sections on both sizes; no clipping. Fixed keyboard accessibility of the horizontally scrollable mobile comparison table.
- Download error injection and empty evidence search both recover; evidence Escape restores focus. The no-priority fixture renders Unavailable via shared metrics.
- Vercel GitHub connection succeeded using existing access; API confirms andy-fitts-slalom/beyond-the-headline-count and productionBranch main. No user action is needed for Git connection.
- Added GitHub Actions verification and font license notices; self-hosted fonts avoid third-party runtime calls.
- Live deployment checks remain pending at this milestone.

## 2026-09-30 — Publication and durable handoff

- GitHub user andy-fitts-slalom and Vercel user andyfitts-4966 were verified; sole accessible Vercel team was Andy-Protogen.
- Both Git-triggered deployment and explicit production CLI deployment reached Ready. Production alias is https://beyond-the-headline-count.vercel.app.
- Opened actual deployed URL, inspected rendered page and screenshots, and reran all 12 browser cases against production successfully. Verified root and direct chapter reload, mobile flow, downloads and error recovery.
- GitHub Actions independently passed build, seven unit checks and 12 browser cases on Linux Chromium.
- Preserved supplied brief unchanged. Public visibility differs from its original private requirement by the user's explicit later authorization.
- User offered to connect Vercel manually; existing access allowed the connection to be completed instead. No token or reconnection request was needed.
- README, license, agent instructions, dataset dictionary, dated decisions, verification matrix and actual deployed screenshots are committed for later sessions.
- All actions are real local controls; no fake notifications or shared backend behavior. No real client data, proprietary code, internal corpus, or other case-study material was accessed.

## 2026-09-30 — Meridian UI migration started (not deployed)

- Found relocated checkout at p-case-studies/p302-data-story. Started from clean main at 2225488; no unrelated modifications.
- Read project brief, instructions and continuation/verification notes, all five shared design-system documents, and actual package CSS/Vue/chart exports.
- Baseline: 7 unit tests, production build and 12 browser tests passed. Initial sandbox regeneration was denied by the stale workspace root; rerunning with authorized filesystem access passed. Port 4173 had stale preview listeners; baseline browser verification uses this checkout's dedicated port 4387.
- Baseline screenshots: docs/screenshots/meridian-baseline (1440px hero and 390px message).
- Dataset SHA-256: a4e7b743f77d0a52582ca64e7ca1a856b9e4dd824ea4d826521b5c0e1b6cf374.
- User authorized milestone GitHub pushes after the pasted local-only instructions. Work is on refactor/meridian-ui-1.0.0, never main. vercel.json disables deployments for this branch before the first push, using Vercel's documented git.deploymentEnabled map.
- Vendored the supplied 1.0.0 tarball and installed via file:vendor/meridian-ui-1.0.0.tgz. No sibling runtime dependency, registry package or symlink.

## 2026-09-30 — Meridian presentation milestone (not deployed)

- Shared parent masthead/footer, mark/favicon and bundled fonts installed. Removed direct @fontsource dependencies.
- Replaced the old palette/font/control stylesheet with semantic-token composition rules; shared button/field/table/segmented/dialog recipes and Badge/Notice/Empty primitives cover existing states.
- One local campaign mapping supplies chart SVG and card/control appearance. Responsive SVG user units match rendered pixels for minimum 12px axes and 14px labels/values.
- Kept native dialog and domain functions; all 12 original browser checks and production build pass on local port 4387. Dataset and metric module are unchanged.
- Additional width, zoom, keyboard, state screenshot and package-portability checks are next.

## 2026-09-30 — Responsive/accessibility verification milestone (not deployed)

- Required npm test (7), npm run build and npm run test:e2e (19) pass. Original 12 browser checks are unchanged; added seven presentation regressions.
- No page overflow at 320, 390, 768, 1440px; effective SVG label/axis sizes checked, stable campaign colors agree across figures and strips; all comparisons remain visible.
- New keyboard test exposed existing showModal-before-render timing; awaited Vue nextTick before native showModal so autofocus reaches Close. Native dialog keeps page background inert; Escape restores opener focus. Browser chrome remains reachable per native behavior.
- Verified empty search recovery, unavailable/no-denominator, actual JSON download, injected browser download restriction, modal and print states; axe reports no violations for tested states.
- 200% equivalent reading verified at 720×500 CSS pixels with DPR 2 (equivalent to a 1440×1000 display zoomed 200%). A CSS zoom trial was rejected as nonrepresentative because it distorts top-layer viewport units; no app-specific CSS-zoom workaround was introduced.
- Isolated git-archive copy in /tmp: npm ci and production build passed without any sibling folder. Dataset checksum remains exact.
- Added this refactor branch to GitHub Actions verification only. Vercel branch deployments remain disabled; read-only deployment listing shows only prior main releases.

## 2026-09-30 — Migration handoff complete

- GitHub Actions 36796055930 passed for verification milestone c07f3db on the refactor branch. The final documentation/screenshot milestone does not alter runtime behavior.
- Saved inspected local screenshots with explicit viewport/state metadata, updated README/agent scope, decisions, package/font provenance and verification limits.
- Milestones pushed: d870abb package/baseline and deployment guard; 697227b shared presentation; c07f3db responsive checks and autofocus fix; final documentation commit follows.
- No publication performed. Production remains the pre-migration main release. Local preview is the review surface; future publication requires separate authorization.

## 2026-09-30 — Frame / Vesper migration started on main

- Clean main at 0cd8d23 already includes all Meridian migration commits. Confirmed origin is the renamed frame repository and local Vercel link identifies frame.
- Read project and shared design-system guidance, inspected implementation and actual baseline screenshot. Baseline: 7 unit tests, build and 19 browser checks passed. Sandbox prevented binding preview port; approved local server/browser access resolved it.
- Upgraded the vendored release, namespace/classes/tokens, mark/favicon, page identity, download filename and active docs. Preserved source records, metrics, generator, historical planning/screenshots and branch guard.
- Required final checks and deployment verification remain pending.

## 2026-09-30 — Frame publication verified

- Pushed c7a129f and b6e480b to main. Vercel automatically built the renamed Frame repository, main revision b6e480b, to production Ready. The project API retains its old repository display slug, but numeric repository ID and new deployment metadata confirm frame/main; no relinking was needed.
- Opened the actual existing production alias, inspected desktop and phone screenshots, and passed all 20 browser checks against it, including complete download equality and every direct chapter refresh.
- Preserved deployed screenshots under docs/screenshots/vesper-production and a learner acceptance audit in docs/VERIFICATION.md. No historical screenshots were removed.
- Final documentation/evidence commit contains no application change; verify its resulting deployment metadata after push.
