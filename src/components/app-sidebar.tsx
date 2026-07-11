"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MENU_ITEMS } from "@/constants/navigation";

import { api } from "@/redux/api/baseApi";
import { Role } from "@/types";

import { Search } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";

export function AppSidebar() {
    const pathname = usePathname();
    const [role, setRole] = useState<Role>("admin");
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            const localRole = localStorage.getItem("role") as Role;
            if (localRole) {
                setRole(localRole);
            }
        }
    }, []);

    // Use role-based menu items
    const items = MENU_ITEMS[role] || MENU_ITEMS["admin"]; 
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
        dispatch(api.util.resetApiState());
        router.push("/auth/login");
        router.refresh();
    };

    return (
        <Sidebar className="border-r border-gray-100 bg-white">
            <SidebarContent className="p-0 h-full flex flex-col">
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className="px-6 py-8">
                        <Link href="/" className="block">
                            <h1 className="text-xl font-bold text-[#2563EB] tracking-tight">Sendit Admin</h1>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="px-6 mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                                type="text" 
                                placeholder="Search users, shipments, tr" 
                                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-500"
                            />
                        </div>
                    </div>

                    <SidebarGroup className="px-3 flex-1 overflow-y-auto">
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-1">
                                {items.map((item) => {
                                    const isActive = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url));
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton 
                                                asChild 
                                                isActive={isActive} 
                                                className={`h-11 rounded-lg ${isActive ? "bg-blue-50 text-[#2563EB] hover:bg-blue-50 hover:text-[#2563EB]" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`}
                                            >
                                                <Link 
                                                    href={item.url} 
                                                    className="flex items-center gap-3 px-3 w-full"
                                                >
                                                    <item.icon className={`w-5 h-5 ${isActive ? "text-[#2563EB]" : "text-gray-600"}`} />
                                                    <span className="font-medium text-sm">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Logout Button */}
                    <div className="p-4 mt-auto">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 w-full transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="font-medium text-sm">Sign-out</span>
                        </button>
                    </div>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}
