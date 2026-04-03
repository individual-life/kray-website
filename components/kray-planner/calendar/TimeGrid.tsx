const TimeGrid = () => {
  return (
    <>
      <div className="flex border-t border-[#e5e5e5] h-[130px]">
        <div className="flex justify-center items-center p-[15px] w-[120px]">
          <p className="text-[14px] font-normal text-(--color-grey)"></p>
        </div>
        <div className="grid grid-cols-7 w-full">
          {Array.from({ length: 7 }).map((_: any, index: number) => {
            return (
              <div key={index} className="border-l border-[#e5e5e5]"></div>
            );
          })}
        </div>
      </div>
      {Array.from({ length: 9 }).map((_: any, index: number) => {
        const hour = index + 9;
        const displayHour = hour > 12 ? hour - 12 : hour;
        const ampm = hour >= 12 ? "PM" : "AM";
        return (
          <div key={index} className="flex border-t border-[#e5e5e5] h-[130px]">
            <div className="flex p-[15px] w-[120px] relative">
              <p className="text-[14px] font-normal text-(--color-grey) bg-white absolute top-[-10px] px-[20px] left-0">
                {`${displayHour} ${ampm}`}
              </p>
            </div>
            <div className="grid grid-cols-7 w-full">
              {Array.from({ length: 7 }).map((_: any, index: number) => {
                return (
                  <div key={index} className="border-l border-[#e5e5e5]"></div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TimeGrid;
