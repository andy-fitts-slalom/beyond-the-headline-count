# Frame / Vesper 2.0.0 local rendered evidence — 2026-09-30

Chrome screenshots from the passing local suite at http://127.0.0.1:4387.

- `desktop-hero.png`: interactive browser, 1440×1000.
- `hero-{width}.png`, `volume-{width}.png`, `distinct-selected-{width}.png`, `dialog-{width}.png`, `empty-{width}.png`, `unavailable-{width}.png`, `download-error-{width}.png`: suite viewports 320/390/768/1440×1000. Component images use cropped bounds. Selected state follows the Frame campaign while retaining all comparisons.
- `story-desktop.png`, `story-mobile.png`: full story at 1440×1000 and 390×844 touch/mobile.
- `zoom-200-*.png`: 720×500 CSS viewport, DPR 2; equivalent layout for a 1440×1000 display at 200%, not native browser-menu zoom certification.
- `print-takeaway.png`: print media, comparison table and takeaway retained.

Inspected desktop composition, 320px labels, phone and zoom-equivalent dialogs and print takeaway. Dialog content scrolls within its viewport. See VERIFICATION for behavior checks and limits. Baseline image in ../vesper-baseline is 1280×720; all earlier Meridian and original release evidence is preserved.
