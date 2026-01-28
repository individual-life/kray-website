import Image from "next/image";
import React, { useEffect } from "react";
import { CloseIcon } from "@/public/icons/CloseIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  description?: string;
  cancelText?: string;
  mainText?: string;
}

const ModalDelete = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  children,
  className,
  cancelText = "Cancel",
  mainText = "Save",
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div
        className={`bg-white w-[425px] p-4  ${className} rounded-2xl animate-in fade-in zoom-in duration-200`}
      >
        <div className="flex items-center justify-between ">
          <h3 className="text-[16px] font-medium">{title}</h3>
          <button onClick={onClose} className="cursor-pointer">
            <CloseIcon size={16} />
          </button>
        </div>
        <p className="text-[13px] font-normal text-(--color-grey) mt-[2px]">
          {description}
        </p>
        <div className="">{children}</div>
        <div className="mt-[30px] flex items-center justify-end gap-[10px]">
          <div
            onClick={onClose}
            className="px-[25px] py-[5px] border border-[rgba(0,0,0,0.1)] rounded-[10px] cursor-pointer"
          >
            <span className="text-[13px] font-normal">{cancelText}</span>
          </div>
          <div
            onClick={onConfirm}
            className="px-[25px] py-[5px] rounded-[10px]  cursor-pointer bg-black"
          >
            <span className="text-white text-[13px] font-normal">
              {mainText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
