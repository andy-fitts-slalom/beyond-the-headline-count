# Fictional dataset and metric contract

All names, premises, outlets, article text, dates and annotations are invented for this independent Vesper Media Group prototype. No external corpus, real client material, private code or AI judgments are used.

`src/data/dataset.json` is the deterministic application source. Run `npm run generate:data` (or `node scripts/generate-data.mjs`) to regenerate it byte-for-byte. The generator has no random seed because it uses no randomness, current clock, network or environment inputs. Change the generator deliberately before regenerating; do not manually edit JSON records.

## Scenario construction

The reporting window runs from 2026-02-02 through 2026-03-15, inclusive: six weeks. Three campaigns concern a podcast, a streaming showcase and a digital magazine. Nine fictional outlets have campaign-specific priority membership. Priority indicates an intended audience fit for this scenario, not a universal quality rating.

The authored scenario deliberately assigns Signal 120 published items in 24 groups, Frame 72 in 42 groups, and Folio 48 in 36 groups. Priority placements number 60, 36 and 30, with 18, 27 and 24 message-including placements, respectively. These are generation constraints. The application never reads these constants: it computes summaries from article records with `src/data/metrics.ts`.

Article index modulo the campaign's group count assigns a stable story group. The first article in each group is the original. Later copies appear on later dates, with a local edition headline and potentially edited excerpt. Syndication can omit or retain the primary message; therefore copies in a group may receive different inclusion labels. Dates are assigned within the reporting window and originals never follow their copies. Priority selection and annotations are deterministic modular permutations, producing exact scenario totals with mixed labels. This is a teaching scenario, not a sampling model or empirical inference.

## Data dictionary

| Collection / field | Meaning |
| --- | --- |
| `metadata` | Title, fictional label, schema version, inclusive reporting bounds and annotation method. |
| `campaigns[].id`, `name` | Stable identifier and displayed campaign name. |
| `purpose`, `audience` | Campaign premise and intended audience. |
| `startDate`, `endDate` | Inclusive ISO calendar dates. |
| `primaryMessage` | Explicit message against which article inclusion is prepared. |
| `priorityOutletIds` | Outlet foreign keys specific to this campaign. |
| `outlets[].id`, `name` | Stable fictional outlet identity. |
| `category`, `audience` | Editorial remit and relevant readership; no quality score. |
| `articles[].id` | Unique published-item identifier. Every record is one item. |
| `campaignId`, `outletId` | Campaign and outlet foreign keys. |
| `date` | Publication date in ISO `YYYY-MM-DD` format. |
| `headline`, `excerpt` | Readable invented editorial evidence. Similar headlines alone are not the grouping rule. |
| `storyGroupId` | Exactly one original-story group foreign key. |
| `messageIncluded` | Prepared Boolean label: excerpt conveys the explicitly defined primary message. |
| `annotationRationale` | Explanation of why the prepared excerpt includes or omits that message. |
| `storyGroups[].id`, `campaignId` | Stable group identity and owning campaign. |
| `originalArticleId` | Identifiable original article within the group. |

## Shared calculations

`summarize(data = dataset)` returns one row per campaign, including campaigns with zero articles. `getArticles(campaignId, data = dataset)` selects its records.

- **Published items:** count article records.
- **Distinct stories:** count unique `storyGroupId` values among those records.
- **Repeated items:** published items minus distinct stories, representing items beyond one per group.
- **Priority placements:** count article records whose outlet is in that campaign's priority list.
- **Included:** count priority-placement records with `messageIncluded: true`.
- **Rate:** included divided by priority placements. A denominator of zero yields `null`, displayed as “Unavailable.” Observed zero inclusion with a positive denominator yields `0%`.

The volume toggle must select `published` or `distinct` without changing records or message denominators. Campaign highlighting must retain comparisons. `unavailableExample` is a separately labeled fixture with Signal's priority list emptied; it is not a fourth campaign or part of the story's source records. Displayed percentages use whole-percent rounding through `formatRate`; expose exact numerator and denominator beside them.

## Interpretation limits and checks

Syndication can distribute a useful story. Repetition is not evidence that a placement is worthless. Article counts do not measure unique audience reach. Message inclusion is not reader understanding, behavior change, revenue or causal impact. Campaigns have different audience goals and should not be ranked as universally successful by one metric.

Unit checks cover deterministic regeneration, valid and unique identities, foreign keys, group originals, dates, prepared evidence, record-derived counts and rankings, deduplication, denominator independence, campaign-specific priority membership, empty records, and null versus zero rates. Browser checks must separately verify that controls and rendered narrative honor this metric contract.
