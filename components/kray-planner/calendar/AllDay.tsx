import React from "react";

const AllDay = () => {
  return (
    <div className="flex border-t border-[#e5e5e5]">
      <div className="flex justify-center items-center p-[15px] w-[120px]">
        <p className="text-[14px] font-normal text-[rgba(0,0,0,1)]">All day</p>
      </div>
      <div className="grid grid-cols-7 w-full">
        <div className="border-l border-[#e5e5e5]"></div>
        <div className="border-l border-[#e5e5e5]"></div>
        <div className="border-l border-[#e5e5e5]"></div>
        <div className="border-l border-[#e5e5e5]"></div>
        <div className="border-l border-[#e5e5e5]"></div>
        <div className="border-l border-[#e5e5e5]"></div>
        <div className="border-l border-[#e5e5e5]"></div>
      </div>
    </div>
  );
};

export default AllDay;
