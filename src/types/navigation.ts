import { LucideIcon } from "lucide-react";

export interface MenuItem {
    title: string;
    url: string;
    icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export type Role = "admin" | "super_admin" | "organizer";
