import TableFilter from "./TableFilter";
import TableFooter from "./TableFooter";

const TableManage = () => {
  return (
    <div className="w-full h-full border border-[rgba(0,0,0,0.1)] rounded-lg overflow-hidden flex flex-col">
      <TableFilter />

      <div className="grid grid-cols-[3%_10%_50%_12%_12%_10%] px-5 py-2.5 bg-(--color-white-grey)">
        <div className="flex  items-center">
          <div className="cursor-pointer size-[18px] border border-[rgba(0,0,0,0.1)] rounded-sm bg-white "></div>
        </div>
        <div className="text-[15px] text-[rgba(0,0,0,0.5)] font-medium">
          Thumbnail
        </div>
        <div className="text-[15px] text-[rgba(0,0,0,0.5)] font-medium">
          Title & Slug
        </div>
        <div className="text-[15px] text-[rgba(0,0,0,0.5)] font-medium">
          Category
        </div>
        <div className="text-[15px] text-[rgba(0,0,0,0.5)] font-medium">
          Status
        </div>
        <div className="text-[15px] text-[rgba(0,0,0,0.5)] font-medium">
          Date
        </div>
      </div>
      <div className="flex-1 px-5 pt-5 pb-2.5 flex flex-col gap-y-5">
        <div className="grid grid-cols-[3%_10%_50%_12%_12%_10%]">
          <div className="flex  items-center">
            <div className="cursor-pointer size-[18px] border border-[rgba(0,0,0,0.1)] rounded-sm bg-white "></div>
          </div>
          <div className="text-[15px]">
            <div className="h-20 w-20  bg-amber-200 rounded-[10px]"></div>
          </div>
          <div className="text-[15px] flex flex-col justify-center">
            <h4 className="text-[rgba(0,0,0,0.8)] ">
              PostgreSQL Performance Tuning for High-Traffic Apps
            </h4>
            <p className="mt-1 text-[rgba(0,0,0,0.5)] text-[13px]">
              /blog/postgresql-performance-tuning
            </p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center ">
            <p>Database</p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center ">
            <p>Archived</p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center">
            <p>2026-06-15</p>
          </div>
        </div>

        <div className="grid grid-cols-[3%_10%_50%_12%_12%_10%]">
          <div className="flex  items-center">
            <div className="cursor-pointer size-[18px] border border-[rgba(0,0,0,0.1)] rounded-sm bg-white "></div>
          </div>
          <div className="text-[15px]">
            <div className="h-20 w-20  bg-amber-200 rounded-[10px]"></div>
          </div>
          <div className="text-[15px] flex flex-col justify-center">
            <h4 className="text-[rgba(0,0,0,0.8)] ">
              PostgreSQL Performance Tuning for High-Traffic Apps
            </h4>
            <p className="mt-1 text-[rgba(0,0,0,0.5)] text-[13px]">
              /blog/postgresql-performance-tuning
            </p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center ">
            <p>Database</p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center ">
            <p>Archived</p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center">
            <p>2026-06-15</p>
          </div>
        </div>

        <div className="grid grid-cols-[3%_10%_50%_12%_12%_10%]">
          <div className="flex  items-center">
            <div className="cursor-pointer size-[18px] border border-[rgba(0,0,0,0.1)] rounded-sm bg-white "></div>
          </div>
          <div className="text-[15px]">
            <div className="h-20 w-20  bg-amber-200 rounded-[10px]"></div>
          </div>
          <div className="text-[15px] flex flex-col justify-center">
            <h4 className="text-[rgba(0,0,0,0.8)] ">
              PostgreSQL Performance Tuning for High-Traffic Apps
            </h4>
            <p className="mt-1 text-[rgba(0,0,0,0.5)] text-[13px]">
              /blog/postgresql-performance-tuning
            </p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center ">
            <p>Database</p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center ">
            <p>Archived</p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center">
            <p>2026-06-15</p>
          </div>
        </div>

        <div className="grid grid-cols-[3%_10%_50%_12%_12%_10%]">
          <div className="flex  items-center">
            <div className="cursor-pointer size-[18px] border border-[rgba(0,0,0,0.1)] rounded-sm bg-white "></div>
          </div>
          <div className="text-[15px]">
            <div className="h-20 w-20  bg-amber-200 rounded-[10px]"></div>
          </div>
          <div className="text-[15px] flex flex-col justify-center">
            <h4 className="text-[rgba(0,0,0,0.8)] ">
              PostgreSQL Performance Tuning for High-Traffic Apps
            </h4>
            <p className="mt-1 text-[rgba(0,0,0,0.5)] text-[13px]">
              /blog/postgresql-performance-tuning
            </p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center ">
            <p>Database</p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center ">
            <p>Archived</p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center">
            <p>2026-06-15</p>
          </div>
        </div>

        <div className="grid grid-cols-[3%_10%_50%_12%_12%_10%]">
          <div className="flex  items-center">
            <div className="cursor-pointer size-[18px] border border-[rgba(0,0,0,0.1)] rounded-sm bg-white "></div>
          </div>
          <div className="text-[15px]">
            <div className="h-20 w-20  bg-amber-200 rounded-[10px]"></div>
          </div>
          <div className="text-[15px] flex flex-col justify-center">
            <h4 className="text-[rgba(0,0,0,0.8)] ">
              PostgreSQL Performance Tuning for High-Traffic Apps
            </h4>
            <p className="mt-1 text-[rgba(0,0,0,0.5)] text-[13px]">
              /blog/postgresql-performance-tuning
            </p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center ">
            <p>Database</p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center ">
            <p>Archived</p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center">
            <p>2026-06-15</p>
          </div>
        </div>

        <div className="grid grid-cols-[3%_10%_50%_12%_12%_10%]">
          <div className="flex  items-center">
            <div className="cursor-pointer size-[18px] border border-[rgba(0,0,0,0.1)] rounded-sm bg-white "></div>
          </div>
          <div className="text-[15px]">
            <div className="h-20 w-20  bg-amber-200 rounded-[10px]"></div>
          </div>
          <div className="text-[15px] flex flex-col justify-center">
            <h4 className="text-[rgba(0,0,0,0.8)] ">
              PostgreSQL Performance Tuning for High-Traffic Apps
            </h4>
            <p className="mt-1 text-[rgba(0,0,0,0.5)] text-[13px]">
              /blog/postgresql-performance-tuning
            </p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center ">
            <p>Database</p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center ">
            <p>Archived</p>
          </div>
          <div className="text-[15px] text-[rgba(0,0,0,0.8)] flex items-center">
            <p>2026-06-15</p>
          </div>
        </div>
      </div>
      <TableFooter />
    </div>
  );
};

export default TableManage;
