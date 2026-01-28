"use client";

import React, { useState } from "react";
import Modal from "../common/Modal";
import { Folder } from "@/type/kray-planner/Folder";
import { PlusIcon } from "@/public/icons/PlusIcon";
import { FileIcon } from "@/public/icons/FileIcon";
import { DetailDotIcon } from "@/public/icons/DetailDotIcon";

const StatsGrid = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState<Folder[]>([]);

  const handleAddNewFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder = {
      id: Date.now().toString(),
      name: newFolderName,
      fileCount: 0,
    };

    setFolders([...folders, newFolder]);
    setNewFolderName("");
    setShowModal(false);
  };

  return (
    <div className="mt-[30px]">
      <div className="grid grid-cols-4 gap-[20px]">
        <div
          onClick={() => setShowModal(true)}
          className="flex items-center justify-between bg-white rounded-[10px] px-[20px] py-[10px] cursor-pointer"
        >
          <div className="flex items-center gap-[15px]">
            <div className="size-[40px] rounded-full flex justify-center items-center bg-[rgba(0,0,0,0.05)]">
              <PlusIcon size={20} />
            </div>
            <div>
              <p className="text-[14px] font-normal">Add New Folder</p>
            </div>
          </div>
        </div>

        {folders.map((folder) => (
          <div
            key={folder.id}
            className="flex items-center justify-between bg-white rounded-[10px] px-[20px] py-[10px]"
          >
            <div className="flex items-center gap-[15px]">
              <div className="size-[40px] rounded-full flex justify-center items-center bg-[rgba(0,0,0,0.05)]">
                <FileIcon size={20} />
              </div>
              <div>
                <span className="text-[14px] font-medium">
                  {folder.fileCount} Files
                </span>
                <p className="text-[13px] font-normal text-(--color-grey)">
                  {folder.name}
                </p>
              </div>
            </div>
            <DetailDotIcon size={20} className="cursor-pointer" />
          </div>
        ))}
      </div>

      <Modal
        isOpen={isShowModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleAddNewFolder}
        mainText="Add"
        title="Add New Folder"
        description="Make changes to your folder here. Click save when you're done."
      >
        <div className="mt-4">
          <label htmlFor="folderName" className={` text-[14px] font-normal`}>
            Name <span className="text-(--color-orange)">*</span>
          </label>
          <div className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-[10px] px-[10px]">
            <input
              type="text"
              id="folderName"
              placeholder="My Folder"
              className="w-full h-full outline-none border-none text-[13px]"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddNewFolder();
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StatsGrid;
