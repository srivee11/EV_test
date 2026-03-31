import { PlanBuilderPage } from "@/components/plan-builder/PlanBuilderPage";
import { getPlanBuilderData } from "@/lib/dashboardMapper";

export default function FolderPage() {
  const data = getPlanBuilderData();

  return <PlanBuilderPage data={data} />;
}
