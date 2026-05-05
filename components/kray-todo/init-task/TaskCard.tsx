"use client";

import { Task } from "@/type/kray-todo/Task";
import { TaskService } from "@/lib/services/kray-todo/task";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const sourceTaskId = e.dataTransfer.getData("taskId");
    if (sourceTaskId && sourceTaskId !== task.id) {
      TaskService.reorderTasks(sourceTaskId, task.id);
    }
  };

  return (
    <div 
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task.id);
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="p-[16px] border rounded-[10px] border-[rgba(0,0,0,0.1)] cursor-pointer hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow"
    >
      <div className="flex justify-between items-center mb-[10px]">
        <span className="text-[13px] font-normal text-[rgba(0,0,0,0.5)]">
          #{task.number}
        </span>
        <div
          className={`${task.status.bgColor} px-[10px] py-[2px] rounded-[10px] flex items-center`}
        >
          <span className={`${task.status.color} text-[12px]`}>
            {task.status.name}
          </span>
        </div>
      </div>
      <h3 className="text-[15px] font-medium text-black mb-[5px]">
        {task.title}
      </h3>
      <p className="text-[13px] text-gray-500 ">{task.description}</p>
    </div>
  );
};

export default TaskCard;
