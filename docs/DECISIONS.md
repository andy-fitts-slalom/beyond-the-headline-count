# Dated decisions

## 2026-09-30
- Treat supplied BRIEF.md as acceptance contract; no external business data or case-study assets.
- Use a fixed six-week fictional reporting window and deterministic generator, with explicit story originals and campaign-specific priority outlets.
- Use a quiet paper/ink editorial identity, direct labels, and four static sections. Interaction enhances the comparison; no scroll animation is required.
- Keep campaign highlighting separate from population filtering. The volume toggle never changes the message-inclusion denominator.
- User-requested Vue/Vite/D3 implementation and Vercel publication override the Data skill's generic React/shared-runtime and Sites defaults.

- Public repository visibility follows the user’s later authorization; the supplied brief is retained verbatim rather than rewriting its original delivery requirement.
- Vercel’s only available team was Andy-Protogen, so no unresolved team selection remained. Connected GitHub using existing permissions; production branch is main.
- Fonts are bundled locally and full OFL notices ship with the site. No external requests are needed at runtime.
- Use native modal dialog for focus containment, Escape dismissal and focus restoration. Small-screen comparison table scrolls within a labeled, focusable region.
- Keep evidence as a bounded preview of six search matches and make the complete source downloadable. In-memory highlighting is intentionally not represented as shared or persistent state.


## 2026-09-30 — Meridian UI 1.0.0 migration
- User permits only shared parent branding/presentation across case studies. No sibling application/domain code or records were accessed or copied.
- Retain Vue/TypeScript/Vite and Vue-rendered D3 SVG. Set paper/editorial on html and ms-root on body. Shared fonts/styles precede application CSS.
- Vendor the exact 1.0.0 release; remove duplicated direct font packages. Shipped parent mark is reused through MeridianBrand and favicon; OFL notices come from package.
- Replace legacy CSS in place with semantic tokens; preserve product composition and print. Use native labeled fields/buttons/dialog plus shared recipes, Brand/Badge/Notice/Empty primitives. No Vuetify/Ionic adoption.
- Campaign identity is local: signal→0, frame→1, folio→2 from meridianChartStyle('paper'). Identity color is not a success/error label. Absence is neutral, inclusion informational, unavailable neutral, actual download failure danger.
- Responsive SVG uses observed content width so type sizes stay literal CSS pixels rather than shrinking a fixed viewBox on phones. No metric formulas or denominators change.
- Await nextTick before native showModal to allow initial close-button autofocus; leave Escape, inert background and return focus native.
- User subsequently requested milestone GitHub pushes. Use only refactor/meridian-ui-1.0.0 and disable that branch via git.deploymentEnabled before pushing, per [Vercel configuration](https://vercel.com/docs/project-configuration/git-configuration#gitdeploymentenabled). Main and production are unchanged.
- Zoom verification uses a 720×500 CSS viewport/DPR 2 to model a 1440×1000 display at 200%; CSS zoom is not equivalent for top-layer dialog viewport sizing and was not used as a product workaround.

## 2026-09-30 — Frame / Vesper 2.0.0 migration
- The user now authorizes main-only rebrand commits, push and publication verification, superseding earlier branch-only scope. Retain historical branch deployment guard and all existing commits/screenshots.
- Product Frame and parent Vesper Media Group use the supplied portable Vesper 2.0.0 package. Keep the narrative headline as editorial content, with Frame identified above it and in the masthead/footer/title/download.
- Retain dataset metadata and generator bytes for exact download continuity. The frame campaign ID and its records are unrelated to product renaming.
- Use paper/editorial semantic tokens, V-and-star mark, DM Sans UI, Libre Caslon display and one local categorical mapping. Existing print black/white rules are intentional ink-saving presentation.
- Keep the existing production domain; a new domain/routing change was blocked by automatic approval review in the parent task and requires separate explicit approval.
