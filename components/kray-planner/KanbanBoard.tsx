"use client";

import { krayPlannerKanbanBoardData } from "@/lib/constant/kray-planner";
import { PlusWhiteIcon } from "@/public/icons/PlusWhiteIcon";
import { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import TimeLine from "./TimeLine";
import SpreadSheet from "./SpreadSheet";
import Calendar from "./Calendar";

const KanbanBoard = () => {
  const [boardActive, setBoardActive] = useState(krayPlannerKanbanBoardData[0]);

  const renderBoard = () => {
    switch (boardActive.name) {
      case "Board":
        return <KanbanColumn />;
      case "Timeline":
        return <TimeLine />;
      case "Spreadsheet":
        return <SpreadSheet />;
      case "Calendar":
        return <Calendar />;
      default:
        return <KanbanColumn />;
    }
  };

  return (
    <div className="mt-[30px] w-full ">
      <div className="flex justify-between items-center">
        <div className="bg-white rounded-full flex items-center gap-[5px] px-[5px] py-[5px]">
          {krayPlannerKanbanBoardData.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-[10px]  rounded-full px-[15px] py-[8px] cursor-pointer"
              onClick={() => setBoardActive(item)}
              style={{
                backgroundColor: boardActive === item ? "rgba(0,0,0,0.05)" : "",
              }}
            >
              <item.icon
                size={18}
                color={boardActive === item ? "black" : "rgba(0,0,0,0.6)"}
              />
              <p
                className="text-[14px] font-normal text-[rgba(0,0,0,0.6)]"
                style={{
                  color: boardActive === item ? "black" : "rgba(0,0,0,0.6)",
                }}
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-black rounded-full flex items-center gap-[5px] px-[15px] py-[8px] cursor-pointer">
          <PlusWhiteIcon size={20} color="white" />
          <span className="text-[13px] font-normal text-white">
            Create Task
          </span>
        </div>
      </div>

      <div className="mt-[20px]">{renderBoard()}</div>
    </div>
  );
};

export default KanbanBoard;
