import { meridianChartStyle } from "@meridian/ui/charts";

// Appearance only. Campaign identity stays local; metrics stay in data/metrics.
export const chartStyle = meridianChartStyle("paper");
export const campaignColors: Record<string, string> = {
  signal: chartStyle.colors[0]!,
  frame: chartStyle.colors[1]!,
  folio: chartStyle.colors[2]!,
};
