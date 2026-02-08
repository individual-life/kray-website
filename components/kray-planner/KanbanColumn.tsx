import React, { useState } from "react";
import { Status, Task } from "@/type/kray-planner/Kanban";
import { DetailDotIcon } from "@/public/icons/DetailDotIcon";
import { TrashIcon } from "@/public/icons/TrashIcon";
import { AddIcon } from "@/public/icons/AddIcon";
import Modal from "../common/Modal";
import TaskCard from "./TaskCard";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Pillo Website and App",
    description: "New Design",
    priority: "Low",
    progress: { current: 0, total: 5 },
    dueDate: "March 30, 2025",
    members: [],
    comments: 7,
    attachments: 3,
    status: "Not Started",
  },
  {
    id: "2",
    title: "Orbino Farmacy Website",
    description: "New Homepage",
    priority: "High",
    progress: { current: 1, total: 5 },
    dueDate: "March 29, 2025",
    members: [],
    comments: 7,
    attachments: 3,
    status: "In Progress",
  },
  {
    id: "3",
    title: "Ebay Website Development",
    description: "New E-commerce",
    priority: "Low",
    progress: { current: 5, total: 5 },
    dueDate: "March 21, 2025",
    members: [],
    comments: 7,
    attachments: 3,
    status: "Under Review",
  },
  {
    id: "4",
    title: "Update Design System",
    description: "New Design",
    priority: "Medium",
    progress: { current: 5, total: 5 },
    dueDate: "March 16, 2025",
    members: [],
    comments: 7,
    attachments: 3,
    status: "Completed",
  },
  {
    id: "5",
    title: "Lambo Consultancy Webiste",
    description: "New Homepage",
    priority: "Medium",
    progress: { current: 0, total: 5 },
    dueDate: "March 21, 25",
    members: [],
    comments: 7,
    attachments: 3,
    status: "Not Started",
  },
  {
    id: "6",
    title: "Tarbo App and Website",
    description: "New Project",
    priority: "Low",
    progress: { current: 0, total: 5 },
    dueDate: "March 21, 25",
    members: [],
    comments: 7,
    attachments: 3,
    status: "In Progress",
  },
  {
    id: "7",
    title: "Fillio Webapp Design",
    description: "New webapp",
    priority: "Medium",
    progress: { current: 0, total: 5 },
    dueDate: "March 21, 25",
    members: [],
    comments: 7,
    attachments: 3,
    status: "Under Review",
  },
  {
    id: "8",
    title: "Ai Travel App Design",
    description: "App Design",
    priority: "High",
    progress: { current: 0, total: 5 },
    dueDate: "March 21, 25",
    members: [],
    comments: 7,
    attachments: 3,
    status: "Completed",
  },
];

