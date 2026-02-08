import React from "react";
import { Task } from "@/type/kray-planner/Kanban";
import { CalendarIcon } from "@/public/icons/CalendarIcon";
import { MessageIcon } from "@/public/icons/MessageIcon";
import { FileIcon } from "@/public/icons/FileIcon";
import { DetailDotIcon } from "@/public/icons/DetailDotIcon";
import { CheckListIcon } from "@/public/icons/CheckListIcon";
import { PapperClipIcon } from "@/public/icons/PapperClipIcon";

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
}

const TaskCard = ({ task, onDragStart }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return { bg: "bg-[#edfaee]", text: "text-[#0fb539]" };
      case "Medium":
        return { bg: "bg-[#fbe5e1]", text: "text-[#e95026]" };
      case "High":
        return { bg: "bg-[#fbe5e1]", text: "text-[#e95026]" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-600" };
    }
  };

  const priorityColors = getPriorityColor(task.priority);

  return (
    <div
      className="bg-white rounded-[15px] p-[15px] cursor-pointer hover:shadow-md transition-shadow duration-200"
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      style={{
        boxShadow: "0 0 1px 1px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex justify-between items-start mb-[10px]">
        <span
          className={`${priorityColors.bg} ${priorityColors.text} text-[12px] px-[20px] py-[4px] rounded-full font-medium flex items-center gap-1`}
        >
          {task.priority}
        </span>
        <DetailDotIcon size={18} className="text-gray-400" />
      </div>
      <h3 className="text-[15px] font-medium text-black mb-[5px]">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-[13px] text-gray-500 mb-[15px] line-clamp-2">
          {task.description}
        </p>
      )}
      <div className="mb-[15px]">
        <div className="flex justify-between items-center mb-[5px]">
          <div className="flex items-center gap-2">
            <CheckListIcon size={16} />
            <span className="text-[13px] text-gray-500">Progress</span>
          </div>
          <span className="text-[13px]">
            {task.progress.current}/{task.progress.total}
          </span>
        </div>

        <div className="w-full h-[6px] bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(task.progress.current / task.progress.total) * 100}%`,
              backgroundColor:
                task.progress.current === task.progress.total
                  ? "#0dbf4e"
                  : task.priority === "Medium"
                    ? "#e95026"
                    : "#298bf0",
            }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col gap-[15px]">
        <div className="flex items-center gap-[5px] text-black bg-[#f9f9f9] w-fit px-3 py-1 rounded-full border border-gray-100">
          <CalendarIcon size={14} />
          <span className="text-[12px]">
            Due to:{" "}
            <span className="font-medium text-black text-[13px]">
              {" "}
              {task.dueDate}
            </span>
          </span>
        </div>

        <div className="flex justify-between items-center border-t border-gray-100 pt-[15px]">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="w-[28px] h-[28px] rounded-full bg-gray-200 border-2 border-white overflow-hidden"
              >
                <img
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="w-[28px] h-[28px] rounded-full bg-white border-dashed border border-gray-300 flex items-center justify-center text-[10px] text-gray-500 z-10">
              +2
            </div>
          </div>

          <div className="flex items-center gap-[10px] ">
            <div className="flex items-center gap-[3px]">
              <PapperClipIcon size={16} />
              <span className="text-[13px]">3</span>
            </div>
            <div className="flex items-center gap-[3px]">
              <MessageIcon size={16} />
              <span className="text-[13px]">7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
