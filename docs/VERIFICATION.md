# Verification — 2026-09-30

## Vesper UI 3.0.0 — 2026-10-01

- `vendor/vesper-ui-3.0.0.tgz` installed with a repository-relative lockfile. Barlow Condensed 600/700 and a 35.9 kB salt-flat WebP are built into the production bundle.
- `npm test`: 7/7; `npm run build`: passed; `npm run test:e2e`: 20/20 after updating the expected display font. Initial browser startup required local-server access.
- Chrome local preview at 1512px inspected. A same-viewport side-by-side comparison with the selected design guided headline size, hero spacing and texture contrast. Existing browser coverage verifies the narrow/desktop layouts, chapter routes, keyboard focus, dialog, print, download and data interactions.
- Dataset and domain functions remain unchanged. This local result does not claim a live production deployment. Historical 2.0.0 verification follows.


## Documentation sweep — 2026-09-30

Refreshed README onboarding, workflows, setup, project structure and dated verification context. Corrected current branding guidance and explicitly marked superseded planning/migration records as historical. Vesper UI 2.0.0 remains the vendored dependency; runtime source and package manifests contain no Meridian references. Historical screenshots, branch deployment exclusions and compatibility storage keys are preserved.

Validation: 7 unit tests, production build and 20 local browser tests passed; README local links resolve. Browser preview startup initially hit sandbox EPERM, then passed with approved local-server access. No application behavior or dataset changed. Existing production evidence remains dated; this documentation sweep does not claim a new live-site verification.

## Frame / Vesper UI 2.0.0 — local release verification

- Required checks: `npm test` 7/7, `npm run build` successful, `npm run test:e2e` 20/20. Baseline was 7/build/19. Existing assertions are retained with namespace and download-name updates; added identity/fonts/mark, all four chapter refreshes and syndicated evidence focus return.
- Local Chrome on port 4387: 320/390/768/1440px layouts, original 390×844 touch journey, 720×500 at DPR 2 for 200% zoom-equivalent layout. No page overflow; chart axes at least 12px and direct labels/values 14px effective size. All series remain and bar/strip colors match the local mapping.
- Toggles retain priority denominators; campaign/reset, inclusion cards, six-example evidence search and empty recovery, dialog autofocus/containment/Escape/focus return, syndication, null Unavailable, exact full JSON download and injected error/reset pass. All chapter URLs refresh. Reduced motion is enabled throughout. Print media retains all four chapters and comparison data.
- Axe WCAG A/AA checks and browser error assertions pass in the tested default/modal/recovery states. The mark and favicon match the supplied SVG after asset-minification normalization; DM Sans/Libre Caslon computed families are verified.
- Inspected actual desktop hero/full-story composition, 320px direct chart labels, 320px and zoom-equivalent scrollable native dialogs and print takeaway. Evidence index: [Vesper screenshots](screenshots/vesper-2.0.0/README.md). Earlier screenshot directories remain intact.
- Source data, metric functions and generator have no diff. Dataset SHA-256 `a4e7b743f77d0a52582ca64e7ca1a856b9e4dd824ea4d826521b5c0e1b6cf374`; release SHA-256 `09608c3a9a83ef41aef49059a83054688f3faa92e8f1a7d8592d2eb363594d6f`. Old dataset metadata title is intentional, and campaign ID frame remains data. No old UI namespace or client/company-specific material appears in product source.
- Initial browser startup was blocked by sandbox port binding and resolved with approved access. New asset assertion was corrected to support Vite's data-URL/minified SVG, without changing the packaged mark.
- Limits: Chrome only; no physical-phone, screen-reader, native menu zoom, physical print or participant comprehension certification. Zoom is explicit CSS-viewport/DPR equivalence. Static reading does not need animation; rendering needs JavaScript.

### Learner readiness audit

| Requirement                            | Evidence / disposition                                                                                                       |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Live accessible site                   | Opened existing domain on Frame project; upgraded production revision and 20 browser checks verified below                   |
| Core flows match planning              | Four chapters and all original behavior retained; automated journeys and screenshot review                                   |
| Logical AI scaffolding/context         | Root AGENTS, dated brief addendum, DATA, DECISIONS, PROGRESS and VERIFICATION                                                |
| Root README and LICENSE                | Current setup/limits/delivery links; original MIT license retained; font/package notices current                             |
| Meaningful main history                | Prior commits preserved; descriptive rebrand and verification increments on main                                             |
| Media audience design                  | Vesper paper/editorial tokens, VesperBrand mark, DM Sans UI/Caslon display, restrained ruled figures and direct names/values |
| Responsive and edge cases              | Width matrix, focus, reduced motion, print, empty/error/unavailable, complete download checks                                |
| Brief shows planning and matches build | Original planning retained verbatim with dated overriding naming/design/delivery addendum                                    |
| Honest scope                           | Fictional dataset and labels, no causal/unique-reach/research claim; no client content                                       |
| Routing / protection                   | Existing production URL retained; password protection optional and not introduced; prior routing approval block remains      |

