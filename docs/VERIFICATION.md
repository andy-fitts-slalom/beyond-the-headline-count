# Verification — 2026-09-30

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

| Brief requirement | Verified evidence |
| --- | --- |
| Apparent volume winner, repeated-story reveal, priority message comparison, takeaway | Four static editorial chapters; direct labels and final comparison table |
| Deterministic fictional records, explicit originals and priority status | Generator, JSON, data dictionary, seven unit tests and independent review |
| Every numerical claim from records | Shared summaries, independent browser expectations, dynamic counts/rates/dates and unavailable fixture |
| Published/distinct toggle never changes message denominator | Unit and browser invariance assertions |
| Campaign highlight preserves all comparisons and resets | Browser journey on both sizes |
| Inspect article campaign, outlet priority, label and group | Evidence dialog browser checks, prepared rationale shown |
| Methodology and downloadable data | Expandable methods; exact downloaded JSON matches source |
| Empty/error/unavailable states | No-match recovery, injected download failure/reset, isolated null-rate fixture |
| Keyboard and accessibility basics | Native buttons/select/dialog, visible focus, Escape/focus return, accessible chart descriptions, table keyboard scrolling, axe checks |
| Reduced motion and phone layout | All browser checks use reduced motion; screenshots and overflow assertions at 390px |
| Production and direct loads/refresh | Live root plus /#message load/reload checked in real browsers |
| GitHub/Vercel independent publication | Dedicated repository/project; verified Git link and main production branch |

## Remaining limitations
- Browser automation ran in Chrome/Chromium; Safari/Firefox and a full screen-reader audit were not run.
- No participant comprehension study was performed; the takeaway is explicit, but user understanding has not been empirically measured.
- JavaScript is required to render the app. Motion is never required.
- Evidence list previews up to six search matches; the complete invented dataset is downloadable.
- State is in-memory and resets on reload. There is no shared state, notification, external feed or real AI judgment.
