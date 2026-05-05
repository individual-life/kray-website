import { LogoutIcon } from "@/public/icons/LogoutIcon";
import { MenuIcon } from "@/public/icons/MenuIcon";
import { SettingIcon } from "@/public/icons/SettingIcon";
import { SupportIcon } from "@/public/icons/SupportIcon";
import { Status } from "@/type/kray-todo/Task";

export const krayTodoSideNavData = [
    {
        name: "Menu",
        href: "/kray-todo/",
        icon: MenuIcon
    },
     {
            name: "Settings",
            href: "/kray-todo/settings",
            icon: SettingIcon
        },
]

export const krayTodoSideLogoutData = [
    {
        name: "Support",
        href: "/kray-todo/support",
        icon: SupportIcon
    },
    {
        name: "Logout",
        href: "/",
        icon: LogoutIcon
    }
]

export const TASK_STATUS: Status[] = [
    {   
        name: "New",
        bgColor: "bg-[#F1F5F9]",
        color: "text-[#475569]",
    },
    {
        name: "On Hold",
        bgColor: "bg-[#FEF3C7]",
        color: "text-[#D97706]",
    },
    {
        name: "Cancelled",
        bgColor: "bg-[#FEE2E2]",
        color: "text-[#DC2626]",
    },
    {
        name: "Done",
        bgColor: "bg-[#DCFCE7]",
        color: "text-[#16A34A]",
    },
    {
        name: "In Progress",
        bgColor: "bg-[#EFF6FF]",
        color: "text-[#2563EB]",
    }
]
    