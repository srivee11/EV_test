import { Header } from "@/components/dashboard/Header";
import { PayoutCard } from "@/components/dashboard/PayoutCard";
import { PayoutTracker } from "@/components/dashboard/PayoutTracker";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { getDashboardData } from "@/lib/dashboardMapper";

export default function Home() {
  const data = getDashboardData();

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-2 pb-20 sm:p-4 sm:pb-24 md:p-6 md:pb-6">
      <main className="mx-auto flex min-h-[92vh] w-full max-w-[1520px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:rounded-2xl">
        <Sidebar companyInitials={data.companyInitials} items={data.sidebarItems} />

        <section className="flex-1 p-4 sm:p-6 md:p-8">
          <Header breadcrumb={data.breadcrumb} greeting={data.greeting} />
          <div className="grid grid-cols-1 gap-4 lg:gap-6 xl:grid-cols-[360px_1fr]">
            <PayoutCard summary={data.payoutSummary} />
            <PayoutTracker tracker={data.payoutTracker} />
          </div>
        </section>
      </main>
    </div>
  );
}
