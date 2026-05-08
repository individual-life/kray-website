"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/common/Modal";
import { TaskService } from "@/lib/services/kray-todo/task";
import { TaskGroup } from "@/type/kray-todo/Task";

const CreateTaskModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState<TaskGroup[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setGroups(TaskService.getGroups());
      setGroupId(TaskService.getActiveGroupId() || "");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = () => setIsDropdownOpen(false);
    if (isDropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setTitle("");
    setDescription("");
    setGroupId("");
    setTitleError("");
    setDescError("");
    setIsDropdownOpen(false);
  };

  const selectedGroupName = groupId 
    ? groups.find(g => g.id === groupId)?.name || "General Task"
    : "General Task";

  const handleConfirm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Title is required.");
      isValid = false;
      return;
    } else {
      setTitleError("");
    }

    if (!description.trim()) {
      setDescError("Description is required.");
      isValid = false;
      return;
    } else {
      setDescError("");
    }

    TaskService.createTask(title.trim(), description.trim(), groupId);
    handleClose();
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="bg-black mt-[30px] w-fit rounded-[10px] flex items-center gap-[5px] px-[15px] py-[8px] cursor-pointer hover:bg-gray-800 transition-colors"
      >
        <span className="text-[13px] font-medium text-white">Create Task</span>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Create New Task"
        description="Add a new task to your board to start tracking it."
        mainText="Create"
        onConfirm={handleConfirm}
      >
        <div className="mt-[20px] flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[5px]">
            <label className=" text-[14px] font-normal">
              Title <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError("");
              }}
              placeholder="E.g. Update landing page"
              className={`w-full px-[15px] py-[10px] rounded-[8px] border outline-none text-[13px] transition-colors ${titleError ? "border-[#ef4444]" : "border-[rgba(0,0,0,0.1)] "}`}
            />
            {titleError && (
              <span className="text-[#ef4444] text-[12px]">{titleError}</span>
            )}
          </div>

          <div className="flex flex-col gap-[5px] relative">
            <label className=" text-[14px] font-normal">
              Group <span className="text-[rgba(0,0,0,0.3)] font-normal ml-[5px]">(Optional)</span>
            </label>
            
            {/* Custom Dropdown Trigger */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="w-full px-[15px] py-[10px] rounded-[8px] border border-[rgba(0,0,0,0.1)] flex justify-between items-center cursor-pointer bg-white transition-all hover:border-[rgba(0,0,0,0.3)]"
            >
              <span className="text-[13px] text-black">{selectedGroupName}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Custom Dropdown Options */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-[5px] bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] shadow-lg z-[100] overflow-hidden">
                <div 
                  onClick={() => {
                    setGroupId("");
                    setIsDropdownOpen(false);
                  }}
                  className={`px-[15px] py-[10px] text-[13px] cursor-pointer transition-colors ${!groupId ? "bg-black text-white" : "hover:bg-gray-50 text-black"}`}
                >
                  General Task
                </div>
                {groups.map((group) => (
                  <div
                    key={group.id}
                    onClick={() => {
                      setGroupId(group.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-[15px] py-[10px] text-[13px] cursor-pointer transition-colors ${groupId === group.id ? "bg-black text-white" : "hover:bg-gray-50 text-black"}`}
                  >
                    {group.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-[5px]">
            <label className=" text-[14px] font-normal">
              Description <span className="text-[#ef4444]">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (descError) setDescError("");
              }}
              placeholder="Add more details about this task..."
              className={`w-full px-[15px] py-[10px] rounded-[8px] border outline-none text-[13px] resize-none transition-colors ${descError ? "border-[#ef4444]" : "border-[rgba(0,0,0,0.1)]"}`}
            />
            {descError && (
              <span className="text-[#ef4444] text-[12px]">{descError}</span>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
