import { formatCurrency } from "@/lib/dashboardMapper";
import { PayoutSummary } from "@/types/dashboard";
import { QuotaProgress } from "./QuotaProgress";

type PayoutCardProps = {
  summary: PayoutSummary;
};

export function PayoutCard({ summary }: PayoutCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-slate-800 sm:mb-5 sm:text-lg">
        Your Payouts
      </h2>

      <button className="mb-5 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 sm:mb-6">
        {summary.periodLabel}
      </button>

      <div className="mb-8 inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:mb-10 sm:px-5 sm:py-4">
        <div className="h-10 w-10 rounded-xl bg-violet-100" />
        <div>
          <p className="text-3xl font-semibold text-slate-800 sm:text-4xl">
            {formatCurrency(summary.payoutAmount)}
          </p>
          <p className="text-sm font-semibold text-slate-700 sm:text-base">
            {summary.payoutLabel}
          </p>
        </div>
      </div>

      <QuotaProgress
        current={summary.currentAttainmentPercent}
        goal={summary.goalPercent}
      />

      <button className="mt-10 w-full rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 sm:mt-16 sm:text-base">
        {summary.ctaLabel}
      </button>
    </section>
  );
}
