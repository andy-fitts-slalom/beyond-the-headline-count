<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { scaleLinear } from "d3-scale";
import { summarize } from "../data/metrics";
import { campaignColors, chartStyle } from "../presentation/campaignStyle";
const props = defineProps<{
  mode: "published" | "distinct";
  selected: string;
}>();
const rows = summarize();
const figure = ref<HTMLElement>();
const width = ref(600);
let observer: ResizeObserver | undefined;
onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    if (entry) width.value = entry.contentRect.width;
  });
  if (figure.value) observer.observe(figure.value);
});
onUnmounted(() => observer?.disconnect());
// Match SVG user units to rendered CSS pixels so labels remain >=12px on phones.
const x = computed(() =>
  scaleLinear()
    .domain([0, Math.max(...rows.map((r) => r.published))])
    .range([0, Math.max(0, width.value - 16)]),
);
const label = computed(() =>
  props.mode === "published" ? "Published items" : "Distinct stories",
);
</script>
<template>
  <figure ref="figure" class="volume-figure">
    <figcaption>
      <span>{{ label }}</span
      ><span>Same campaigns. A different unit.</span>
    </figcaption>
    <svg
      :viewBox="`0 0 ${width} 278`"
      role="img"
      :aria-label="`${label}: ${rows.map((r) => `${r.campaign.name} ${r[mode]}`).join(', ')}`"
    >
      <g v-for="tick in x.ticks(3)" :key="tick">
        <line
          :x1="8 + x(tick)"
          :x2="8 + x(tick)"
          y1="36"
          y2="230"
          :stroke="chartStyle.grid"
        />
        <text
          :x="8 + x(tick)"
          y="264"
          :text-anchor="
            tick === 0 ? 'start' : tick === x.domain()[1] ? 'end' : 'middle'
          "
          class="axis"
        >
          {{ tick }}
        </text>
      </g>
      <g
        v-for="(row, i) in rows"
        :key="row.campaign.id"
        :class="{ 'chart-highlight': selected === row.campaign.id }"
      >
        <text x="8" :y="22 + i * 80" class="chart-name">
          {{ row.campaign.name }}
        </text>
        <text
          :x="width - 8"
          :y="22 + i * 80"
          text-anchor="end"
          class="chart-value"
        >
          {{ row[mode] }}
        </text>
        <rect
          x="8"
          :y="36 + i * 80"
          :width="x(row[mode])"
          height="28"
          rx="4"
          :fill="campaignColors[row.campaign.id]"
        />
        <rect
          v-if="selected === row.campaign.id"
          x="5"
          :y="33 + i * 80"
          :width="x(row[mode]) + 6"
          height="34"
          rx="4"
          fill="none"
          :stroke="chartStyle.text"
          stroke-width="2"
        />
      </g>
    </svg>
  </figure>
</template>
