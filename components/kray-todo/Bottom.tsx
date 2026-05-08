"use client";

import React, { useState, useEffect } from "react";
import { TaskService } from "@/lib/services/kray-todo/task";
import { TaskGroup } from "@/type/kray-todo/Task";
import Modal from "@/components/common/Modal";
import { TrashIcon } from "@/public/icons/TrashIcon";

const Bottom = () => {
  const [groups, setGroups] = useState<TaskGroup[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [renameValue, setRenameValue] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    groupId: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setGroups(TaskService.getGroups());
      setActiveGroupId(TaskService.getActiveGroupId());
    };

    fetchData();
    window.addEventListener("kray_todo_groups_updated", fetchData);
    window.addEventListener("kray_todo_active_group_updated", fetchData);

    const handleClickOutside = () => setContextMenu(null);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("kray_todo_groups_updated", fetchData);
      window.removeEventListener("kray_todo_active_group_updated", fetchData);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      TaskService.createGroup(newGroupName.trim());
      setNewGroupName("");
      setIsModalOpen(false);
    }
  };

  const handleRenameGroup = () => {
    if (renameValue.trim() && contextMenu?.groupId) {
      TaskService.updateGroup(contextMenu.groupId, renameValue.trim());
      setRenameValue("");
      setIsRenameModalOpen(false);
      setContextMenu(null);
    }
  };

  const handleDeleteGroup = () => {
    if (deleteTargetId) {
      TaskService.deleteGroup(deleteTargetId);
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
      setContextMenu(null);
    }
  };

  const onContextMenu = (e: React.MouseEvent, groupId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, groupId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, groupId: string | null) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      TaskService.assignTaskToGroup(taskId, groupId);
    }
  };

  return (
    <div className="h-[40px] flex justify-start gap-[5px]">
      <div className="flex gap-[5px]">
        <div
          onClick={() => TaskService.setActiveGroupId(null)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, null)}
          className={`h-full px-[25px] flex items-center cursor-pointer border border-[rgba(0,0,0,0.1)] rounded-full w-fit transition-all ${
            activeGroupId === null
              ? "bg-black border-black"
              : "bg-transparent border-dashed hover:border-[rgba(0,0,0,1)]"
          }`}
        >
          <span
            className={`text-[14px] font-normal ${activeGroupId === null ? "text-white" : "text-[rgba(0,0,0,0.5)]"}`}
          >
            General Task
          </span>
        </div>

        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => TaskService.setActiveGroupId(group.id)}
            onContextMenu={(e) => onContextMenu(e, group.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, group.id)}
            className={`h-full px-[25px] flex items-center border cursor-pointer border-[rgba(0,0,0,0.1)] rounded-full w-fit transition-all ${
              activeGroupId === group.id
                ? "bg-black border-solid border-black"
                : "border-dashed hover:border-[rgba(0,0,0,1)]"
            }`}
          >
            <span
              className={`text-[14px] font-normal ${activeGroupId === group.id ? "text-white" : "text-[rgba(0,0,0,0.5)]"}`}
            >
              {group.name}
            </span>
          </div>
        ))}
      </div>

      {contextMenu && (
        <div
          className="fixed z-999 bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] shadow-lg py-[5px] min-w-[120px]"
          style={{ top: contextMenu.y - 120, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={() => {
              const g = groups.find((g) => g.id === contextMenu.groupId);
              setRenameValue(g?.name || "");
              setIsRenameModalOpen(true);
            }}
            className="px-[15px] py-[8px] text-[13px] hover:bg-gray-50 cursor-pointer flex items-center gap-[10px]"
          >
            <span>Edit Name</span>
          </div>
          <div
            onClick={() => {
              setDeleteTargetId(contextMenu.groupId);
              setIsDeleteModalOpen(true);
            }}
            className="px-[15px] py-[8px] text-[13px] text-red-500 hover:bg-red-50 cursor-pointer flex items-center gap-[10px]"
          >
            <span>Delete</span>
          </div>
          <div
            onClick={() => setContextMenu(null)}
            className="px-[15px] py-[8px] text-[13px] border-t border-[rgba(0,0,0,0.05)] text-[rgba(0,0,0,0.4)] hover:bg-gray-50 cursor-pointer"
          >
            <span>Hide</span>
          </div>
        </div>
      )}
      <div
        onClick={() => setIsModalOpen(true)}
        className="w-[40px] h-[40px] flex cursor-pointer items-center border border-[rgba(0,0,0,0.1)] border-dashed rounded-full hover:border-black transition-colors"
      >
        <span className="text-[18px] items-center flex justify-center w-full text-[rgba(0,0,0,0.5)] hover:text-black">
          +
        </span>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Group"
        description="Add a new group to organize your tasks."
        mainText="Create"
        onConfirm={handleCreateGroup}
      >
        <div className="mt-[20px] flex flex-col gap-[5px]">
          <label className=" text-[14px] font-normal">
            Name <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="w-full px-[15px] py-[10px] rounded-[8px] border border-[rgba(0,0,0,0.1)] outline-none text-[13px]"
            placeholder="Group name..."
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleCreateGroup()}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        title="Rename Group"
        description="Change the name of your task group."
        mainText="Save"
        onConfirm={handleRenameGroup}
      >
        <div className="mt-[20px]">
          <input
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            className="w-full px-[15px] py-[10px] rounded-[8px] border border-[rgba(0,0,0,0.1)] outline-none text-[13px]"
            placeholder="New name..."
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleRenameGroup()}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteTargetId(null);
        }}
        onConfirm={handleDeleteGroup}
        mainText="Delete"
        cancelText="Cancel"
        className="w-[420px]"
      >
        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-[60px] h-[60px] bg-red-50 rounded-full flex items-center justify-center mb-6">
            <TrashIcon className="size-8 text-red-500" />
          </div>
          <p className="text-[15px] font-medium text-gray-900 mb-2 leading-relaxed">
            Are you sure you want to delete this group?
          </p>
          <p className="text-[13px] text-gray-500 leading-relaxed px-4">
            All tasks in this group will also be deleted. This action cannot be
            undone.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Bottom;
