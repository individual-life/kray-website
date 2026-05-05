import { Task } from "@/type/kray-todo/Task";
import { TASK_STATUS } from "@/lib/constant/kray-todo";

const STORAGE_KEY = "kray_todo_tasks";

export const TaskService = {
  getTasks: (): Task[] => {
    if (typeof window === "undefined") return []; 
    const tasksJson = localStorage.getItem(STORAGE_KEY);
    if (!tasksJson) return [];
    
    try {
      return JSON.parse(tasksJson);
    } catch (error) {
      console.error("Failed to parse tasks from localStorage:", error);
      return [];
    }
  },
  saveTasks: (tasks: Task[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    window.dispatchEvent(new Event("kray_todo_tasks_updated"));
  },

  createTask: (title: string, description: string): Task => {
    const tasks = TaskService.getTasks();
    
    const maxNumber = tasks.length > 0 
      ? Math.max(...tasks.map(t => t.number)) 
      : 0;

    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      number: maxNumber + 1,
      title,
      description,
      status: TASK_STATUS[0], 
    };

    tasks.push(newTask);
    TaskService.saveTasks(tasks);
    
    return newTask;
  },

  updateTask: (updatedTask: Task): Task[] => {
    const tasks = TaskService.getTasks();
    const taskIndex = tasks.findIndex(t => t.id === updatedTask.id);
    
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      TaskService.saveTasks(tasks);
    }
    return tasks;
  },

  deleteTask: (taskId: string): Task[] => {
    const tasks = TaskService.getTasks();
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    TaskService.saveTasks(filteredTasks);
    return filteredTasks;
  },

  updateTaskStatus: (taskId: string, statusName: string): Task[] => {
    const tasks = TaskService.getTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    const newStatus = TASK_STATUS.find(s => s.name === statusName);
    
    if (taskIndex !== -1 && newStatus) {
      const updatedTask = tasks[taskIndex];
      updatedTask.status = newStatus;
      
      tasks.splice(taskIndex, 1);
      tasks.push(updatedTask);
      
      TaskService.saveTasks(tasks);
    }
    return tasks;
  },

 
  setTaskInProgress: (taskId: string): void => {
    let tasks = TaskService.getTasks();
    
    const onHoldStatus = TASK_STATUS.find(s => s.name === "On Hold")!;
    const inProgressStatus = TASK_STATUS.find(s => s.name === "In Progress")!;
    
    let changed = false;
    
    const oldInProgressTasks = tasks.filter(t => t.status.name === "In Progress" && t.id !== taskId);
    if (oldInProgressTasks.length > 0) {
      tasks = tasks.filter(t => t.status.name !== "In Progress" || t.id === taskId);
      oldInProgressTasks.forEach(t => {
        t.status = onHoldStatus;
        tasks.push(t);
      });
      changed = true;
    }
    
    const targetIndex = tasks.findIndex(t => t.id === taskId);
    if (targetIndex !== -1 && tasks[targetIndex].status.name !== "In Progress") {
      const targetTask = tasks.splice(targetIndex, 1)[0];
      targetTask.status = inProgressStatus;
      tasks.push(targetTask);
      changed = true;
    }
    
    if (changed) {
      TaskService.saveTasks(tasks);
    }
  },

  reorderTasks: (sourceId: string, destId: string): void => {
    const tasks = TaskService.getTasks();
    const sourceIndex = tasks.findIndex(t => t.id === sourceId);
    const destIndex = tasks.findIndex(t => t.id === destId);
    
    if (sourceIndex !== -1 && destIndex !== -1) {
      const [movedTask] = tasks.splice(sourceIndex, 1);
      tasks.splice(destIndex, 0, movedTask);
      TaskService.saveTasks(tasks);
    }
  }
};
