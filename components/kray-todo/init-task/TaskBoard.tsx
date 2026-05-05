"use client";

import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/type/kray-todo/Task";
import { TaskService } from "@/lib/services/kray-todo/task";

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = () => setTasks(TaskService.getTasks());

    fetchTasks();
    window.addEventListener("kray_todo_tasks_updated", fetchTasks);

    return () => {
      window.removeEventListener("kray_todo_tasks_updated", fetchTasks);
    };
  }, []);

  return (
    <div className="mt-[30px] flex-1 flex flex-col h-full overflow-y-scroll no-scrollbar">
      <h4 className="text-[14px]  font-normal text-[rgba(0,0,0,0.5)] uppercase ">
        TASK LIST
      </h4>
      <div className="mt-[10px] w-full h-fit flex-1 flex  overflow-y-scroll no-scrollbar flex-col gap-[15px]">
        {tasks.length === 0
          ? ""
          : tasks
              .filter((task) => task.status.name !== "In Progress")
              .map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default TaskBoard;
