import { BoardIcon } from "@/public/icons/BoardIcon";
import { CalendarIcon } from "@/public/icons/CalendarIcon";
import { ClockIcon } from "@/public/icons/ClockIcon";
import { EmailIcon } from "@/public/icons/EmailIcon";
import { LogoutIcon } from "@/public/icons/LogoutIcon";
import { MenuIcon } from "@/public/icons/MenuIcon";
import { MessageIcon } from "@/public/icons/MessageIcon";
import { SettingIcon } from "@/public/icons/SettingIcon";
import { SheetIcon } from "@/public/icons/SheetIcon";
import { SupportIcon } from "@/public/icons/SupportIcon";

export const krayPlannerNavData = [
    {
        name: "Overview",
        href: "/kray-planner"
    },
    {
        name: "Activity",
        href: "/kray-planner/activity"
    },
    {
        name: "Manage",
        href: "/kray-planner/manage"
    },
    {
        name: "Program",
        href: "/kray-planner/program"
    },
    {
        name: "Folders",
        href: "/kray-planner/folders"
    },
    {
        name: "Documents",
        href: "/kray-planner/documents"
    }
]


export const krayPlannerSideNavData = [
    {
        name: "Menu",
        href: "/kray-planner/",
        icon: MenuIcon
    },
    {
        name: "Schedule",
        href: "/kray-planner/schedule",
        icon: CalendarIcon
    },
    {
        name: "Email",
        href: "/kray-planner/email",
        icon: EmailIcon
    },
    {
        name: "Chat",
        href: "/kray-planner/chat",
        icon: MessageIcon
    },
    {
        name: "Settings",
        href: "/kray-planner/settings",
        icon: SettingIcon
    },
]

export const krayPlannerSideLogoutData = [
    {
        name: "Support",
        href: "/kray-planner/support",
        icon: SupportIcon
    },
    {
        name: "Logout",
        href: "/",
        icon: LogoutIcon
    }
]

export const krayPlannerKanbanBoardData = [
    {
        name: "Board",
        icon: BoardIcon
    },
    {
        name: "Timeline",
        icon: ClockIcon
    },
    {
        name: "Spreadsheet",
        icon: SheetIcon
    },
    {
        name: "Calendar",
        icon: CalendarIcon
    }
]