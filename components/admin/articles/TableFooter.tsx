import { ArrowLeft } from "@/public/icons/ArrowLeft";
import { ArrowRight } from "@/public/icons/ArrowRight";

const TableFooter = () => {
  return (
    <div className="w-full px-5 py-2.5 flex justify-between items-center">
      <div>
        <p className="text-[12px] text-[rgba(0,0,0,0.5)]">
          Viewing 1-6 of 100 results
        </p>
      </div>
      <div className="flex gap-x-2">
        <div className="size-6 cursor-pointer border border-[rgba(0,0,0,0.2)] rounded-[5px] flex justify-center items-center">
          <ArrowLeft size={15} className="text-[rgba(0,0,0,0.8)] shrink-0" />
        </div>
        <div className="size-6 cursor-pointer border-[rgba(0,0,0,0.2)] bg-[rgba(0,0,0,1)] rounded-[5px] flex justify-center items-center">
          <span className="text-[12px] text-white">1</span>
        </div>
        <div className="size-6 cursor-pointer border border-[rgba(0,0,0,0.2)] rounded-[5px] flex justify-center items-center">
          <ArrowRight size={15} className="text-[rgba(0,0,0,0.8)] shrink-0" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default TableFooter;
