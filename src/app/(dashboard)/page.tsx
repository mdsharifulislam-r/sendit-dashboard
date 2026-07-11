import type { Metadata } from "next";
import DashboardContent from "./DashboardContent";

export const metadata: Metadata = {
    title: "Dashboard Overview",
};

export default function DashboardPage() {
    return <DashboardContent />;
}
