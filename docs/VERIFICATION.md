# Verification — 2026-09-30

## Data and implementation
- Seven unit tests passed: deterministic regeneration; foreign keys, unique IDs, story originals and dates; independent record counts; narrative rankings; unchanged message denominators; unavailable versus observed zero; campaign-specific priority status.
- Independent data reviewer checked the narrative, original/copy chronology and annotation consistency. Fixed UI integration issues before publication.
- TypeScript check and Vite production compilation passed.
- No runtime external requests, backend, notification, analytics, or AI service. All records and annotations are invented.

## Browser and deployment
All 12 local browser checks passed on desktop (1440×1000) and phone (390×844), both with reduced motion. Checked toggle and denominator consistency, campaign highlight/reset, evidence navigation and Escape/focus restoration, empty search recovery, unavailable fixture, exact JSON download, injected download failure and reset, direct chapter loads/refreshes, no horizontal page overflow, zero console errors, and zero axe violations. Desktop/mobile hero and message screenshots were inspected.

Vercel Git link and main production branch confirmed through project API. Live URL verification pending deployment.

## Boundaries
Automated accessibility checks and keyboard/viewport testing are not a full assistive-technology audit. No real user research was performed. JavaScript is required; animation is not. No claims of real audience reach or business causality.
