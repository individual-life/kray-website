"use client";

import React from "react";

interface TimelineTask {
  id: string;
  name: string;
  start: string;
  end: string;
  color?: string;
  dependency?: string;
}

interface PersonInCharge {
  userId: string;
  name: string;
  avatar: string;
  tasks: TimelineTask[];
}

const TimeLine = () => {
  const [monthActive, setMonthActive] = React.useState<number>(
    new Date().getMonth() + 1,
  );
  const [yearActive, setYearActive] = React.useState<number>(
    new Date().getFullYear(),
  );

  const [endDate, setEndDate] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const lastDay = new Date(yearActive, monthActive, 0);
    setEndDate(lastDay);
  }, [monthActive, yearActive]);

  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (monthActive === 1) {
        setMonthActive(12);
        setYearActive((prev) => prev - 1);
      } else {
        setMonthActive((prev) => prev - 1);
      }
    } else {
      if (monthActive === 12) {
        setMonthActive(1);
        setYearActive((prev) => prev + 1);
      } else {
        setMonthActive((prev) => prev + 1);
      }
    }
  };

  const monthName = new Date(yearActive, monthActive - 1).toLocaleString(
    "default",
    {
      month: "long",
    },
  );

  const [personInCharge, setPersonInCharge] = React.useState<PersonInCharge[]>([
    {
      userId: "u1",
      name: "Chris",
      avatar: "img1.jpg",
      tasks: [
        {
          id: "t1",
          name: "Design Exploration",
          start: "2026-07-22",
          end: "2026-07-25",
          color: "#purple",
        },
      ],
    },
    {
      userId: "u2",
      name: "Product Team",
      avatar: "img2.jpg",
      tasks: [
        {
          id: "t2",
          name: "Sprint Planning",
          start: "2026-07-25",
          end: "2026-07-27",
          dependency: "t1",
        },
      ],
    },
  ]);

  return (
    <div className="bg-white w-full h-full rounded-[10px] border border-[#e5e5e5]">
      <div className=" px-[20px] pt-[15px] pb-[10px]">
        <div className="flex items-center justify-between mb-4 w-[200px]">
          <h4 className="text-[14px] font-normal text-[#000000] uppercase min-w-[100px]">
            {monthName}
          </h4>
        </div>

        <div className="flex  justify-between w-full h-[20px]">
          <div className="flex-1"></div>
          {Array.from({ length: endDate?.getDate() || 0 }, (_, i) => i + 1).map(
            (day) => {
              const date = new Date(yearActive, monthActive - 1, day);
              const dayName = date.toLocaleDateString("en-US", {
                weekday: "narrow",
              });
              return (
                <div
                  key={day}
                  className="flex items-center justify-center flex-1"
                >
                  <span className="text-[13px] font-normal text-(--color-grey)">
                    {dayName} {day}
                  </span>
                </div>
              );
            },
          )}
        </div>
      </div>
      <div className="border-t border-[#e5e5e5]"></div>
      <div className="">
        {personInCharge.map((person, indexPerson) => (
          <div key={person?.userId} className="px-[20px] relative">
            <div className="flex  justify-between w-full">
              <div className="flex-1"></div>
              {Array.from(
                { length: endDate?.getDate() || 0 },
                (_, i) => i + 1,
              ).map((dayNumber, i) => {
                return (
                  <div
                    key={i}
                    className={`flex items-center border-[#e5e5e5]  justify-center flex-1 ${dayNumber === 1 ? "border-l" : ""} ${
                      endDate && dayNumber < endDate.getDate() ? "border-r" : ""
                    }`}
                    style={{
                      paddingBottom: 10,
                      paddingTop: indexPerson === 0 ? 30 : 0,
                    }}
                  >
                    <div className="bg-[rgba(0,0,0,0.03)] w-full h-[100px]"></div>
                  </div>
                );
              })}

              <div
                className="absolute top-0 bg-[#8E4465] flex flex-col justify-between h-[64px] rounded-[10px] px-[15px] py-[10px]"
                style={{
                  marginBottom: 10,
                  marginTop: indexPerson === 0 ? 30 + 18 : 18,
                  marginLeft: `calc(100% / ${endDate?.getDate() || 0} + 6px)`,
                  width: `calc(100% / ${endDate?.getDate() || 0} * ${5} - 36px)`,
                }}
              >
                <p className="font-light text-[14px] text-white line-clamp-1 m-0">
                  {person.tasks?.[0]?.name}
                </p>
                <p className="text-[13px] text-[rgba(255,255,255,0.5)] m-0">
                  SUN 1 - THU 5
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
