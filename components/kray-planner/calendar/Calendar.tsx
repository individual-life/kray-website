"use client";
import React, { useState, useEffect, useRef } from "react";
import { getWeekDays, daysOfWeek } from "@/lib/utils/dateUtils";
import AllDay from "./AllDay";
import TimeGrid from "./TimeGrid";

const Calendar = () => {
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  useEffect(() => {
    setWeekDays(getWeekDays());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.boundingClientRect.top < 95 && !entry.isIntersecting);
      },
      { threshold: 1.0 },
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-white w-full h-full rounded-[10px] border border-[#e5e5e5] relative">
      <div
        ref={sentinelRef}
        className="absolute  top-0 w-full h-0 pointer-events-none invisible"
      />

      <div
        className={`flex h-[80px] sticky top-0 z-10 bg-white transition-all duration-200 border-solid ${
          isSticky
            ? "border-y border-[#e5e5e5]"
            : "border-y border-transparent rounded-t-[10px]"
        }`}
      >
        <div className="flex justify-center items-center p-[15px] w-[120px]">
          <div className="border border-[#e5e5e5] px-[10px] py-[5px] bg-[#f6f6f6] w-max rounded-full">
            <p className="text-[14px] font-normal text-(--color-grey)">
              UTC +7
            </p>
          </div>
        </div>
        <div className="grid grid-cols-7 w-full">
          {Array.from({ length: 7 }).map((_: any, index: number) => {
            return (
              <div
                key={index}
                className="relative"
                style={{
                  borderLeft: index === 0 ? "1px solid #e5e5e5" : "none",
                }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <p
                    className="text-[20px] font-normal"
                    style={{
                      color:
                        currentDate?.getDate() === weekDays[index]?.getDate()
                          ? "#000000"
                          : "rgba(0,0,0,0.6)",
                    }}
                  >
                    {weekDays[index]?.getDate()}
                  </p>
                  <p
                    className="text-[14px]"
                    style={{
                      color:
                        currentDate?.getDate() === weekDays[index]?.getDate()
                          ? "#000000"
                          : "rgba(0,0,0,0.6)",
                    }}
                  >
                    {daysOfWeek[index]}
                  </p>
                </div>
                <div
                  className="absolute bottom-[-2px] left-0 w-full bg-(--color-orange)"
                  style={{
                    height:
                      currentDate?.getDate() === weekDays[index]?.getDate()
                        ? "2px"
                        : 0,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>

      <AllDay />
      <TimeGrid />
    </div>
  );
};

export default Calendar;
