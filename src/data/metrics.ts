import rawDataset from './dataset.json'
import type { Article, CampaignMetrics, Dataset } from './types'

export const dataset: Dataset = rawDataset

export function getArticles(campaignId: string, data: Dataset = dataset): Article[] {
  return data.articles.filter(article => article.campaignId === campaignId)
}

export function summarize(data: Dataset = dataset): CampaignMetrics[] {
  return data.campaigns.map(campaign => {
    const articles = getArticles(campaign.id, data)
    const distinct = new Set(articles.map(article => article.storyGroupId)).size
    const priorityArticles = articles.filter(article => campaign.priorityOutletIds.includes(article.outletId))
    const included = priorityArticles.filter(article => article.messageIncluded).length
    return {
      campaign, published: articles.length, distinct, repeated: articles.length - distinct,
      priority: priorityArticles.length, included,
      rate: priorityArticles.length ? included / priorityArticles.length : null,
    }
  })
}

export function formatRate(rate: number | null): string {
  return rate === null ? 'Unavailable' : `${Math.round(rate * 100)}%`
}

/** A separately labeled demonstration; never substituted for story records. */
export const unavailableExample = summarize({
  ...dataset,
  campaigns: [{ ...dataset.campaigns[0]!, priorityOutletIds: [] }],
})[0]!
