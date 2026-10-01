# Frame design QA — 2026-10-01

final result: passed

## Evidence

- Source visual truth: `/Users/mfittand/.codex/generated_images/01a0f63f-597f-76d3-b9aa-3bb6db94e920/exec-b56ec43b-8581-4f3e-a4e7-3a761eeb0051.png` (1487 × 1058 pixels).
- Implementation: `http://127.0.0.1:4392/` in Chrome, desktop hero at approximately 1512 × 800 CSS pixels, device scale 1. The browser screenshot is in the local CUA review output for this task; the local URL is the reproducible capture target.
- Same-input comparison: temporary `http://127.0.0.1:4392/qa-compare.html` placed the source and live implementation side by side. Both were viewed at 1487 CSS pixels wide and scaled to half size in that comparison. The comparison file is a temporary build artifact, not part of the release.
- State: default Frame landing screen, paper/editorial theme, no interaction or selection. Browser checks separately covered 320/390/768/1440px, print and 200% zoom-equivalent states.

## Findings and iteration

1. [P1, resolved] The first generated background had too much grain and contrast behind text. Replaced it with a quieter 35.9 kB salt-flat WebP and applied a translucent cool-gray tint. The final comparison shows dark copy on a calm reading field with subtle right-side fissures.
2. [P2, resolved] The first implementation headline and hero were smaller and shorter than the selected visual. Increased the display scale and hero spacing. In the final side-by-side comparison, the headline occupies a similar region and the metadata/chapter rhythm aligns closely with the reference.
3. [P2, resolved] The sticky chapter bar initially read as an isolated solid stripe. A translucent backdrop now retains separation while allowing the page texture to remain visible.

## Fidelity surfaces

- Fonts and typography: Barlow Condensed 700 produces the bold sans hierarchy and teal second line; DM Sans remains legible for prose and small UI. The browser assertion verifies the packaged display family.
- Spacing and layout: masthead, hero, metadata, chapter navigation and first chapter preserve the source ordering and near-matching vertical rhythm. Responsive rules prevent the enlarged desktop title from overflowing narrow screens.
- Colors and tokens: cool salt/fog/white surfaces, charcoal text and petrol accent replace beige/cream. Contrast checks pass in the shared package.
- Image quality: the optimized salt-flat WebP is 2048 × 1152 and 35.9 kB. The source PNG is retained in the design-system repository. Plain chart/field surfaces preserve legibility.
- Copy and content: the fictional story headline, opening question, counts and chapter labels remain exact application copy; domain data was not changed.

Focused review covered the headline, first chapter boundary, Vesper mark, button, metadata and chapter bar in the combined view. No actionable P0/P1/P2 mismatch remains. The source is an art-direction image rather than a full interaction specification, so detailed lower-page behavior follows the existing application. The full browser suite passed 20/20.
