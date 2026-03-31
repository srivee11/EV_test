import { SidebarItem } from "@/types/dashboard";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import {
  PieChart01Icon,
  File02Icon,
  WorkflowSquare03Icon,
  Orbit02Icon,
  Target02Icon,
  AiBrain02Icon,
  Wallet02Icon,
  InformationCircleIcon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";

type SidebarProps = {
  companyInitials: string;
  items: SidebarItem[];
  activeItemId?: string;
};

export function Sidebar({ companyInitials, items, activeItemId }: SidebarProps) {
  const iconMap = {
    home: PieChart01Icon,
    docs: File02Icon,
    pipeline: WorkflowSquare03Icon,
    bell: Orbit02Icon,
    target: Target02Icon,
    chat: AiBrain02Icon,
    briefcase: Wallet02Icon,
  } as const;
  const routeMap: Record<string, string> = {
    home: "/",
    target: "/folder",
    chat: "/assistant",
  };

  return (
    <>
      <aside className="hidden w-[68px] shrink-0 border-r border-slate-200 bg-[#eef1f7] px-2 py-4 md:flex md:flex-col">
        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-700 text-[9px] font-semibold text-white">
          {companyInitials.slice(0, 4)}
        </div>

        <nav className="flex flex-col items-center gap-3" aria-label="Primary">
          {items.map((item, index) => {
            const isActive = activeItemId ? item.id === activeItemId : index === 0;
            return (
            <Link
              key={item.id}
              href={routeMap[item.id] ?? "#"}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                isActive
                  ? "border-blue-400 bg-white text-blue-700 shadow-sm"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:bg-white"
              }`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <HugeiconsIcon icon={iconMap[item.id as keyof typeof iconMap]} size={18} />
            </Link>
          )})}
        </nav>

        <div className="mt-auto flex flex-col items-center gap-3 pb-1">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-white"
            aria-label="Info"
          >
            <HugeiconsIcon icon={InformationCircleIcon} size={18} />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600"
            aria-label="Profile"
          >
            <HugeiconsIcon icon={UserCircleIcon} size={16} />
          </button>
        </div>
      </aside>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 flex h-16 items-center gap-1 overflow-x-auto border-t border-slate-200 bg-white/95 px-2 backdrop-blur md:hidden"
        aria-label="Primary mobile"
      >
        {items.map((item, index) => {
          const isActive = activeItemId ? item.id === activeItemId : index === 0;
          return (
          <Link
            key={`mobile-${item.id}`}
            href={routeMap[item.id] ?? "#"}
            className={`flex h-10 min-w-10 items-center justify-center rounded-xl ${
              isActive ? "bg-blue-50 text-blue-600" : "text-slate-500"
            }`}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <HugeiconsIcon icon={iconMap[item.id as keyof typeof iconMap]} size={18} />
          </Link>
        )})}
        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500" aria-label="Info">
          <HugeiconsIcon icon={InformationCircleIcon} size={18} />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500" aria-label="Profile">
          <HugeiconsIcon icon={UserCircleIcon} size={18} />
        </button>
      </nav>
    </>
  );
}
