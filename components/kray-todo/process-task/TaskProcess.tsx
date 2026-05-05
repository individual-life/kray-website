"use client";

import React, { useState, useEffect } from "react";
import { Task } from "@/type/kray-todo/Task";
import { TaskService } from "@/lib/services/kray-todo/task";
import Modal from "@/components/common/Modal";
import { DangerIcon } from "@/public/icons/DangerIcon";

const TaskProcess = () => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActiveTask = () => {
      const tasks = TaskService.getTasks();
      const inProgress = tasks.find((t) => t.status.name === "In Progress");
      setActiveTask(inProgress || null);
    };

    fetchActiveTask();
    window.addEventListener("kray_todo_tasks_updated", fetchActiveTask);

    return () => {
      window.removeEventListener("kray_todo_tasks_updated", fetchActiveTask);
    };
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      if (activeTask && activeTask.id !== taskId) {
        setError(
          "Please finish or cancel the current task before starting a new one.",
        );
        return;
      }
      TaskService.setTaskInProgress(taskId);
    }
  };

  const handleStatusChange = (status: string) => {
    if (activeTask) {
      TaskService.updateTaskStatus(activeTask.id, status);
    }
  };

  return (
    <>
      <Modal
        isOpen={!!error}
        onClose={() => setError("")}
        title=""
        mainText="Understood"
        onConfirm={() => setError("")}
      >
        <div className="flex flex-col items-center justify-center py-[20px] gap-[15px]">
          <div className="w-[50px] h-[50px] bg-red-100 rounded-full flex items-center justify-center">
            <DangerIcon color="red" />
          </div>
          <p className="text-[14px] text-center text-[rgba(0,0,0,0,0.5)] font-normal px-[20px]">
            {error}
          </p>
        </div>
      </Modal>
      <section className="flex justify-between w-full mb-[20px] relative">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`w-[350px] h-[170px] rounded-[10px] flex flex-col items-center justify-center p-[20px] transition-colors ${
            activeTask
              ? "border border-[rgba(0,0,0,0.1)]"
              : "border border-dashed border-[rgba(0,0,0,0.1)] bg-[#fafafa] hover:bg-[#f4f4f4]"
          }`}
        >
          {activeTask ? (
            <div className="w-full h-full flex flex-col items-start justify-start text-left cursor-pointer">
              <div className="flex justify-between items-center w-full mb-[10px]">
                <span className="text-[13px] font-normal text-[rgba(0,0,0,0.5)]">
                  #{activeTask.number}
                </span>
                <div
                  className={`${activeTask.status.bgColor} px-[10px] py-[2px] rounded-[10px] flex items-center`}
                >
                  <span className={`${activeTask.status.color} text-[12px]`}>
                    {activeTask.status.name}
                  </span>
                </div>
              </div>
              <h3 className="text-[15px] font-medium text-black mb-[5px] line-clamp-1 w-full">
                {activeTask.title}
              </h3>
              <p className="text-[13px] text-gray-500 line-clamp-3 w-full">
                {activeTask.description}
              </p>
            </div>
          ) : (
            <>
              <p className="text-[14px] font-medium text-[rgba(0,0,0,0.6)] pointer-events-none">
                Drop your task here
              </p>
              <p className="text-[12px] text-[rgba(0,0,0,0.4)] mt-[4px] pointer-events-none">
                Drag a task from the list to start
              </p>
            </>
          )}
        </div>
        <div className="flex-1 flex justify-end gap-x-[10px] items-end">
          <div
            onClick={() => handleStatusChange("Done")}
            className="rounded-[10px] flex items-center gap-[5px] px-[15px] py-[8px] bg-black cursor-pointer"
          >
            <span className="text-[13px] font-medium text-white">
              Mark as Done
            </span>
          </div>
          <div
            onClick={() => handleStatusChange("On Hold")}
            className="rounded-[10px] flex items-center gap-[5px] px-[15px] py-[8px] border border-[rgba(0,0,0,0.1)] cursor-pointer"
          >
            <span className="text-[13px] font-medium text-black">On Hold</span>
          </div>
          <div
            onClick={() => handleStatusChange("Cancelled")}
            className="rounded-[10px] flex items-center gap-[5px] px-[15px] py-[8px] border border-dashed border-[rgba(0,0,0,0.1)] cursor-pointer"
          >
            <span className="text-[13px] font-medium">Cancel Task</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default TaskProcess;
