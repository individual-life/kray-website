"use client";
import React, { useState, useEffect, useRef } from "react";
import TableManage from "@/components/admin/articles/TableManage";
import Modal from "@/components/common/Modal";
import AddModal from "@/components/admin/articles/AddModal";

const ArticlesPage = () => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      <div className="w-full h-[calc(100vh-20px)] bg-white mt-5 rounded-tl-lg border-[rgba(0,0,0,0.1)] flex flex-col border px-4 pt-4">
        <p className="text-[15px] text-[rgba(0,0,0,0.5)]">Articles</p>

        <div className="flex justify-between items-center">
          <h2 className="text-[28px] mt-2 ">Articles</h2>
          <div className="">
            <div className="flex items-center gap-x-2 mt-4">
              <div className="relative">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center justify-center bg-black  text-white h-[34px] px-4 rounded-lg text-[13px] cursor-pointer"
                >
                  Add new
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-[14px] font-normal text-(--color-grey) ">
          Stay on top of your tasks, monitor progress, and manage your projects
          with ease.
        </p>
        <div className="w-full mt-10 flex-1 pb-5">
          <TableManage />
        </div>
      </div>
      <AddModal isShowModal={isShowModal} setShowModal={setShowModal} />
    </>
  );
};

export default ArticlesPage;
