import dashboardJson from "@/data/dashboard.json";
import { DashboardData } from "@/types/dashboard";

export function getDashboardData(): DashboardData {
  return dashboardJson as DashboardData;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactCurrency(value: number): string {
  if (value >= 1000) {
    const compact = value / 1000;
    const digits = compact >= 10 ? 1 : 2;
    return `$${compact.toFixed(digits)}K`;
  }

  return formatCurrency(value);
}
