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
  planBuilder: PlanBuilderData;
  assistant: AssistantData;
};

export type PlanBuilderComponentItem = {
  id: string;
  label: string;
  active?: boolean;
};

export type PlanBuilderCondition = {
  label: string;
  operator: string;
  value: string;
};

export type PlanBuilderAction = {
  label: string;
  operator?: string;
  value?: string;
};

export type PlanBuilderRule = {
  id: string;
  indent: number;
  type: "if" | "then" | "else";
  condition?: PlanBuilderCondition;
  action?: PlanBuilderAction;
  addIf?: boolean;
  doNothing?: boolean;
  success?: boolean;
};

export type PlanBuilderData = {
  planName: string;
  status: string;
  payoutFrequency: string;
  planDocument: string;
  tabs: string[];
  activeTab: string;
  topActions: string[];
  payeesLabel: string;
  componentsLabel: string;
  payeesAction: string;
  components: PlanBuilderComponentItem[];
  calculatePayout: boolean;
  rules: PlanBuilderRule[];
};

export type AssistantPrompt = {
  id: string;
  label: string;
  responseId: string;
};

export type AssistantThread = {
  id: string;
  title: string;
  updatedAt: string;
  responseId: string;
};

export type AssistantResponse = {
  id: string;
  query: string;
  summary: string;
  flags: string[];
  suggestions: string[];
  sources: string[];
};

export type AssistantData = {
  title: string;
  subtitle: string;
  welcomeHeading: string;
  welcomeBody: string;
  suggestedPrompts: AssistantPrompt[];
  savedThreads: AssistantThread[];
  sampleResponse: AssistantResponse;
  responses: AssistantResponse[];
};
