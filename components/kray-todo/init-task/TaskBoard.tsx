"use client";

import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/type/kray-todo/Task";
import { TaskService } from "@/lib/services/kray-todo/task";

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setTasks(TaskService.getTasks());
      setActiveGroupId(TaskService.getActiveGroupId());
    };

    fetchData();
    window.addEventListener("kray_todo_tasks_updated", fetchData);
    window.addEventListener("kray_todo_active_group_updated", fetchData);

    return () => {
      window.removeEventListener("kray_todo_tasks_updated", fetchData);
      window.removeEventListener("kray_todo_active_group_updated", fetchData);
    };
  }, []);

  return (
    <div className="mt-[30px] flex-1 flex flex-col h-full overflow-y-scroll no-scrollbar">
      <h4 className="text-[14px]  font-normal text-[rgba(0,0,0,0.5)] uppercase ">
        {activeGroupId
          ? TaskService.getGroups().find((g) => g.id === activeGroupId)?.name +
            " TASKS"
          : "GENERAL TASKS"}
      </h4>
      <div className="mt-[10px] w-full h-fit flex-1 flex  overflow-y-scroll no-scrollbar flex-col gap-[15px]">
        {tasks.length === 0
          ? ""
          : tasks
              .filter((task) => {
                const isNotInProgress = task.status.name !== "In Progress";
                const matchesGroup = activeGroupId
                  ? task.groupId === activeGroupId
                  : !task.groupId;
                return isNotInProgress && matchesGroup;
              })
              .map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default TaskBoard;
