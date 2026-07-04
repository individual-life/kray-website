import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-(--color-white-grey) w-full h-screen  px-[50px] pb-[20px]  flex flex-col"></div>
  );
}
