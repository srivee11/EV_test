import { PlanBuilderData, PlanBuilderRule } from "@/types/dashboard";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  CheckmarkBadge01Icon,
  Calendar01Icon,
  Settings01Icon,
  NoteIcon,
  MagicWand01Icon,
  BookOpen01Icon,
  File02Icon,
  UserGroupIcon,
  Wallet02Icon,
  Chart02Icon,
  Layers02Icon,
} from "@hugeicons/core-free-icons";

type Props = {
  data: PlanBuilderData;
};

function RuleRow({ rule }: { rule: PlanBuilderRule }) {
  const leftPad = `${rule.indent * 40}px`;

  return (
    <div className="mb-3" style={{ marginLeft: leftPad }}>
      <div className="mb-2 inline-flex items-center rounded-md bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700 sm:text-xs">
        {rule.type}
      </div>
      <div className="flex min-h-14 items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 sm:px-4">
        <div className="flex flex-wrap items-center gap-2">
          {rule.condition ? (
            <>
              <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700 sm:text-sm">
                {rule.condition.label}
              </span>
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600 sm:text-sm">
                {rule.condition.operator}
              </span>
              <span className="rounded-md bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 sm:text-sm">
                {rule.condition.value}
              </span>
            </>
          ) : null}

          {rule.action ? (
            <>
              <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700 sm:text-sm">
                {rule.action.label}
              </span>
              {rule.action.operator ? (
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600 sm:text-sm">
                  {rule.action.operator}
                </span>
              ) : null}
              {rule.action.value ? (
                <span className="rounded-md bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 sm:text-sm">
                  {rule.action.value}
                </span>
              ) : null}
            </>
          ) : null}

          {rule.addIf !== undefined ? (
            <span className="ml-1 inline-flex items-center gap-2 text-xs text-slate-600 sm:ml-2 sm:text-sm">
              <input className="h-4 w-4" type="checkbox" checked={rule.addIf} readOnly />
              Add IF
            </span>
          ) : null}
          {rule.doNothing ? (
            <span className="inline-flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
              <input className="h-4 w-4" type="checkbox" checked readOnly />
              Do Nothing
            </span>
          ) : null}
        </div>
        {rule.success ? (
          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} className="text-emerald-500" />
        ) : null}
      </div>
    </div>
  );
}

export function PlanBuilderPage({ data }: Props) {
  const componentIcon = (label: string) => {
    const key = label.toLowerCase();
    if (key.includes("revenue")) return Chart02Icon;
    if (key.includes("multi")) return Layers02Icon;
    if (key.includes("implementation")) return Wallet02Icon;
    return Layers02Icon;
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] p-2 pb-20 sm:p-5 sm:pb-5">
      <main className="mx-auto max-w-[1550px] overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl">
        <header className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold text-slate-800 sm:text-xl">{data.planName}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 font-semibold text-emerald-700">
                <HugeiconsIcon icon={CheckmarkBadge01Icon} size={14} />
                {data.status}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-1 font-semibold text-violet-700">
                <HugeiconsIcon icon={Calendar01Icon} size={14} />
                {data.payoutFrequency}
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1 text-slate-600">
                <HugeiconsIcon icon={File02Icon} size={14} />
                {data.planDocument}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-md bg-cyan-100 px-3 py-2 text-sm font-semibold text-cyan-700">
              Time Machine
            </button>
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">
              Exit Canvas
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
          <aside className="border-b border-slate-200 bg-[#f8f9fc] p-4 lg:border-b-0 lg:border-r">
            <div className="lg:sticky lg:top-4">
              <p className="mb-2 text-sm font-semibold text-slate-500">{data.payeesLabel}</p>
              <button className="mb-4 inline-flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-700">
                <HugeiconsIcon icon={UserGroupIcon} size={18} />
                {data.payeesAction}
              </button>

              <p className="mb-2 text-sm font-semibold text-slate-500">{data.componentsLabel}</p>

              <div className="hidden space-y-2 lg:block">
                {data.components.map((item) => (
                  <button
                    key={item.id}
                    className={`inline-flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-medium ${
                      item.active
                        ? "border-blue-400 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                    aria-current={item.active ? "page" : undefined}
                  >
                    <HugeiconsIcon icon={componentIcon(item.label)} size={18} />
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                {data.components.map((item) => (
                  <button
                    key={`chip-${item.id}`}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium ${
                      item.active
                        ? "border-blue-400 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                    aria-current={item.active ? "page" : undefined}
                  >
                    <HugeiconsIcon icon={componentIcon(item.label)} size={18} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="p-4 sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex w-fit rounded-lg bg-slate-100 p-1 text-sm">
                {data.tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`rounded-md px-3 py-1 font-medium ${
                      tab === data.activeTab
                        ? "bg-white text-blue-700 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
                {data.topActions.map((action, idx) => {
                  const icons = [Settings01Icon, NoteIcon, MagicWand01Icon, BookOpen01Icon];
                  return (
                    <button
                      key={action}
                      className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                    >
                      <HugeiconsIcon icon={icons[idx] ?? Settings01Icon} size={16} />
                      {action}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="mb-5 inline-flex items-center gap-2 text-sm text-slate-700">
              <input className="h-4 w-4" type="checkbox" checked={data.calculatePayout} readOnly />
              Calculate payout for every row
            </label>

            {data.rules.map((rule) => (
              <RuleRow key={rule.id} rule={rule} />
            ))}

            <div className="mt-6 flex justify-end">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                Save
              </button>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
