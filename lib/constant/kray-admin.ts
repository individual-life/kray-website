import { FileTextIcon } from "@/public/icons/FileText";
import { MenuIcon } from "@/public/icons/MenuIcon";
import { SettingIcon } from "@/public/icons/SettingIcon";

export const krayAdminNavData = [
    {
        name: "Dashboard",
        href: "/admin",
        icon: MenuIcon,
    },
    {
        name: "Articles",
        href: "/admin/articles",
        icon: FileTextIcon,
    }
]