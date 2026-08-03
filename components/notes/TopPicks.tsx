import React from "react";

const TopPicks = () => {
  return (
    <div className="mt-[60px]">
      <p className="text-center text-[15px] text-[rgba(0,0,0,0.9)]">
        Top Reads
      </p>
      <div className="flex mt-5 gap-x-[5px] bg-[rgba(0,0,0,0.05)] p-1.5 rounded-2xl">
        <div className="px-5 py-2.5 rounded-[10px] bg-black">
          <span className="text-[14px] text-white">All</span>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-[10px]">
          <span className="text-[14px] text-[rgba(0,0,0,0.8)]">
            Service Now
          </span>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-[10px]">
          <span className="text-[14px] text-[rgba(0,0,0,0.8)]">
            Google Cloud
          </span>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-[10px]">
          <span className="text-[14px] text-[rgba(0,0,0,0.8)]">
            Spring Boot
          </span>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-[10px]">
          <span className="text-[14px] text-[rgba(0,0,0,0.8)]">NextJS</span>
        </div>
      </div>
    </div>
  );
};

export default TopPicks;
