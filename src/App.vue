<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
import {
  VesperBrand,
  VesperBadge,
  VesperNotice,
  VesperEmpty,
} from "@vesper/ui/vue";
import { campaignColors, chartStyle } from "./presentation/campaignStyle";
import { scaleLinear } from "d3-scale";
import {
  dataset,
  summarize,
  formatRate,
  unavailableExample,
} from "./data/metrics";
import VolumeChart from "./components/VolumeChart.vue";
const rows = summarize();
const volumeLeader = [...rows].sort((a, b) => b.published - a.published)[0]!;
const distinctLeader = [...rows].sort((a, b) => b.distinct - a.distinct)[0]!;
const messageLeader = [...rows].sort(
  (a, b) => (b.rate ?? -1) - (a.rate ?? -1),
)[0]!;
const mode = ref<"published" | "distinct">("published");
const selected = ref("");
const evidenceCampaign = ref(dataset.campaigns[0]!.id);
const query = ref("");
const evidenceSection = ref<HTMLElement>();
const campaignSelect = ref<HTMLSelectElement>();
function showCampaignEvidence(id: string) {
  evidenceCampaign.value = id;
  query.value = "";
  evidenceSection.value?.scrollIntoView();
  campaignSelect.value?.focus({ preventScroll: true });
}
const evidence = ref<HTMLDialogElement>();
const openArticleId = ref("");
const returnFocus = ref<HTMLElement>();
const downloadError = ref("");
const demo = ref(false);
const selectedName = computed(
  () => rows.find((r) => r.campaign.id === selected.value)?.campaign.name,
);
const articles = computed(() =>
  dataset.articles.filter(
    (a) =>
      a.campaignId === evidenceCampaign.value &&
      `${a.headline} ${a.excerpt} ${outlet(a.outletId)?.name}`
        .toLowerCase()
        .includes(query.value.toLowerCase()),
  ),
);
const article = computed(() =>
  dataset.articles.find((a) => a.id === openArticleId.value),
);
const articleCampaign = computed(() =>
  dataset.campaigns.find((c) => c.id === article.value?.campaignId),
);
const articleGroup = computed(() =>
  dataset.storyGroups.find((g) => g.id === article.value?.storyGroupId),
);
const repeatGroup = dataset.storyGroups.find(
  (g) =>
    g.campaignId === volumeLeader.campaign.id &&
    dataset.articles.filter((a) => a.storyGroupId === g.id).length > 1,
)!;
const repeats = dataset.articles.filter(
  (a) => a.storyGroupId === repeatGroup.id,
);
const percent = scaleLinear().domain([0, 1]).range([0, 100]);
const total = dataset.articles.length;
const dates = dataset.articles.map((a) => a.date).sort();
const dateLabel = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
const period = `${dateLabel(dates[0]!)} – ${dateLabel(dates.at(-1)!)}`;
function outlet(id: string) {
  return dataset.outlets.find((o) => o.id === id);
}
async function openArticle(id: string, event: Event) {
  openArticleId.value = id;
  returnFocus.value = event.currentTarget as HTMLElement;
  // Let the conditional evidence content mount before native autofocus runs.
  await nextTick();
  evidence.value?.showModal();
}
function closeEvidence() {
  evidence.value?.close();
}
function reset() {
  mode.value = "published";
  selected.value = "";
  evidenceCampaign.value = dataset.campaigns[0]!.id;
  query.value = "";
  demo.value = false;
  downloadError.value = "";
}
function download() {
  try {
    const blob = new Blob([JSON.stringify(dataset, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "frame-fictional-dataset.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    downloadError.value = "";
  } catch {
    downloadError.value =
      "The download could not start. Please try again in this browser.";
  }
}
</script>
<template>
  <a class="vs-skip" href="#story">Skip to story</a>
  <header class="masthead">
    <VesperBrand href="#" aria-label="Vesper Media Group, top" />
    <span class="edition">FRAME / THE MEASUREMENT EDIT</span>
    <a class="vs-button vs-button--quiet" href="#methodology">Methodology</a>
  </header>
  <main id="story">
    <section class="hero" aria-labelledby="title">
      <div class="eyebrow">
        <span class="dot"></span> FRAME · A FICTIONAL DATA STORY
      </div>
      <h1 id="title" class="vs-display">
        Beyond the<br /><em>headline count.</em>
      </h1>
      <div class="hero-bottom">
        <p class="dek">
          The biggest coverage number makes a good headline.<br
            class="desktop-break"
          />
          Does it tell the whole story?
        </p>
        <a
          href="#volume"
          class="vs-button vs-button--secondary begin-link"
          aria-label="Begin the story"
          >Begin the story</a
        >
      </div>
      <div class="meta">
        <span>{{ dataset.campaigns.length }} CAMPAIGNS</span
        ><span>{{ total }} PUBLISHED ITEMS</span><span>{{ period }}</span
        ><span>ALL DATA INVENTED</span>
      </div>
    </section>
    <nav class="story-nav vs-tabs" aria-label="Story chapters">
      <a href="#volume">01 <span>The count</span></a
      ><a href="#reveal">02 <span>The repeat</span></a
      ><a href="#message">03 <span>The message</span></a
      ><a href="#takeaway">04 <span>The takeaway</span></a>
    </nav>
    <section id="volume" class="chapter">
      <div class="chapter-title">
        <span class="chapter-number">01 / THE APPARENT WINNER</span>
        <h2>Start with the<br />number everyone sees.</h2>
      </div>
      <div class="split">
        <div class="prose">
          <p>
            {{ dataset.campaigns.length }} campaigns. One reporting window. In a
            report that counts every published item,
            <strong
              >{{ volumeLeader.campaign.name }} leads with
              {{ volumeLeader.published }}.</strong
            >
          </p>
          <p>
            It looks like a clear winner. But first, decide what you want that
            number to mean.
          </p>
          <div class="margin-note">
            <span>THE FIRST QUESTION</span>Are we counting placements,<br />or
            different stories?
          </div>
        </div>
        <div class="chart-panel">
          <div class="panel-label">
            COVERAGE AT A GLANCE <span>FIG. 01</span>
          </div>
          <VolumeChart mode="published" :selected="selected" />
          <p class="chart-note">
            One published item = one article record. This is a count of
            coverage, not unique audience reach.
          </p>
        </div>
      </div>
      <div class="campaign-controls">
        <span>Follow a campaign</span
        ><button
          v-for="(r, i) in rows"
          :key="r.campaign.id"
          :aria-pressed="selected === r.campaign.id"
          @click="selected = selected === r.campaign.id ? '' : r.campaign.id"
          :style="{ '--campaign': campaignColors[r.campaign.id] }"
          :class="['vs-button', 'vs-button--secondary', 'campaign-button']"
        >
          <span>{{ String(i + 1).padStart(2, "0") }}</span>
          {{ r.campaign.name }}
          <span v-if="selected === r.campaign.id" class="vs-sr-only"
            >Following</span
          ></button
        ><button class="vs-button vs-button--quiet text-button" @click="reset">
          Reset story
        </button>
      </div>
      <p class="selection-note" role="status">
        {{
          selectedName
            ? `Following ${selectedName}. All campaigns remain in the comparison.`
            : "Choose a campaign to highlight it throughout the story."
        }}
      </p>
      <div class="campaign-intros">
        <article
          v-for="r in rows"
          :key="r.campaign.id"
          :class="{ chosen: selected === r.campaign.id }"
        >
          <span class="small-label">{{ r.campaign.name }}</span>
          <h3>{{ r.campaign.purpose }}</h3>
          <p>{{ r.campaign.audience }}</p>
        </article>
      </div>
      <a class="chapter-next" href="#reveal"
        >Next: what the count hides <span></span
      ></a>
    </section>
    <section id="reveal" class="chapter reveal">
      <div class="chapter-title">
        <span class="chapter-number">02 / WHAT THE COUNT HIDES</span>
        <h2>More coverage.<br />Not always more stories.</h2>
      </div>
      <div class="split">
        <div class="prose">
          <p>
            Some articles travel. An original story can be republished by
            several outlets, adding placements without adding a new story.
          </p>
          <p>
            Count each story group once and
            <strong
              >{{ volumeLeader.campaign.name }} moves from
              {{ volumeLeader.published }} published items to
              {{ volumeLeader.distinct }} distinct stories.</strong
            >
            {{ distinctLeader.campaign.name }} now has the most distinct
            stories: {{ distinctLeader.distinct }}.
          </p>
          <p>
            Syndication can extend distribution. It is not automatically waste.
            It simply answers a different question.
          </p>
        </div>
        <div class="chart-panel">
          <div class="panel-label">CHANGE THE UNIT <span>FIG. 02</span></div>
          <div
            class="segmented vs-segmented"
            aria-label="Volume comparison unit"
          >
            <button
              class="vs-button vs-button--quiet"
              :aria-pressed="mode === 'published'"
              @click="mode = 'published'"
            >
              Published items</button
            ><button
              class="vs-button vs-button--quiet"
              :aria-pressed="mode === 'distinct'"
              @click="mode = 'distinct'"
            >
              Distinct stories
            </button>
          </div>
          <VolumeChart :mode="mode" :selected="selected" />
          <p class="chart-note" aria-live="polite">
            {{
              mode === "published"
                ? "Every article is counted, including syndicated copies."
                : "Each original-story group is counted once."
            }}
            This toggle changes only this volume comparison; message rates still
            use priority-placement articles.
          </p>
        </div>
      </div>
      <details class="syndication">
        <summary>
          One story, {{ repeats.length }} placements
          <span>Inspect a concrete example</span>
        </summary>
        <p>
          Story group {{ repeatGroup.id }} contains an original and
          {{ repeats.length - 1 }} syndicated copies. Each placement remains in
          the published count.
        </p>
        <div class="copy-list">
          <button
            v-for="a in repeats"
            :key="a.id"
            @click="openArticle(a.id, $event)"
          >
            <span>{{
              a.id === repeatGroup.originalArticleId
                ? "ORIGINAL"
                : "SYNDICATED COPY"
            }}</span
            ><strong>{{ outlet(a.outletId)?.name }}</strong
            ><span>{{ dateLabel(a.date) }} </span>
          </button>
        </div>
      </details>
      <div class="chapter-navigation">
        <a href="#volume"> Back to the count</a
        ><a href="#message">Next: did the message land? </a>
      </div>
    </section>
    <section id="message" class="chapter">
      <div class="chapter-title">
        <span class="chapter-number"
          >03 / DID THE MESSAGE APPEAR WHERE IT MATTERED?</span
        >
        <h2>
          Being mentioned is one thing.<br />Carrying the message is another.
        </h2>
      </div>
      <p class="section-dek">
        Priority outlets are chosen for each campaign’s intended audience. Among
        those placements, how often did the campaign’s primary message appear?
      </p>
      <div class="rate-grid">
        <article
          v-for="r in rows"
          :key="r.campaign.id"
          :style="{ '--campaign': campaignColors[r.campaign.id] }"
          :class="[
            'rate-card',
            r.campaign.id,
            { chosen: selected === r.campaign.id },
          ]"
        >
          <div class="rate-heading">
            <h3>{{ r.campaign.name }}</h3>
            <span v-if="r.campaign.id === volumeLeader.campaign.id"
              >MOST ITEMS</span
            ><span v-else-if="r.campaign.id === messageLeader.campaign.id"
              >HIGHEST INCLUSION</span
            >
          </div>
          <p class="rate-value">{{ formatRate(r.rate) }}</p>
          <svg
            viewBox="0 0 100 4"
            role="img"
            :aria-label="`${r.included} of ${r.priority} priority placements include the message`"
          >
            <rect width="100" height="4" :fill="chartStyle.grid" />
            <rect
              :width="percent(r.rate ?? 0)"
              height="4"
              fill="currentColor"
            />
          </svg>
          <p class="denominator">
            <strong>{{ r.included }} of {{ r.priority }}</strong> priority
            placements<br />include the primary message
          </p>
          <div class="primary-message">
            <span>THE PRIMARY MESSAGE</span>
            <p>“{{ r.campaign.primaryMessage }}”</p>
          </div>
          <button
            class="vs-button vs-button--quiet text-button"
            @click="showCampaignEvidence(r.campaign.id)"
          >
            Read supporting articles
          </button>
        </article>
      </div>
      <p class="reading-note">
        {{ volumeLeader.campaign.name }} has the most published items, but
        {{ messageLeader.campaign.name }} has the highest message-inclusion rate
        in its priority placements. This measures what appeared in articles—not
        what readers understood or did.
      </p>
      <div id="evidence-list" ref="evidenceSection" class="evidence-section">
        <div class="evidence-heading">
          <div>
            <span class="small-label">LOOK AT THE UNDERLYING COVERAGE</span>
            <h3>Evidence, not just a percentage.</h3>
          </div>
          <VesperBadge tone="neutral" class="fiction-tag"
            >Fictional editorial annotations</VesperBadge
          >
        </div>
        <div class="evidence-filters">
          <label class="vs-field"
            ><span class="vs-field__label">Campaign</span
            ><select
              class="vs-input"
              ref="campaignSelect"
              v-model="evidenceCampaign"
            >
              <option v-for="c in dataset.campaigns" :key="c.id" :value="c.id">
                {{ c.name }}
              </option>
            </select></label
          ><label class="vs-field"
            ><span class="vs-field__label">Find an article</span
            ><input
              class="vs-input"
              v-model="query"
              type="search"
              placeholder="Search headlines, excerpts or outlets"
          /></label>
        </div>
        <p role="status" class="result-count">
          {{ articles.length }} matching article{{
            articles.length === 1 ? "" : "s"
          }}. Showing {{ Math.min(6, articles.length) }} prepared examples.
        </p>
        <div v-if="articles.length" class="article-list">
          <button
            v-for="a in articles.slice(0, 6)"
            :key="a.id"
            @click="openArticle(a.id, $event)"
          >
            <span class="article-outlet"
              >{{ outlet(a.outletId)?.name
              }}<small>{{ dateLabel(a.date) }}</small></span
            ><strong>{{ a.headline }}</strong>
            <VesperBadge
              :tone="a.messageIncluded ? 'info' : 'neutral'"
              class="message-label"
              >{{
                a.messageIncluded ? "Message included" : "Message absent"
              }}</VesperBadge
            >
          </button>
        </div>
        <VesperEmpty
          v-else
          class="empty-state"
          title="No matching articles"
          description="Try another phrase. The story’s overall comparison has not changed."
        >
          <button class="vs-button vs-button--secondary" @click="query = ''">
            Clear search
          </button>
        </VesperEmpty>
      </div>
      <div class="chapter-navigation">
        <a href="#reveal"> Back to the repeat</a
        ><a href="#takeaway">Next: a better question </a>
      </div>
    </section>
    <section id="takeaway" class="takeaway chapter">
      <span class="chapter-number">04 / A BETTER REPORTING QUESTION</span>
      <h2>Define success.<br /><em>Then count what matters.</em></h2>
      <p class="section-dek">
        The volume leader is not the message leader. A useful report keeps the
        measures together—and knows which question each one answers.
      </p>
      <p class="table-hint">
        On narrow screens, scroll the comparison horizontally. Keyboard users
        can focus the table and use arrow keys.
      </p>
      <div
        class="table-wrap vs-table-region"
        tabindex="0"
        role="region"
        aria-label="Campaign comparison, scroll horizontally on small screens"
      >
        <table class="vs-table">
          <caption>
            Campaign comparison ·
            {{
              period
            }}
          </caption>
          <thead>
            <tr>
              <th scope="col">Campaign</th>
              <th scope="col">Published<br />items</th>
              <th scope="col">Distinct<br />stories</th>
              <th scope="col">Priority<br />placements</th>
              <th scope="col">Message inclusion<br />in priority placements</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="r in rows"
              :key="r.campaign.id"
              :class="{ chosen: selected === r.campaign.id }"
            >
              <th scope="row">
                {{ r.campaign.name
                }}<span v-if="selected === r.campaign.id"> · following</span>
              </th>
              <td>{{ r.published }}</td>
              <td>{{ r.distinct }}</td>
              <td>{{ r.priority }}</td>
              <td>
                {{ formatRate(r.rate) }}
                <small>({{ r.included }}/{{ r.priority }})</small>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="takeaway-bottom">
        <p>
          Before the next campaign, agree on the audience, priority outlets, and
          message. Report coverage and story diversity alongside message
          inclusion. Investigate audience response separately.
        </p>
        <button
          @click="reset"
          class="vs-button vs-button--secondary light-button"
        >
          Reset the comparison
        </button>
      </div>
      <a href="#message" class="back-link"> Revisit the evidence</a>
    </section>
    <section id="methodology" class="methodology chapter">
      <div>
        <span class="chapter-number">THE SMALL PRINT, MADE READABLE</span>
        <h2>How this story is counted.</h2>
        <p>
          Every campaign, outlet, headline and annotation is invented for this
          demonstration. These are not findings about a real company or the
          wider industry.
        </p>
        <button
          class="vs-button vs-button--primary download-button"
          @click="download"
        >
          Download fictional dataset <span>JSON </span>
        </button>
        <VesperNotice
          v-if="downloadError"
          title="Download unavailable"
          tone="danger"
          announcement="assertive"
          >{{ downloadError }}</VesperNotice
        >
      </div>
      <div class="methods">
        <details open>
          <summary>Four measures, explicit denominators</summary>
          <dl>
            <dt>Published coverage</dt>
            <dd>All article records, including syndicated copies.</dd>
            <dt>Distinct stories</dt>
            <dd>
              Unique original-story group IDs. Each group belongs to one
              campaign and identifies an original article.
            </dd>
            <dt>Priority placements</dt>
            <dd>
              Article records in that campaign’s priority outlets. Priority is
              audience-specific, not a universal quality score.
            </dd>
            <dt>Message-inclusion rate</dt>
            <dd>
              Priority articles labeled “message included” ÷ all priority
              articles. Copies remain in both numerator and denominator when
              eligible. The volume toggle never changes this definition.
            </dd>
          </dl>
        </details>
        <details>
          <summary>Prepared annotations, not live AI judgments</summary>
          <p>
            Excerpts and Boolean labels were authored together using each
            campaign’s explicit primary message. “Absent” means the full primary
            message is not supported by the prepared excerpt. No AI service
            reviews articles at runtime.
          </p>
          <p>
            The dataset is constructed to illustrate the argument. It is not a
            representative sample, and no uncertainty estimate or causal
            conclusion is warranted.
          </p>
        </details>
        <details>
          <summary>What if there are no priority placements?</summary>
          <p>
            A missing denominator is unavailable, not zero percent. This
            isolated demonstration does not alter the campaign data.
          </p>
          <button
            class="vs-button vs-button--secondary"
            :aria-pressed="demo"
            @click="demo = !demo"
          >
            {{ demo ? "Hide" : "Show" }} unavailable-data example
          </button>
          <VesperNotice
            v-if="demo"
            class="unavailable"
            :title="formatRate(unavailableExample.rate)"
            tone="neutral"
            announcement="polite"
          >
            <p>
              {{ unavailableExample.priority }} eligible priority placements ·
              {{ unavailableExample.included }} included /
              {{ unavailableExample.priority }} eligible. No rate can be
              calculated.
            </p>
          </VesperNotice>
        </details>
        <details>
          <summary>What these numbers cannot tell us</summary>
          <p>
            Syndication is not inherently bad. Published items are not unique
            audience reach. Message inclusion does not prove reader
            understanding, behavior change, revenue, or campaign causality.
          </p>
        </details>
      </div>
    </section>
  </main>
  <footer>
    <VesperBrand href="#" /><span>Frame · An interactive editorial story</span
    ><span>A fictional story. A useful question.</span>
  </footer>
  <dialog
    class="vs-dialog"
    ref="evidence"
    aria-labelledby="evidence-title"
    @close="returnFocus?.focus()"
    @click="$event.target === evidence && closeEvidence()"
  >
    <template v-if="article && articleCampaign"
      ><div class="dialog-top">
        <span class="eyebrow">ARTICLE EVIDENCE / FICTIONAL</span
        ><button
          class="vs-button vs-button--secondary"
          autofocus
          @click="closeEvidence"
          aria-label="Close article evidence"
        >
          Close
        </button>
      </div>
      <p class="small-label">
        {{ articleCampaign.name }} · {{ outlet(article.outletId)?.name }} ·
        {{ dateLabel(article.date) }}
      </p>
      <h2 id="evidence-title">{{ article.headline }}</h2>
      <blockquote class="vs-quote">{{ article.excerpt }}</blockquote>
      <dl class="evidence-meta">
        <dt>Campaign primary message</dt>
        <dd>{{ articleCampaign.primaryMessage }}</dd>
        <dt>Outlet priority status</dt>
        <dd>
          {{
            articleCampaign.priorityOutletIds.includes(article.outletId)
              ? "Priority outlet for this campaign"
              : "Not a priority outlet for this campaign"
          }}
        </dd>
        <dt>Prepared message label</dt>
        <dd>
          {{ article.messageIncluded ? "Message included" : "Message absent" }}
          — {{ article.annotationRationale }}
        </dd>
        <dt>Story group</dt>
        <dd>
          {{ article.storyGroupId }} ·
          {{
            article.id === articleGroup?.originalArticleId
              ? "Original article"
              : "Syndicated copy"
          }}
        </dd>
        <dt>Original article ID</dt>
        <dd>{{ articleGroup?.originalArticleId }}</dd>
        <dt>This article ID</dt>
        <dd>{{ article.id }}</dd>
      </dl></template
    >
  </dialog>
</template>
