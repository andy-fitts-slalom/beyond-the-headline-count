# Progress and continuation

## Current handoff — complete, 2026-09-30
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
