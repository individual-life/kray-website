import Header from "@/components/kray-todo/Header";
import NavBar from "@/components/kray-todo/NavBar";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kray Todo — Task Management & Visual Whiteboard",
  description:
    "Kray Todo helps you manage tasks efficiently with a Kanban-style board, progress tracking, and a built-in whiteboard for brainstorming and visual note-taking.",
  keywords: [
    "todo app",
    "task management",
    "kanban board",
    "whiteboard",
    "sticky notes",
    "productivity",
    "kray",
  ],
  authors: [{ name: "Kray" }],
  openGraph: {
    title: "Kray Todo — Task Management & Visual Whiteboard",
    description:
      "Manage your tasks and brainstorm ideas with Kray Todo's powerful Kanban board and interactive whiteboard.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kray Todo — Task Management & Visual Whiteboard",
    description:
      "Manage your tasks and brainstorm ideas with Kray Todo's powerful Kanban board and interactive whiteboard.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
