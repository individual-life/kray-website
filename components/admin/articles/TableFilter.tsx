import { SearchIcon } from "@/public/icons/SearchIcon";
import React from "react";

const TableFilter = () => {
  return (
    <div className=" bg-white px-5 py-2.5">
      <div className="flex items-center justify-end gap-x-2">
        <div className="relative flex items-center bg-white border border-[rgba(0,0,0,0.1)] h-[34px] w-[260px] rounded-lg px-2.5">
          <SearchIcon size={14} className="text-[#8E8D8A] shrink-0" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full bg-transparent border-none outline-none pl-2 pr-2 text-[13px] placeholder-[#8E8D8A] text-[#1C1C1C]"
          />
        </div>
        <div>
          <button className="flex items-center gap-x-2 bg-white border border-[rgba(0,0,0,0.1)] h-[34px] px-3.5 rounded-lg text-[13px] text-[#5C5B57] font-medium cursor-pointer">
            <span>Filters</span>
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default TableFilter;
