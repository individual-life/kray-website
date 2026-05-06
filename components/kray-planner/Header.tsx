import { gajrajOne } from "@/app/fonts";
import { krayPlannerNavData } from "@/lib/constant/kray-planner";
import Image from "next/image";
import Link from "next/link";
import { SearchIcon } from "@/public/icons/SearchIcon";
import { NotificationIcon } from "@/public/icons/NotificationIcon";

const Header = () => {
  return (
    <div className="flex justify-between">
      <div className="flex w-fit items-center cursor-pointer gap-x-[5px] bg-white px-[5px] py-[5px] pr-[20px] rounded-full">
        <Image src="/images/logo.png" alt="Logo" width={30} height={30} />
        <span className="text-[14px] font-medium text-black">NoteFlow</span>
      </div>
      <nav className="px-[20px] bg-white rounded-full h-[45px] flex justify-center items-center gap-[40px]">
        {krayPlannerNavData.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex justify-center items-center text-[14px] font-normal  cursor-pointer text-black duration-300 ease-in-out"
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="px-[5px] bg-white rounded-full  h-[45px] flex justify-center items-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer p-[2px] bg-white rounded-full"
            style={{
              transform: index >= 1 ? `translateX(-${index * 5}px)` : "",
            }}
          >
            <Image src="/images/logo.png" alt="Logo" width={30} height={30} />
          </div>
        ))}
        <div
          style={{
            transform: "translateX(-10px)",
          }}
          className="cursor-pointer"
        >
          <span className="text-[14px] font-normal text-black">+10</span>
        </div>
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