const KanbanColumn = () => {
  const [statusList, setStatusList] = React.useState<Status[]>([
    {
      name: "Not Started",
      bgColor: "#f6f6f6",
      color: "#000000",
    },
    {
      name: "In Progress",
      bgColor: "#fbe5e1",
      color: "#e95026",
    },
    {
      name: "Under Review",
      bgColor: "#eef5ff",
      color: "#298bf0",
    },
    {
      name: "Completed",
      bgColor: "#edfaee",
      color: "#0fb539",
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeDropdown, setActiveDropdown] = React.useState<number | null>(
    null,
  );
  const [titleModal, setTitleModal] = React.useState("Add New Column");
  const [showModal, setShowModal] = React.useState(false);

  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnBgColor, setNewColumnBgColor] = useState("#f6f6f6");
  const [newColumnColor, setNewColumnColor] = useState("#000000");

  const [insertionTarget, setInsertionTarget] = useState<{
    index: number;
    position: "left" | "right";
  } | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState<number | null>(null);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, statusName: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const task = tasks.find((t) => t.id === taskId);

    if (task && task.status !== statusName) {
      const updatedTasks = tasks.map((t) =>
        t.id === taskId ? { ...t, status: statusName } : t,
      );
      setTasks(updatedTasks);
    }
  };

  const handleAddNewColumn = (position: "left" | "right", index: number) => {
    if (position === "left") {
      setTitleModal("Add Left Column");
    } else {
      setTitleModal("Add Right Column");
    }
    setInsertionTarget({ index, position });
    setNewColumnName("");
    setNewColumnBgColor("#f6f6f6");
    setNewColumnColor("#000000");
    setActiveDropdown(null);
    setShowModal(true);
  };

  const handleSaveColumn = () => {
    if (!newColumnName.trim()) return;

    const newColumn: Status = {
      name: newColumnName,
      bgColor: newColumnBgColor,
      color: newColumnColor,
    };

    if (insertionTarget) {
      const newList = [...statusList];
      const insertIndex =
        insertionTarget.position === "left"
          ? insertionTarget.index
          : insertionTarget.index + 1;

      newList.splice(insertIndex, 0, newColumn);
      setStatusList(newList);
    } else {
      setStatusList([...statusList, newColumn]);
    }

    setShowModal(false);
    setInsertionTarget(null);
  };

  const initDeleteColumn = (index: number) => {
    setColumnToDelete(index);
    setShowDeleteModal(true);
    setActiveDropdown(null);
  };

  const confirmDeleteColumn = () => {
    if (columnToDelete === null) return;
    const newList = [...statusList];
    newList.splice(columnToDelete, 1);
    setStatusList(newList);
    setShowDeleteModal(false);
    setColumnToDelete(null);
  };

  return (
    <div className="flex gap-[20px] pb-4 h-[calc(100vh-140px)]">
      {statusList.map((status, index) => {
        const columnTasks = tasks.filter((task) => task.status === status.name);
        return (
          <div
            key={index}
            className="flex-1 min-w-[300px] flex flex-col gap-[20px]"
          >
            <div
              className="bg-white sticky top-0 z-10 flex justify-between items-center rounded-[10px] px-[15px] py-[8px]"
              style={{
                boxShadow: "0 0 1px 1px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="flex items-center gap-[10px] rounded-full w-fit pl-[10px] pr-[5px] py-[5px]"
                style={{
                  backgroundColor: status.bgColor,
                }}
              >
                <span
                  className="text-[13px] font-normal"
                  style={{
                    color: status.color,
                  }}
                >
                  {status.name}
                </span>
                <div className="rounded-full size-[20px] bg-[rgba(255,255,255,0.5)] flex justify-center items-center">
                  <span
                    className="text-[13px] font-normal"
                    style={{
                      color: status.color,
                    }}
                  >
                    {columnTasks.length}
                  </span>
                </div>
              </div>
              <div>
                <DetailDotIcon
                  size={18}
                  className="cursor-pointer"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === index ? null : index)
                  }
                />
              </div>
              {activeDropdown === index && (
                <div
                  className="absolute z-10 flex flex-col gap-[5px] bg-white top-full mt-[5px] right-0 px-[5px] py-[10px] rounded-[5px]"
                  style={{
                    boxShadow: "0 0 1px 1px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    className="flex justify-start items-center gap-[10px] cursor-pointer px-[10px] py-[5px] hover:bg-[rgba(0,0,0,0.05)] rounded-[5px]"
                    onClick={() => handleAddNewColumn("left", index)}
                  >
                    <AddIcon size={18} className="cursor-pointer" />
                    <span className="text-[13px] font-normal">
                      Add left column
                    </span>
                  </div>
                  <div
                    className="flex justify-start items-center gap-[10px] cursor-pointer px-[10px] py-[5px] hover:bg-[rgba(0,0,0,0.05)] rounded-[5px]"
                    onClick={() => handleAddNewColumn("right", index)}
                  >
                    <AddIcon size={18} className="cursor-pointer" />
                    <span className="text-[13px] font-normal">
                      Add right column
                    </span>
                  </div>
                  <div
                    className="flex justify-start items-center gap-[10px] cursor-pointer px-[10px] py-[5px] hover:bg-[rgba(0,0,0,0.05)] rounded-[5px]"
                    onClick={() => initDeleteColumn(index)}
                  >
                    <TrashIcon
                      size={18}
                      className="cursor-pointer text-[#DF2225]"
                    />
                    <span className="text-[13px] font-normal text-[#DF2225]">
                      Delete column
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div
              className=" flex flex-col gap-[15px] h-[calc(100vh-160px)] no-scrollbar overflow-auto"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, status.name)}
            >
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
              ))}
            </div>
          </div>
        );
      })}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleSaveColumn}
        title={titleModal}
        description="Make changes to your column here. Click save when you're done."
        mainText="Add"
      >
        <div className="mt-4 flex flex-col gap-[15px]">
          <div>
            <label htmlFor="statusName" className={` text-[14px] font-normal`}>
              Name <span className="text-(--color-orange)">*</span>
            </label>
            <div className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-[10px] px-[10px] mt-[5px]">
              <input
                type="text"
                id="statusName"
                placeholder="Planning"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                className="w-full h-full outline-none border-none text-[13px]"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="statusBgColor"
              className={` text-[14px] font-normal`}
            >
              Background Color <span className="text-(--color-orange)">*</span>
            </label>
            <div className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-[10px] px-[10px] mt-[5px] flex items-center gap-2">
              <div className="relative size-[24px] rounded-full border border-gray-200 overflow-hidden shrink-0">
                <input
                  type="color"
                  value={newColumnBgColor}
                  onChange={(e) => setNewColumnBgColor(e.target.value)}
                  className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                />
              </div>
              <input
                type="text"
                id="statusBgColor"
                placeholder="#f6f6f6"
                value={newColumnBgColor}
                onChange={(e) => setNewColumnBgColor(e.target.value)}
                className="w-full h-full outline-none border-none text-[13px]"
              />
            </div>
          </div>
          <div>
            <label htmlFor="statusColor" className={` text-[14px] font-normal`}>
              Text Color <span className="text-(--color-orange)">*</span>
            </label>
            <div className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-[10px] px-[10px] mt-[5px] flex items-center gap-2">
              <div className="relative size-[24px] rounded-full border border-gray-200 overflow-hidden shrink-0">
                <input
                  type="color"
                  value={newColumnColor}
                  onChange={(e) => setNewColumnColor(e.target.value)}
                  className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                />
              </div>
              <input
                type="text"
                id="statusColor"
                placeholder="#000000"
                value={newColumnColor}
                onChange={(e) => setNewColumnColor(e.target.value)}
                className="w-full h-full outline-none border-none text-[13px]"
              />
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteColumn}
        title="Delete Column"
        description="Are you sure you want to delete this column? This action cannot be undone."
        mainText="Delete"
        className="w-[400px]"
        cancelText="Cancel"
      >
        <div className="mt-4">
          <span className="text-[14px]">
            Deleting:{" "}
            <span className="font-semibold">
              {columnToDelete !== null ? statusList[columnToDelete]?.name : ""}
            </span>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default KanbanColumn;