### Production release — 2026-09-30

- Repository: https://github.com/andy-fitts-slalom/frame (public), main only. Commits c7a129f (Vesper migration) and b6e480b (browser/visual evidence) pushed successfully.
- Vercel project Frame (`prj_S5UYgdsrYCKHNIsaoe1icCvkwWZS`, andy-protogen) automatically deployed `b6e480bf05c710dede3af417d321871ea84eaf71`, ref main, repository frame, to production Ready: `dpl_EmLpomr7bhtY13sjTvMwobc69LJy`, https://frame-dh3dlwfsp-andy-protogen.vercel.app.
- Actual reviewer URL: **https://beyond-the-headline-count.vercel.app**. Vercel inspect confirms this existing alias serves that deployment. Opened in Chrome, title Frame — Vesper Media Group, desktop and phone screenshots inspected. No login/password required.
- `PLAYWRIGHT_BASE_URL=https://beyond-the-headline-count.vercel.app npm run test:e2e`: **20 passed**. Same complete desktop/mobile/width, keyboard, recovery, print, reduced-motion, zoom-equivalent and direct-anchor checks as local release. Saved [production evidence](screenshots/vesper-production/README.md).
- Isolated committed archive in a temporary directory passed `npm ci --offline` and production build without sibling source. Lockfile pins the committed Vesper tarball.
- [GitHub Actions 36824681618](https://github.com/andy-fitts-slalom/frame/actions/runs/36824681618) passed clean install, seven unit tests, build and 20 browser cases on Linux Chromium.
- Routing was not changed. The parent task's automatic approval review block on a new domain remains a separate approval requirement, not a blocker to this existing live URL. All earlier screenshots and history remain.
- The final handoff commit only updates documentation/evidence. Its deployment metadata is checked after push; the full journey evidence above applies to the identical application from b6e480b.

---

## Meridian UI migration — local, not deployed (historical)

This section records a superseded release. Package paths, test filenames, branch instructions and deployment status below apply to that revision only; current Vesper evidence appears above.

### Automated checks

- Baseline clean main: 7 unit tests, build, 12 original browser checks passed. Stale listeners caused the initial default-port webServer timeout; dedicated port 4387 resolved it. Initial sandbox write denial was environmental, not a data-test defect.
- Final local npm test: 7 passed. npm run build: TypeScript and Vite passed. npm run test:e2e: 19 passed. No original assertion was removed or weakened; tests/story.spec.ts is unchanged.
- Width matrix 320/390/768/1440 at 1000px high, plus original 390×844 touch/mobile journey. No page overflow in default, selected, empty, unavailable or injected-error states. The comparison table intentionally scrolls within its named keyboard-focusable region.
- SVG coordinate width follows actual rendered width: effective axes >=12px, labels/values 14px. Test independently compares campaign fills in volume figures and inclusion strips.
- Axe WCAG A/AA checks pass for tested default, modal and recovery states; no console/uncaught errors in the main journeys. Native controls retain focus outlines and touch-size recipes.
- Keyboard Enter/Space activates controls; modal initial autofocus reaches Close after Vue renders. Background input cannot receive focus while modal. Native tabbing may visit browser chrome; Tab reenters the modal. Escape restores opener focus.
- 200% zoom-equivalent check: 720×500 CSS viewport at DPR 2, representing 1440×1000 at 200%. Verified readable toggle, chart, evidence and close interaction. No CSS zoom hack used.
- Print media retains chapters and data table and hides interactive navigation.
- Downloaded full JSON still equals source. Empty search recovery, no-priority Unavailable, download restriction/error and reset all pass. No unsupported disabled/busy/backend state was invented.
- Isolated git-archive copy at the presentation milestone passed npm ci and build with no sibling directory. @meridian/ui resolves to committed file:vendor/meridian-ui-1.0.0.tgz, not a symlink.
- Dataset, metrics, generator and original journey tests have no diff from the baseline. Dataset SHA-256: a4e7b743f77d0a52582ca64e7ca1a856b9e4dd824ea4d826521b5c0e1b6cf374. Tarball SHA-256: 867f3f8b38d3e45160964cd26fc1f527999c3876ad6c5253c4dcc9ac9cfd8123.

### Rendered observations

Inspected actual local Chrome screenshots: shared parent masthead, all chapter compositions, phone volume labels, selected comparison, dialog, empty search, neutral unavailable notice and danger download error. Enlarged dialog/chart and print takeaway are legible without cropped controls. Screenshots with exact viewport/state records are in [meridian-1.0.0](screenshots/meridian-1.0.0/README.md). Local preview opened in Chrome.

### Remaining limits

No physical phones, Safari/Firefox, full screen-reader audit, native browser-menu zoom certification, physical printing or new user-comprehension study. The 200% test is explicit viewport/DPR emulation. No production or preview deployment was performed for this refactor. Existing production verification below is historical.

---

## Prior release verification (before Meridian UI migration)

## Data and implementation

- Seven unit tests passed: deterministic regeneration; foreign keys, unique IDs, story originals and dates; independent record counts; narrative rankings; unchanged message denominators; unavailable versus observed zero; campaign-specific priority status.
- Independent data reviewer checked the narrative, original/copy chronology and annotation consistency. Fixed UI integration issues before publication.
- TypeScript check and Vite production compilation passed.
- No runtime external requests, backend, notification, analytics, or AI service. All records and annotations are invented.

## Browser and deployment

All 12 local browser checks passed on desktop (1440×1000) and phone (390×844), both with reduced motion. Checked toggle and denominator consistency, campaign highlight/reset, evidence navigation and Escape/focus restoration, empty search recovery, unavailable fixture, exact JSON download, injected download failure and reset, direct chapter loads/refreshes, no horizontal page overflow, zero console errors, and zero axe violations. Desktop/mobile hero and message screenshots were inspected.

Vercel Git link and main production branch confirmed through project API. Production URL https://beyond-the-headline-count.vercel.app was opened in Chrome and checked with the same complete 12-test suite: all passed. No authentication was needed in fresh test browser contexts. Vercel reported READY, and the deployed source revision was `317bb098490da2c2068251a8cb822b4b89e5473e`. The final documentation commit does not change application code.

GitHub Actions run [36780371067](https://github.com/andy-fitts-slalom/beyond-the-headline-count/actions/runs/36780371067) also passed npm ci, all seven unit tests, production build and all 12 browser checks on Linux with Chromium.

Actual deployed screenshots are retained in [screenshots/](screenshots/): desktop/mobile opening and message-comparison sections.

## Boundaries

Automated accessibility checks and keyboard/viewport testing are not a full assistive-technology audit. No real user research was performed. JavaScript is required; animation is not. No claims of real audience reach or business causality.

## Acceptance mapping

| Brief requirement                                                                    | Verified evidence                                                                                                                     |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Apparent volume winner, repeated-story reveal, priority message comparison, takeaway | Four static editorial chapters; direct labels and final comparison table                                                              |
| Deterministic fictional records, explicit originals and priority status              | Generator, JSON, data dictionary, seven unit tests and independent review                                                             |
| Every numerical claim from records                                                   | Shared summaries, independent browser expectations, dynamic counts/rates/dates and unavailable fixture                                |
| Published/distinct toggle never changes message denominator                          | Unit and browser invariance assertions                                                                                                |
| Campaign highlight preserves all comparisons and resets                              | Browser journey on both sizes                                                                                                         |
| Inspect article campaign, outlet priority, label and group                           | Evidence dialog browser checks, prepared rationale shown                                                                              |
| Methodology and downloadable data                                                    | Expandable methods; exact downloaded JSON matches source                                                                              |
| Empty/error/unavailable states                                                       | No-match recovery, injected download failure/reset, isolated null-rate fixture                                                        |
| Keyboard and accessibility basics                                                    | Native buttons/select/dialog, visible focus, Escape/focus return, accessible chart descriptions, table keyboard scrolling, axe checks |
| Reduced motion and phone layout                                                      | All browser checks use reduced motion; screenshots and overflow assertions at 390px                                                   |
| Production and direct loads/refresh                                                  | Live root plus /#message load/reload checked in real browsers                                                                         |
| GitHub/Vercel independent publication                                                | Dedicated repository/project; verified Git link and main production branch                                                            |

## Remaining limitations

- Browser automation ran in Chrome/Chromium; Safari/Firefox and a full screen-reader audit were not run.
- No participant comprehension study was performed; the takeaway is explicit, but user understanding has not been empirically measured.
- JavaScript is required to render the app. Motion is never required.
- Evidence list previews up to six search matches; the complete invented dataset is downloadable.
- State is in-memory and resets on reload. There is no shared state, notification, external feed or real AI judgment.

### Migration CI evidence

GitHub Actions [36796055930](https://github.com/andy-fitts-slalom/beyond-the-headline-count/actions/runs/36796055930) passed for `c07f3db` on the refactor branch, including clean install, unit tests, build and browser checks on Linux Chromium. This is CI verification, not deployment.
