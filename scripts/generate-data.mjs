import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// No randomness, network calls, current dates, or private source material.
const outlets = [
  ['aurora', 'Aurora Listening Desk', 'Audio culture', 'Curious podcast listeners'],
  ['interval', 'The Interval Review', 'Culture criticism', 'Culture enthusiasts'],
  ['screenfold', 'Screenfold Journal', 'Screen industry', 'Independent filmmakers and screen audiences'],
  ['northline', 'Northline Arts Ledger', 'Regional arts', 'Regional arts communities'],
  ['pageform', 'Pageform Weekly', 'Digital publishing', 'Readers and independent creators'],
  ['civicloom', 'Civic Loom', 'Ideas and society', 'Readers interested in local civic life'],
  ['daybreak', 'Daybreak Bulletin', 'General news', 'General news readers'],
  ['crosscurrent', 'Crosscurrent Wire', 'Syndication', 'Regional news editors'],
  ['weekender', 'The Weekender Desk', 'Entertainment listings', 'Weekend entertainment seekers'],
].map(([id, name, category, audience]) => ({ id, name, category, audience }))

const campaigns = [
  {
    id: 'signal', name: 'Signal',
    purpose: 'Launch Signal, a podcast about the people shaping neighborhood sound.',
    audience: 'Curious listeners seeking locally rooted audio storytelling',
    primaryMessage: 'Signal pairs local voices with practical listening guides to help listeners explore their own neighborhoods.',
    priorityOutletIds: ['aurora', 'interval', 'northline'],
  },
  {
    id: 'frame', name: 'Frame',
    purpose: 'Introduce Frame, a streaming showcase of independent regional films.',
    audience: 'Film enthusiasts who want context from independent creators',
    primaryMessage: 'Frame pairs independent regional films with filmmaker conversations that reveal how each story was made.',
    priorityOutletIds: ['screenfold', 'interval', 'northline'],
  },
  {
    id: 'folio', name: 'Folio',
    purpose: 'Launch Folio, a digital magazine series examining everyday civic spaces.',
    audience: 'Thoughtful readers looking for accessible local civic reporting',
    primaryMessage: 'Folio combines reported stories about civic spaces with open reading guides for community discussion.',
    priorityOutletIds: ['pageform', 'civicloom', 'interval'],
  },
].map(campaign => ({ ...campaign, startDate: '2026-02-02', endDate: '2026-03-15' }))

const scenarios = {
  signal: { published: 120, distinct: 24, priority: 60, included: 18, subject: 'neighborhood sound', plain: 'The launch announcement lists the first episodes and introduces the hosts. It focuses on the release schedule and guest names.', positive: 'Alongside local voices, each episode includes a practical listening guide so listeners can explore the sounds of their own neighborhoods.' },
  frame: { published: 72, distinct: 42, priority: 36, included: 27, subject: 'independent regional film', plain: 'The showcase announcement highlights the film lineup and screening dates. It describes the platform launch without discussing the companion programming.', positive: 'Each independent regional film is paired with a filmmaker conversation, giving viewers context about how its story was made.' },
  folio: { published: 48, distinct: 36, priority: 30, included: 24, subject: 'everyday civic spaces', plain: 'The series announcement previews the cover artwork and names the first contributors. Its focus is the publication schedule and visual design.', positive: 'Reported stories about civic spaces come with open reading guides designed to support community discussion.' },
}

const angles = ['A new lens on', 'Behind the launch:', 'A closer look at', 'On the calendar:', 'Meet the makers of', 'The conversation around']
const articles = []
const storyGroups = []
const padded = value => String(value).padStart(3, '0')
for (const campaign of campaigns) {
  const scenario = scenarios[campaign.id]
  const nonPriority = outlets.filter(outlet => !campaign.priorityOutletIds.includes(outlet.id)).map(outlet => outlet.id)
  let priorityOrdinal = 0
  for (let index = 0; index < scenario.published; index++) {
    const groupIndex = index % scenario.distinct
    const copyIndex = Math.floor(index / scenario.distinct)
    const storyGroupId = `${campaign.id}-story-${padded(groupIndex + 1)}`
    const id = `${campaign.id}-article-${padded(index + 1)}`
    const isPriority = (index * 37) % scenario.published < scenario.priority
    // Seven is coprime with each priority count, spreading labels deterministically.
    const messageIncluded = isPriority ? ((priorityOrdinal++ * 7) % scenario.priority < scenario.included) : index % 3 !== 0
    const outletIds = isPriority ? campaign.priorityOutletIds : nonPriority
    const outletId = outletIds[(groupIndex + copyIndex) % outletIds.length]
    const dayOffset = (groupIndex % 14) + copyIndex * 7
    const date = new Date(Date.UTC(2026, 1, 2 + dayOffset)).toISOString().slice(0, 10)
    if (copyIndex === 0) storyGroups.push({ id: storyGroupId, campaignId: campaign.id, originalArticleId: id })
    articles.push({
      id, campaignId: campaign.id, outletId, date,
      headline: `${angles[groupIndex % angles.length]} ${scenario.subject} — ${campaign.id === 'signal' ? 'Signal' : campaign.id === 'frame' ? 'Frame' : 'Folio'}${copyIndex ? ' (regional edition)' : ''}`,
      excerpt: `${messageIncluded ? scenario.positive : scenario.plain} ${copyIndex ? 'This regional edition adapts the original announcement for its readers.' : 'This prepared example is the original item in its story group.'}`,
      storyGroupId, messageIncluded,
      annotationRationale: messageIncluded
        ? 'Included: the excerpt explicitly conveys the campaign’s defined primary message, including its companion resource and intended value.'
        : 'Not included: the excerpt mentions the launch but omits the companion resource and its intended value. A campaign mention alone does not qualify.',
    })
  }
}

const dataset = {
  metadata: { title: 'Beyond the Headline Count', fictional: true, version: 1, periodStart: '2026-02-02', periodEnd: '2026-03-15', annotationMethod: 'Prepared fictional editorial annotations; no automated or live AI judgments.' },
  campaigns, outlets, articles, storyGroups,
}
writeFileSync(fileURLToPath(new URL('../src/data/dataset.json', import.meta.url)), `${JSON.stringify(dataset, null, 2)}\n`)
console.log(`Generated ${articles.length} fictional article records and ${storyGroups.length} story groups.`)
