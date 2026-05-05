"use client";

import React, { useState } from "react";
import Modal from "@/components/common/Modal";
import { TaskService } from "@/lib/services/kray-todo/task";

const CreateTaskModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");

  const handleClose = () => {
    setIsOpen(false);
    setTitle("");
    setDescription("");
    setTitleError("");
    setDescError("");
  };

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

    TaskService.createTask(title.trim(), description.trim());
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
