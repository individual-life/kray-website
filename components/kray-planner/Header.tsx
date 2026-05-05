import { gajrajOne } from "@/app/fonts";
import { krayPlannerNavData } from "@/lib/constant/kray-planner";
import Image from "next/image";
import Link from "next/link";
import { SearchIcon } from "@/public/icons/SearchIcon";
import { NotificationIcon } from "@/public/icons/NotificationIcon";

const Header = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div></div>
      <div className="py-[8px] bg-white rounded-full w-[45px] flex flex-col justify-center items-center gap-[10px]"></div>
      <div className="py-[8px] bg-white rounded-full w-[45px] flex flex-col justify-center items-center gap-[15px]"></div>
    </div>
  );
};

export default Header;
