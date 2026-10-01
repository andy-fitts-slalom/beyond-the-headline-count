# Project instructions

Read BRIEF.md and docs/PROGRESS.md before changing this project. Build only this independent fictional Meridian Signal Group story. Never import real client material or other case-study code.

Use Vue 3, TypeScript, Vite and Vue-rendered SVG with D3 scales/shapes. src/data/dataset.json is the deterministic source; derive every quantitative claim through shared metric functions. Published items and priority message denominators are article records; distinct stories count unique storyGroupId values. No-priority rates are null, never zero.

Preserve accessible static reading, visible keyboard focus and reduced motion. Keep all comparisons when highlighting a campaign. Local demonstrations must be honestly labeled. Run build, unit and browser checks before publication; open the deployed site before calling it verified.

Update docs/PROGRESS.md and dated decisions after milestones. Make descriptive commits when real milestones occur. Never commit credentials, node_modules, dist, or .vercel. Use only the dedicated repository (public visibility authorized by the user on 2026-09-30) and deployment project authorized in BRIEF.md.


## Meridian UI migration scope (2026-09-30)
Use the vendored @meridian/ui 1.0.0 package for shared parent presentation only. Shared branding supersedes the earlier isolation rule only for design-system assets/components, never application code, domain computation or records. Keep independent installation from vendor/ and the local campaign mapping in src/presentation/campaignStyle.ts.

Current branch refactor/meridian-ui-1.0.0 may be pushed in discrete milestones under the user's later authorization. Do not merge/push main or deploy without a new publication request. Preserve the branch-specific git.deploymentEnabled=false guard. Prior production verification does not establish deployment of this refactor. Browser tests now use dedicated local port 4387.
