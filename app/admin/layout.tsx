import Navigator from "@/components/admin/Navigator";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-(--color-white-grey) w-full h-screen flex flex-col">
      <div className="flex h-screen w-full">
        <Navigator />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
