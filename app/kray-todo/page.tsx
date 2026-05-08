import WhiteBoard from "@/components/kray-todo/board-task/WhiteBoard";
import TaskSection from "@/components/kray-todo/init-task/TaskSection";
import TaskProcess from "@/components/kray-todo/process-task/TaskProcess";

const KrayTodoPage = () => {
  return (
    <div className="w-full gap-x-[20px]  h-[calc(100vh-90px)] overflow-y-scroll scroll-auto scroll-hidden no-scrollbar grid grid-cols-12">
      <TaskSection />
      <div className=" col-span-9 flex flex-col h-full">
        <TaskProcess />
        <WhiteBoard />
      </div>
    </div>
  );
};

export default KrayTodoPage;
