type QuotaProgressProps = {
  current: number;
  goal: number;
};

export function QuotaProgress({ current, goal }: QuotaProgressProps) {
  const ratio = Math.min(current / goal, 1);
  const markerOffset = Math.max(3, Math.min(ratio * 100, 97));

  return (
    <div className="relative">
      <div className="h-10 w-full overflow-hidden rounded-sm bg-slate-200 sm:h-14">
        <div className="h-full bg-[#4eff00]" style={{ width: `${ratio * 100}%` }} />
      </div>
      <div
        className="absolute top-[-8px] h-[58px] w-[2px] bg-slate-700 sm:top-[-10px] sm:h-[76px]"
        style={{ left: `${markerOffset}%` }}
      />
      <p className="absolute right-0 top-[-24px] text-xs font-semibold text-slate-700 sm:top-[-28px] sm:text-sm">
        {goal}%
      </p>
      <p className="mt-2 text-right text-xs text-amber-600 sm:text-sm">
        {current.toFixed(2)}%
      </p>
    </div>
  );
}
