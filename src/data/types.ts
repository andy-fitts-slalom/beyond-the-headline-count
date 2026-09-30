export interface Campaign {
  id: string;
  name: string;
  purpose: string;
  startDate: string;
  endDate: string;
  audience: string;
  primaryMessage: string;
  priorityOutletIds: string[];
}

export interface Outlet {
  id: string;
  name: string;
  category: string;
  audience: string;
}

export interface Article {
  id: string;
  campaignId: string;
  outletId: string;
  date: string;
  headline: string;
  excerpt: string;
  storyGroupId: string;
  messageIncluded: boolean;
  annotationRationale: string;
}

export interface StoryGroup {
  id: string;
  campaignId: string;
  originalArticleId: string;
}

export interface Dataset {
  metadata: {
    title: string;
    fictional: boolean;
    version: number;
    periodStart: string;
    periodEnd: string;
    annotationMethod: string;
  };
  campaigns: Campaign[];
  outlets: Outlet[];
  articles: Article[];
  storyGroups: StoryGroup[];
}

export interface CampaignMetrics {
  campaign: Campaign;
  published: number;
  distinct: number;
  repeated: number;
  priority: number;
  included: number;
  rate: number | null;
}
