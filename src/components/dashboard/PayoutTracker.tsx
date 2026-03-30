 "use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/dashboardMapper";
import { PayoutTracker as PayoutTrackerData } from "@/types/dashboard";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar01Icon } from "@hugeicons/core-free-icons";

type PayoutTrackerProps = {
  tracker: PayoutTrackerData;
};

export function PayoutTracker({ tracker }: PayoutTrackerProps) {
  const [view, setView] = useState<"Monthly" | "Quarterly">(tracker.selectedView);

  const bars = useMemo(() => {
    if (view === "Monthly") {
      return tracker.bars;
    }

    const quarterMap = [
      { label: "Q1", months: ["Jan", "Feb", "Mar"] },
      { label: "Q2", months: ["Apr", "May", "Jun"] },
      { label: "Q3", months: ["Jul", "Aug", "Sep"] },
      { label: "Q4", months: ["Oct", "Nov", "Dec"] },
    ];

    return quarterMap.map((quarter) => ({
      month: quarter.label,
      value: tracker.bars
        .filter((bar) => quarter.months.includes(bar.month))
        .reduce((sum, bar) => sum + bar.value, 0),
    }));
  }, [tracker.bars, view]);

  const max = Math.max(...bars.map((bar) => bar.value), 20000);
  const yAxisTicks = [20000, 15000, 10000, 5000, 0];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800 sm:text-lg">
          Payouts Tracker
        </h2>
        <span className="text-slate-400">◷</span>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs sm:text-sm">
          <button
            onClick={() => setView("Monthly")}
            className={`rounded-lg px-3 py-1 font-semibold transition ${
              view === "Monthly"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView("Quarterly")}
            className={`rounded-lg px-3 py-1 font-semibold transition ${
              view === "Quarterly"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Quarterly
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1 text-xs text-slate-600 sm:text-sm">
          <HugeiconsIcon icon={Calendar01Icon} size={14} />
          {tracker.year}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 text-xs sm:mb-8 sm:text-sm">
        <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700">
          YTD payouts: {formatCurrency(tracker.ytdPayout)}
        </span>
        <span className="rounded-full bg-violet-100 px-3 py-1 font-medium text-violet-700">
          {tracker.ytdVariablePercent.toFixed(1)} % of the YTD variable pay
        </span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-[620px] gap-3 sm:gap-4">
          <div className="flex h-56 flex-col justify-between pb-6 text-[11px] text-slate-400 sm:h-72">
            {yAxisTicks.map((tick) => (
              <span key={tick}>{tick === 0 ? "$0" : `$${tick / 1000}K`}</span>
            ))}
          </div>

          <div
            className={`grid flex-1 items-end gap-2 sm:gap-3 ${
              view === "Quarterly" ? "grid-cols-4" : "grid-cols-12"
            }`}
          >
            {bars.map((bar) => (
              <div key={bar.month} className="flex flex-col items-center">
                <div className="flex h-48 w-full items-end px-1 sm:h-64">
                  <div
                    className="w-full rounded-t-sm bg-blue-500"
                    style={{ height: `${(bar.value / max) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-[10px] text-slate-500 sm:text-xs">{bar.month}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
