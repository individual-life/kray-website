"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/public/icons/Logo";
import { SearchIcon } from "@/public/icons/SearchIcon";
import { krayAdminNavData } from "@/lib/constant/kray-admin";

const Navigator = () => {
  const pathname = usePathname();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-[330px] h-full p-4">
      <div className="w-full h-[50px] bg-white border rounded-lg border-[rgba(0,0,0,0.1)] items-center px-[7px] flex gap-x-2">
        <div className="size-8 bg-(--color-orange) rounded-[10px]">
          <Logo className="w-full h-full object-contain" />
        </div>
        <div className=" flex flex-col ">
          <span className="text-[14px] font-medium">Minh Nhut</span>
          <span className="text-[12px] text-[rgba(0,0,0,0.8)]">
            The Kray Walt Company
          </span>
        </div>
      </div>

      <div className="relative flex items-center bg-[#E7E6E4] h-[34px] w-full mt-4 rounded-lg px-3 transition-colors duration-150">
        <SearchIcon size={14} className="text-[#8E8D8A] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="w-full h-full bg-transparent border-none outline-none pl-2 pr-2 text-[13px] placeholder-[#8E8D8A] text-[#1C1C1C]"
        />
      </div>

      <div className="mt-6">
        <span className="text-[15px] font-medium px-4 text-[rgba(0,0,0,0.4)]">
          Essentials
        </span>
        <div className="w-full mt-3 flex flex-col gap-y-1">
          {krayAdminNavData.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`w-full px-4 py-2 rounded-xl flex items-center gap-x-3 cursor-pointer transition-all duration-150 ${
                  isActive
                    ? "bg-white"
                    : "bg-transparent  hover:bg-[rgba(0,0,0,0.02)]"
                }`}
              >
                <item.icon size={20} color={"rgba(0,0,0,0.5)"} />
                <span
                  className={`text-[15px] transition-colors text-[rgba(0,0,0,0.5)]`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigator;
