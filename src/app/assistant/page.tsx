import { AssistantPage } from "@/components/assistant/AssistantPage";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { getAssistantData, getDashboardData } from "@/lib/dashboardMapper";

export default function AssistantRoutePage() {
  const dashboard = getDashboardData();
  const assistant = getAssistantData();

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-2 pb-20 sm:p-4 sm:pb-24 md:p-6 md:pb-6">
      <main className="mx-auto flex min-h-[92vh] w-full max-w-[1520px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:rounded-2xl">
        <Sidebar companyInitials={dashboard.companyInitials} items={dashboard.sidebarItems} activeItemId="chat" />
        <AssistantPage data={assistant} />
      </main>
    </div>
  );
}
