import TaskBoard from "./TaskBoard";
import CreateTaskModal from "./CreateTaskModal";

const TaskSection = () => {
  return (
    <section className="col-span-3 flex flex-col h-[calc(100vh-120px)] overflow-hidden">
      <h2 className="text-[28px] font-semibold">Todo List,</h2>
      <p className="text-[14px] font-normal text-(--color-grey)">
        Manage your daily tasks and stay organized with ease.
      </p>
      <CreateTaskModal />
      <TaskBoard />
    </section>
  );
};

export default TaskSection;
