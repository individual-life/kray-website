import Header from "@/components/kray-planner/Header";
import NavBar from "@/components/kray-planner/NavBar";
import React from "react";

export default function KrayPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-(--color-white-grey) w-full h-screen  px-[50px] pb-[20px] pt-[20px] flex flex-col">
      <Header />
      <div className="flex flex-1">
        <NavBar />
        <div className="flex-1 ml-[30px] mt-[30px]">{children}</div>
      </div>
    </div>
  );
}
