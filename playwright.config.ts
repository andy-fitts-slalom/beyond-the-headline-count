import { defineConfig } from "@playwright/test";

const deployed = process.env.PLAYWRIGHT_BASE_URL;
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  use: {
    baseURL: deployed || "http://127.0.0.1:4387",
    browserName: "chromium",
    channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "mobile",
      testIgnore: "**/vesper.spec.ts",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: deployed
    ? undefined
    : {
        command: "npm run preview -- --host 127.0.0.1 --port 4387 --strictPort",
        url: "http://127.0.0.1:4387",
        reuseExistingServer: !process.env.CI,
      },
});
