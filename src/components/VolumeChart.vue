<script setup lang="ts">
import { computed } from "vue";
import { scaleLinear } from "d3-scale";
import { summarize } from "../data/metrics";
const props = defineProps<{
  mode: "published" | "distinct";
  selected: string;
}>();
const rows = summarize();
const x = scaleLinear()
  .domain([0, Math.max(...rows.map((r) => r.published))])
  .range([0, 470]);
const label = computed(() =>
  props.mode === "published" ? "Published items" : "Distinct stories",
);
const colors: Record<string, string> = {
  signal: "#ae4b30",
  frame: "#285a50",
  folio: "#736095",
};
</script>
<template>
  <figure class="volume-figure">
    <figcaption>
      <span>{{ label }}</span
      ><span>Same campaigns. A different unit.</span>
    </figcaption>
    <svg
      viewBox="0 0 650 270"
      role="img"
      :aria-label="`${label}: ${rows.map((r) => `${r.campaign.name} ${r[mode]}`).join(', ')}`"
    >
      <g v-for="tick in x.ticks(4)" :key="tick">
        <line
          :x1="130 + x(tick)"
          :x2="130 + x(tick)"
          y1="28"
          y2="230"
          stroke="#ddd9cf"
        />
        <text :x="130 + x(tick)" y="258" text-anchor="middle" class="axis">
          {{ tick }}
        </text>
      </g>
      <g
        v-for="(row, i) in rows"
        :key="row.campaign.id"
        :class="{ 'chart-highlight': selected === row.campaign.id }"
      >
        <text x="0" :y="66 + i * 75" class="chart-name">
          {{ row.campaign.name }}
        </text>
        <rect
          x="130"
          :y="38 + i * 75"
          :width="x(row[mode])"
          height="44"
          rx="2"
          :fill="colors[row.campaign.id]"
        />
        <text :x="140 + x(row[mode])" :y="66 + i * 75" class="chart-value">
          {{ row[mode] }}
        </text>
        <line
          v-if="selected === row.campaign.id"
          x1="0"
          x2="60"
          :y1="76 + i * 75"
          :y2="76 + i * 75"
          stroke="currentColor"
          stroke-width="2"
        />
      </g>
    </svg>
  </figure>
</template>
