import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// The desktop project owns the explicit viewport matrix; original journeys still run both projects.
const browserErrors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
});
test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page)).toEqual([]);
});

for (const width of [320, 390, 768, 1440]) {
  test(`Vesper reading and state matrix at ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("html")).toHaveAttribute(
      "data-vs-theme",
      "paper",
    );
    await expect(page.locator("html")).toHaveAttribute(
      "data-vs-mode",
      "editorial",
    );
    await expect(page.locator("body")).toHaveClass(/vs-root/);
    await expect(page.locator(".masthead .vs-brand__mark")).toBeVisible();
    const noOverflow = async () =>
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    await noOverflow();
    await page.screenshot({ path: info.outputPath(`hero-${width}.png`) });
    await page.locator("#volume").scrollIntoViewIfNeeded();
    await expect
      .poll(async () =>
        page
          .locator("#volume .volume-figure svg")
          .evaluate((svg) =>
            Math.abs(
              svg.getBoundingClientRect().width -
                (svg as SVGSVGElement).viewBox.baseVal.width,
            ),
          ),
      )
      .toBeLessThan(1);
    const labelSizes = await page
      .locator(".volume-figure svg text")
      .evaluateAll((nodes) =>
        nodes.map(
          (node) =>
            parseFloat(getComputedStyle(node).fontSize) *
            ((node as SVGGraphicsElement).getScreenCTM()?.a ?? 0),
        ),
      );
    expect(Math.min(...labelSizes)).toBeGreaterThanOrEqual(12);
    await page
      .locator("#volume .chart-panel")
      .screenshot({ path: info.outputPath(`volume-${width}.png`) });
    await page.getByRole("button", { name: "02 Frame" }).click();
    await page
      .getByRole("button", { name: "Distinct stories", exact: true })
      .click();
    await expect(page.locator(".rate-card")).toHaveCount(3);
    const barColors = await page
      .locator('#reveal .volume-figure svg rect[height="28"]')
      .evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).fill));
    const stripColors = await page
      .locator(".rate-card svg rect:last-child")
      .evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).fill));
    expect(barColors).toEqual(stripColors);
    await page
      .locator("#reveal .chart-panel")
      .screenshot({ path: info.outputPath(`distinct-selected-${width}.png`) });
    await noOverflow();
    await page.locator(".article-list button").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.screenshot({ path: info.outputPath(`dialog-${width}.png`) });
    await page.keyboard.press("Escape");
    await page.getByLabel("Find an article").fill("no-existing-article-9473");
    await expect(
      page.getByRole("heading", { name: "No matching articles" }),
    ).toBeVisible();
    await page
      .locator(".empty-state")
      .screenshot({ path: info.outputPath(`empty-${width}.png`) });
    await page.getByRole("button", { name: "Clear search" }).click();
    await page
      .getByText("What if there are no priority placements?", { exact: true })
      .click();
    await page
      .getByRole("button", { name: "Show unavailable-data example" })
      .click();
    await page
      .locator(".unavailable")
      .screenshot({ path: info.outputPath(`unavailable-${width}.png`) });
    await page.evaluate(() => {
      URL.createObjectURL = () => {
        throw new Error("Simulated browser download restriction");
      };
    });
    await page
      .getByRole("button", { name: "Download fictional dataset" })
      .click();
    await expect(page.getByRole("alert")).toContainText(
      "The download could not start",
    );
    await page
      .getByRole("alert")
      .screenshot({ path: info.outputPath(`download-error-${width}.png`) });
    await noOverflow();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  });
}

test("keyboard activation, visible focus, dialog containment and focus return", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to story" })).toBeFocused();
  await page.keyboard.press("Enter");
  const toggle = page.getByRole("button", {
    name: "Distinct stories",
    exact: true,
  });
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(await toggle.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe(
    "solid",
  );
  const trigger = page.locator(".article-list button").first();
  await trigger.focus();
  await page.keyboard.press("Enter");
  const close = page.getByRole("button", { name: "Close article evidence" });
  await expect(close).toBeFocused();
  // Native dialogs allow traversal into browser chrome, but underlying page controls are inert.
  await page
    .getByLabel("Find an article")
    .evaluate((el) => (el as HTMLInputElement).focus());
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("200 percent zoom-equivalent viewport retains readable controls and charts", async ({
  browser,
}, info) => {
  // A 1440x1000 display at 200% browser zoom has a 720x500 CSS viewport.
  // DPR 2 records the corresponding enlarged physical pixels; no CSS zoom or pinch scaling.
  const context = await browser.newContext({
    viewport: { width: 720, height: 500 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  try {
    await page.goto(String(info.project.use.baseURL));
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => innerWidth)).toBe(720);
    expect(await page.evaluate(() => devicePixelRatio)).toBe(2);
    await page.screenshot({ path: info.outputPath("zoom-200-hero.png") });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("button", { name: "Distinct stories", exact: true })
      .click();
    await expect(
      page.locator("#reveal .volume-figure svg"),
    ).toHaveAccessibleName(/Frame 42/);
    await page
      .locator("#reveal .chart-panel")
      .screenshot({ path: info.outputPath("zoom-200-chart.png") });
    await page.locator(".article-list button").first().click();
    await expect(
      page.getByRole("button", { name: "Close article evidence" }),
    ).toBeFocused();
    await page.screenshot({ path: info.outputPath("zoom-200-dialog.png") });
    await page.getByRole("button", { name: "Close article evidence" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  } finally {
    await context.close();
  }
});

test("print retains all chapters and comparison data", async ({
  page,
}, info) => {
  await page.goto("/");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".story-nav")).not.toBeVisible();
  for (const id of ["volume", "reveal", "message", "takeaway"])
    await expect(page.locator(`#${id}`)).toBeVisible();
  await expect(page.locator(".vs-table")).toContainText("18/60");
  await page
    .locator("#takeaway")
    .screenshot({ path: info.outputPath("print-takeaway.png") });
});

test('Frame identity, packaged typography and all chapter refreshes', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveTitle('Frame — Vesper Media Group');
  await expect(page.locator('.masthead .vs-brand')).toHaveAccessibleName('Vesper Media Group, top');
  await expect(page.locator('.hero .eyebrow')).toContainText('FRAME');
  expect(await page.locator('body').evaluate(el => getComputedStyle(el).fontFamily)).toContain('DM Sans');
  expect(await page.locator('h1').evaluate(el => getComputedStyle(el).fontFamily)).toContain('Libre Caslon Display');
  const mark = await page.locator('.masthead img').getAttribute('src');
  expect(mark).toBeTruthy();
  const favicon = await page.request.get('/favicon.svg');
  const brandMark = await page.evaluate(async src => (await fetch(src)).text(), mark!);
  // Vite inlines and minifies the same shipped SVG; compare normalized markup.
  const normalize = (svg: string) => svg.replace(/"/g, "'").replace(/>\s+</g, '><').trim();
  expect(normalize(await favicon.text())).toBe(normalize(brandMark));
  for (const id of ['volume', 'reveal', 'message', 'takeaway']) {
    await page.goto(`/#${id}`);
    await page.reload();
    await expect(page.locator(`#${id} h2`)).toBeVisible();
  }
  await page.locator('.syndication summary').click();
  await expect(page.locator('.copy-list button')).toHaveCount(5);
  await page.locator('.copy-list button').last().click();
  await expect(page.getByRole('dialog')).toContainText('Syndicated copy');
  await page.keyboard.press('Escape');
  await expect(page.locator('.copy-list button').last()).toBeFocused();
});
