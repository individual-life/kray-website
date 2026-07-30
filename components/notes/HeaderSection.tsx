import { SearchIcon } from "@/public/icons/SearchIcon";
import TopPicks from "./TopPicks";

const HeaderSection = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center pt-16 pb-12 px-6">
      <div className="flex flex-col items-center ">
        <h1 className="text-[40px] text-center font-medium mt-20 text-[rgba(0,0,0,0.9)]">
          Insights and Inspiration, <br />
          Explore My Notes
        </h1>
        <p className="text-[15px] font-normal text-center mt-4 w-[90%] text-[rgba(0,0,0,0.5)]">
          Dive into my collection of notes, filled with insights and inspiration
          to help you on your journey.
        </p>
      </div>
      <div className="flex justify-center items-center mt-[50px]">
        <div className="w-[400px] h-[45px] flex justify-center items-center bg-[rgba(0,0,0,0.05)] pl-5 pr-1.5 rounded-full">
          <input
            type="text"
            placeholder="Search notes..."
            className="h-full w-full outline-none border-none text-[14px]"
          />
          <div className="h-[38px] w-[45px] rounded-full flex justify-center items-center cursor-pointer">
            <SearchIcon color="rgba(0,0,0,0.5)" size={18} />
          </div>
        </div>
      </div>
      <TopPicks />
    </section>
  );
};

export default HeaderSection;
