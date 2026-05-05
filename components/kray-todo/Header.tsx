import { NotificationIcon } from "@/public/icons/NotificationIcon";
import { SearchIcon } from "@/public/icons/SearchIcon";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between">
      <div className="flex w-fit items-center cursor-pointer gap-x-[5px] bg-white px-[5px] py-[5px] pr-[20px] rounded-full">
        <Image src="/images/logo.png" alt="Logo" width={30} height={30} />
        <span className="text-[14px] font-medium text-black">Kray Todo</span>
      </div>
      <div className="px-[5px] gap-x-[5px] bg-white rounded-full  h-[45px] flex justify-center items-center">
        <div className="flex items-center cursor-pointer size-[35px] justify-center bg-[rgba(0,0,0,0.05)] rounded-full">
          <SearchIcon size={18} />
        </div>
        <div className="flex items-center cursor-pointer size-[35px] justify-center bg-[rgba(0,0,0,0.05)] rounded-full">
          <NotificationIcon size={18} />
        </div>
        <div className="flex items-center cursor-pointer size-[35px] justify-center bg-(--color-orange) rounded-full">
          <p className="text-[14px] font-normal text-white">N</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
