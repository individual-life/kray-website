import React from "react";
import { Status } from "@/type/kray-planner/Kanban";
import { DetailDotIcon } from "@/public/icons/DetailDotIcon";

const KanbanColumn = () => {
  const [statusList, setStatusList] = React.useState<Status[]>([
    {
      name: "Not Started",
      bgColor: "#f6f6f6",
      color: "#000000",
    },
    {
      name: "In Progress",
      bgColor: "#fbe5e1",
      color: "#e95026",
    },
    {
      name: "Under Review",
      bgColor: "#eef5ff",
      color: "#298bf0",
    },
    {
      name: "Completed",
      bgColor: "#edfaee",
      color: "#0fb539",
    },
  ]);

  return (
    <div>
      <div className="flex gap-[30px] justify-between">
        {statusList.map((status, index) => (
          <div
            key={index}
            className="bg-white flex justify-between items-center rounded-[10px] flex-1 px-[15px] py-[8px]"
            style={{
              boxShadow: "0 0 1px 1px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="flex items-center gap-[10px] rounded-full w-fit pl-[10px] pr-[5px] py-[5px]"
              style={{
                backgroundColor: status.bgColor,
              }}
            >
              <span
                className="text-[13px] font-normal"
                style={{
                  color: status.color,
                }}
              >
                {status.name}
              </span>
              <div className="rounded-full size-[20px] bg-[rgba(255,255,255,0.5)] flex justify-center items-center">
                <span
                  className="text-[13px] font-normal"
                  style={{
                    color: status.color,
                  }}
                >
                  0
                </span>
              </div>
            </div>
            <div>
              <DetailDotIcon size={18} className="cursor-pointer" />
            </div>
            <div className="absolute bg-amber-300 top-0 right-0"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
