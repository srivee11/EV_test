export type SidebarItem = {
  id: string;
  label: string;
  abbreviation: string;
};

export type PayoutSummary = {
  periodLabel: string;
  payoutAmount: number;
  payoutLabel: string;
  currentAttainmentPercent: number;
  goalPercent: number;
  ctaLabel: string;
};

export type TrackerBar = {
  month: string;
  value: number;
};

export type PayoutTracker = {
  selectedView: "Monthly" | "Quarterly";
  year: number;
  ytdPayout: number;
  ytdVariablePercent: number;
  bars: TrackerBar[];
};

export type DashboardData = {
  companyInitials: string;
  breadcrumb: string[];
  greeting: string;
  sidebarItems: SidebarItem[];
  payoutSummary: PayoutSummary;
  payoutTracker: PayoutTracker;
};
