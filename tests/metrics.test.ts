import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import test from 'node:test'
import { dataset, formatRate, getArticles, summarize, unavailableExample } from '../src/data/metrics'

test('deterministic generator reproduces the checked-in source exactly', () => {
  const path = new URL('../src/data/dataset.json', import.meta.url)
  const before = readFileSync(path, 'utf8')
  execFileSync(process.execPath, [new URL('../scripts/generate-data.mjs', import.meta.url).pathname])
  assert.equal(readFileSync(path, 'utf8'), before)
})

test('all records have valid links, dates, originals and prepared evidence', () => {
  const campaigns = new Map(dataset.campaigns.map(campaign => [campaign.id, campaign]))
  const outlets = new Set(dataset.outlets.map(outlet => outlet.id))
  const groups = new Map(dataset.storyGroups.map(group => [group.id, group]))
  const articles = new Map(dataset.articles.map(article => [article.id, article]))
  assert.equal(articles.size, dataset.articles.length)
  assert.equal(groups.size, dataset.storyGroups.length)
  assert.equal(campaigns.size, dataset.campaigns.length)
  assert.equal(outlets.size, dataset.outlets.length)
  for (const campaign of campaigns.values()) {
    assert.ok(campaign.primaryMessage.length > 20)
    for (const id of campaign.priorityOutletIds) assert.ok(outlets.has(id))
  }
  for (const article of dataset.articles) {
    const campaign = campaigns.get(article.campaignId)!
    const group = groups.get(article.storyGroupId)!
    assert.ok(campaign)
    assert.ok(group)
    assert.ok(outlets.has(article.outletId))
    assert.equal(group.campaignId, article.campaignId)
    assert.ok(article.date >= campaign.startDate && article.date <= campaign.endDate)
    const original = articles.get(group.originalArticleId)!
    assert.ok(original)
    assert.equal(original.storyGroupId, group.id)
    assert.ok(original.date <= article.date)
    assert.equal(typeof article.messageIncluded, 'boolean')
    assert.ok(article.excerpt.length > 80)
    assert.ok(article.annotationRationale.length > 50)
  }
  for (const group of groups.values()) assert.ok(dataset.articles.some(article => article.storyGroupId === group.id))
})

test('published, distinct, repeated and priority denominators match article records', () => {
  const metrics = summarize()
  assert.deepEqual(metrics.map(({ published, distinct, repeated, priority, included, rate }) => ({ published, distinct, repeated, priority, included, rate })), [
    { published: 120, distinct: 24, repeated: 96, priority: 60, included: 18, rate: .3 },
    { published: 72, distinct: 42, repeated: 30, priority: 36, included: 27, rate: .75 },
    { published: 48, distinct: 36, repeated: 12, priority: 30, included: 24, rate: .8 },
  ])
  for (const metric of metrics) {
    const records = getArticles(metric.campaign.id)
    assert.equal(metric.published, records.length)
    assert.equal(metric.distinct, new Set(records.map(article => article.storyGroupId)).size)
    assert.equal(metric.included, records.filter(article => article.messageIncluded && metric.campaign.priorityOutletIds.includes(article.outletId)).length)
    assert.equal(metric.rate, metric.included / metric.priority)
  }
})

test('record-derived rankings support the story without identical rankings on every measure', () => {
  const metrics = summarize()
  const highestVolume = [...metrics].sort((a, b) => b.published - a.published)[0]!
  assert.equal(highestVolume.campaign.id, 'signal')
  assert.equal(highestVolume.rate, Math.min(...metrics.map(metric => metric.rate!)))
  assert.equal([...metrics].sort((a, b) => b.distinct - a.distinct)[0]!.campaign.id, 'frame')
  assert.equal([...metrics].sort((a, b) => b.rate! - a.rate!)[0]!.campaign.id, 'folio')
})

test('deduplication affects volume only and does not change priority message denominator', () => {
  const original = summarize()
  const regrouped = summarize({ ...dataset, articles: dataset.articles.map(article => ({ ...article, storyGroupId: article.id })) })
  for (const [index, metric] of original.entries()) {
    assert.equal(regrouped[index]!.distinct, metric.published)
    assert.equal(regrouped[index]!.priority, metric.priority)
    assert.equal(regrouped[index]!.included, metric.included)
    assert.equal(regrouped[index]!.rate, metric.rate)
  }
})

test('absent priority placements are unavailable; observed zero inclusion is zero', () => {
  assert.equal(unavailableExample.priority, 0)
  assert.equal(unavailableExample.rate, null)
  assert.equal(formatRate(unavailableExample.rate), 'Unavailable')
  for (const metric of summarize({ ...dataset, articles: [] })) {
    assert.equal(metric.published, 0)
    assert.equal(metric.distinct, 0)
    assert.equal(metric.rate, null)
  }
  const zero = summarize({ ...dataset, articles: dataset.articles.map(article => ({ ...article, messageIncluded: false })) })
  assert.ok(zero.every(metric => metric.rate === 0))
  assert.equal(formatRate(0), '0%')
})

test('priority status is campaign-specific rather than an outlet quality score', () => {
  const noSignalPriority = summarize({ ...dataset, campaigns: dataset.campaigns.map(campaign => campaign.id === 'signal' ? { ...campaign, priorityOutletIds: [] } : campaign) })
  assert.equal(noSignalPriority[0]!.rate, null)
  assert.deepEqual(noSignalPriority.slice(1), summarize().slice(1))
})
