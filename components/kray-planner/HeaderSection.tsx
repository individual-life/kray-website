import Image from "next/image";
import React from "react";

const HeaderSection = () => {
  return (
    <div>
      <h2 className="text-[28px] font-semibold">Good morning, Nhut</h2>
      <p className="text-[14px] font-normal text-(--color-grey)">
        Stay on top of your tasks, monitor progress, and manage your projects
        with ease.
      </p>
      <div className="bg-white rounded-[10px] py-[10px] px-[10px] mt-[20px] flex justify-between items-center">
        <div className="flex items-center gap-[10px]">
          <Image src="/images/logo.png" alt="" width={30} height={30} />
          <span className="text-[14px] font-normal">
            Noteflow AI is now available.{" "}
            <span className="text-(--color-grey)">
              Access your activity and timeline instantly with our brand-new
              dashboard.
            </span>
          </span>
        </div>
        <div className="bg-[rgba(0,0,0,0.05)] rounded-full px-[20px] py-[5px] cursor-pointer">
          <span className="text-[13px] font-normal">View Details</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
