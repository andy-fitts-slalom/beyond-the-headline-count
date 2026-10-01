import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import type { Dataset } from '../src/data/types';

const dataset: Dataset = JSON.parse(readFileSync(new URL('../src/data/dataset.json', import.meta.url), 'utf8'));
// Independent record counts ensure the rendered output agrees with source data.
const rows = dataset.campaigns.map(campaign => {
  const articles = dataset.articles.filter(article => article.campaignId === campaign.id);
  return { campaign, published: articles.length, distinct: new Set(articles.map(article => article.storyGroupId)).size };
});
const browserErrors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
});
test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page), 'Browser console and uncaught errors').toEqual([]);
});

test('count unit, campaign highlighting and reset preserve the full comparison', async ({ page }) => {
  const campaign = rows[1]!;
  await page.getByRole('button', { name: new RegExp(`02 ${campaign.campaign.name}`) }).click();
  await expect(page.locator('.selection-note')).toContainText(`Following ${campaign.campaign.name}`);
  const priorityBefore = await page.locator('.denominator').allTextContents();
  await page.getByRole('button', { name: 'Distinct stories', exact: true }).click();
  const reveal = page.locator('#reveal');
  for (const row of rows) {
    await expect(reveal.getByRole('img')).toHaveAccessibleName(new RegExp(`${row.campaign.name} ${row.distinct}`));
  }
  await expect(page.locator('#volume').getByRole('img')).toHaveAccessibleName(new RegExp(`${rows[0]!.published}`));
  expect(await page.locator('.denominator').allTextContents()).toEqual(priorityBefore);
  await expect(page.locator('.rate-card')).toHaveCount(rows.length);
  await expect(page.locator('.rate-card.chosen')).toContainText(campaign.campaign.name);
  await page.getByRole('button', { name: 'Reset story', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Published items', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.rate-card.chosen')).toHaveCount(0);
});

test('supporting evidence follows campaign and modal closes with Escape restoring focus', async ({ page }) => {
  const campaign = rows[2]!.campaign;
  await page.locator('.rate-card').filter({ has: page.getByRole('heading', { name: campaign.name, exact: true }) }).getByRole('button', { name: 'Read supporting articles' }).click();
  await expect(page.getByRole('combobox', { name: 'Campaign', exact: true })).toHaveValue(campaign.id);
  const trigger = page.locator('.article-list button').first();
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(campaign.name);
  for (const label of ['Outlet priority status', 'Prepared message label', 'Story group', 'Original article ID']) await expect(dialog).toContainText(label);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('empty evidence search can recover and unavailable rate stays distinct from zero', async ({ page }) => {
  await page.getByLabel('Find an article').fill('no-results-fictional-query-9473');
  await expect(page.getByRole('heading', { name: 'No matching articles' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(page.locator('.article-list button')).toHaveCount(6);
  await page.getByText('What if there are no priority placements?', { exact: true }).click();
  await page.getByRole('button', { name: 'Show unavailable-data example' }).click();
  await expect(page.locator('.unavailable')).toContainText('Unavailable');
  await expect(page.locator('.unavailable')).toContainText('0 included / 0 eligible');
  await expect(page.locator('.unavailable')).not.toContainText('0%');
});

test('fictional JSON download matches source records', async ({ page }) => {
  const pending = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download fictional dataset' }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe('frame-fictional-dataset.json');
  const path = await download.path();
  expect(path).toBeTruthy();
  const downloaded = JSON.parse(await readFile(path!, 'utf8'));
  expect(downloaded).toEqual(dataset);
});

test('failed local download explains the failure and reset clears it', async ({ page }) => {
  await page.evaluate(() => { URL.createObjectURL = () => { throw new Error('Test download failure'); }; });
  await page.getByRole('button', { name: 'Download fictional dataset' }).click();
  await expect(page.getByRole('alert')).toContainText('The download could not start');
  await page.getByRole('button', { name: 'Reset the comparison' }).click();
  await expect(page.getByRole('alert')).toHaveCount(0);
});

test('direct chapter load, refresh, accessible static reading and responsive layout', async ({ page }, testInfo) => {
  await page.goto('/#message');
  await expect(page.locator('#message h2')).toBeVisible();
  await page.reload();
  await expect(page.locator('#message h2')).toBeVisible();
  await expect(page.locator('.rate-card')).toHaveCount(rows.length);
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('message-viewport.png') });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath('hero-viewport.png') });
  await page.screenshot({ path: testInfo.outputPath('story.png'), fullPage: true });
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(accessibility.violations).toEqual([]);
});
