import { Logo } from "@/public/icons/Logo";
import { PlusIcon } from "@/public/icons/PlusIcon";
import Image from "next/image";
import React from "react";

const ContentSection = () => {
  const cellTemplates: Record<string, React.ReactNode> = {
    "3-2": (
      <div className="bg-(--color-orange) rounded-[10px] flex justify-center items-center">
        <div className="w-1/2 h-1/2  rounded-full overflow-hidden">
          <Logo className="w-full h-full object-contain" />
        </div>
      </div>
    ),
    "2-3": (
      <div className="bg-(--color-orange) flex flex-col justify-between rounded-[10px] p-4">
        <div></div>
        <h4 className="text-white text-[15px]">Premium web development.</h4>
      </div>
    ),
    "4-2": (
      <div className="bg-[#ffd966] rounded-[10px] p-4 flex flex-col justify-between cursor-pointer">
        <div>
          <PlusIcon className="text-[rgba(0,0,0,0.7)]" size={20} />
        </div>
        <h4 className="text-[rgba(0,0,0,0.7)] text-[15px]">
          Streamline your project workflows efficiently.
        </h4>
      </div>
    ),
    "3-3": (
      <div className="bg-[#ffd966] rounded-[10px] p-4 flex flex-col justify-between cursor-pointer">
        <div>
          <PlusIcon className="text-[rgba(0,0,0,0.7)]" size={20} />
        </div>
        <h4 className="text-[rgba(0,0,0,0.7)] text-[15px]">
          Track everyday tasks seamlessly.
        </h4>
      </div>
    ),
    "3-4": (
      <div className="bg-[#efefef] rounded-[10px] p-4 flex flex-col justify-between cursor-pointer">
        <div>
          <PlusIcon className="text-[rgba(0,0,0,0.7)]" size={20} />
        </div>
        <h4 className="text-[rgba(0,0,0,0.7)] text-[15px]">
          Coding stories and tech articles.
        </h4>
      </div>
    ),
  };

  return (
    <div className="h-full w-full grid grid-rows-5 gap-y-2 p-5">
      {Array.from({ length: 5 }).map((_, rIndex) => {
        const row = rIndex + 1;
        return (
          <div key={row} className="grid grid-cols-5 gap-x-2">
            {Array.from({ length: 5 }).map((_, cIndex) => {
              const col = cIndex + 1;
              const cellId = `${row}-${col}`;
              return (
                <React.Fragment key={cellId}>
                  {cellTemplates[cellId] || (
                    <div className="bg-[rgba(0,0,0,0.01)] h-full w-full rounded-[10px] overflow-hidden" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ContentSection;
