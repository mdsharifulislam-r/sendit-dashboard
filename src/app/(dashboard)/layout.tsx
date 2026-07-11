import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AuthenticatedGuard from "@/providers/AuthenticatedGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthenticatedGuard>
            <SidebarProvider className="bg-[#F7FAFC]">
                <AppSidebar />
                <main className="w-full p-4">
                    {children}
                </main>
            </SidebarProvider>
        </AuthenticatedGuard>
    );
}
