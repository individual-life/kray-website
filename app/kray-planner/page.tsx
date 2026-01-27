import HeaderSection from "@/components/kray-planner/HeaderSection";
import KanbanBoard from "@/components/kray-planner/KanbanBoard";
import KanbanColumn from "@/components/kray-planner/KanbanColumn";
import StatsGrid from "@/components/kray-planner/StatsGrid";

const KPlanPage = () => {
  return (
    <div className="w-full h-[calc(100vh-120px)] overflow-y-scroll scroll-auto scroll-hidden no-scrollbar">
      <HeaderSection />
      <StatsGrid />
      <KanbanBoard />
    </div>
  );
};

export default KPlanPage;
