import type { Metadata } from "next";
import UsersManagementContent from "./UsersManagementContent";

export const metadata: Metadata = {
    title: "Users Management",
};

export default function UsersManagementPage() {
    return <UsersManagementContent />;
}
