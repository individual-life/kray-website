"use client";
import {
  krayPlannerSideLogoutData,
  krayPlannerSideNavData,
} from "@/lib/constant/kray-planner";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const isActiveLink = (href: string) => {
    if (href === "/kray-planner/" && pathname === "/kray-planner") return true;
    return pathname === href;
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div></div>
      <div className="py-[8px] bg-white rounded-full w-[45px] flex flex-col justify-center items-center gap-[10px]">
        {krayPlannerSideNavData.map((item, index) => {
          const isActive = isActiveLink(item.href);
          return (
            <Link
              key={index}
              href={item.href}
              className="flex justify-center items-center text-[14px] font-normal cursor-pointer duration-300 ease-in-out"
            >
              <div
                className={`size-[38px] rounded-full flex justify-center items-center ${isActive ? "bg-black text-white" : "hover:bg-gray-100 text-black"}`}
              >
                <item.icon size={20} />
              </div>
            </Link>
          );
        })}
      </div>
      <div className="py-[8px] bg-white rounded-full w-[45px] flex flex-col justify-center items-center gap-[15px]">
        {krayPlannerSideLogoutData.map((item, index) => {
          const isActive = isActiveLink(item.href);
          return (
            <Link
              key={index}
              href={item.href}
              className="flex justify-center items-center text-[14px] font-normal cursor-pointer duration-300 ease-in-out"
            >
              <div
                className={`size-[30px] rounded-full flex justify-center items-center ${isActive ? "bg-black text-white" : "hover:bg-gray-100 text-black"}`}
              >
                <item.icon size={20} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
