"use client";

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CreateAdminForm from "./CreateAdminForm";
import {
    Plus,
    MoreVertical,
    Edit2,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    useGetAllAdminsQuery,
    useDeleteAdminMutation
} from "@/redux/apiSlices/adminsSlice";
import { toast } from "sonner";

export default function AdminManagementContent() {
    const [isCreating, setIsCreating] = useState(false);
    const [adminToEdit, setAdminToEdit] = useState<any>(null);

    const { data: adminsResponse, isLoading } = useGetAllAdminsQuery(undefined);
    const [deleteAdmin] = useDeleteAdminMutation();

    const adminsList = adminsResponse?.data || [];

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this admin user?")) {
            try {
                await deleteAdmin(id).unwrap();
                toast.success("Admin deleted successfully!");
            } catch (error) {
                console.error("Failed to delete admin:", error);
                toast.error("Failed to delete admin profile.");
            }
        }
    };

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] ">
            {isCreating ? (
                <CreateAdminForm
                    adminToEdit={adminToEdit}
                    onClose={() => {
                        setIsCreating(false);
                        setAdminToEdit(null);
                    }}
                />
            ) : (
                <>
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger className="md:hidden block" />
                                <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
                            </div>
                            <p className="text-gray-600">Configure access levels and monitor administrative security across the platform.</p>
                        </div>
                        <Button
                            onClick={() => {
                                setAdminToEdit(null);
                                setIsCreating(true);
                            }}
                            className="bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl px-6 py-6 h-auto"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create Admin
                        </Button>
                    </div>

                    {/* Administrator Directory */}
                    <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                        <CardContent className="p-0">
                            <div className="p-6 flex justify-between items-center border-b border-gray-50">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xl font-bold text-gray-900">Administrator Directory</h2>
                                </div>
                            </div>
                            <Table>
                                <TableHeader className="bg-gray-50/50">
                                    <TableRow className="border-b border-gray-50 hover:bg-transparent">
                                        <TableHead className="text-[10px] font-bold text-gray-600 uppercase tracking-widest h-12 px-6">Administrator</TableHead>
                                        <TableHead className="text-[10px] font-bold text-gray-600 uppercase tracking-widest h-12">Contact</TableHead>
                                        <TableHead className="text-[10px] font-bold text-gray-600 uppercase tracking-widest h-12">Role</TableHead>
                                        <TableHead className="text-[10px] font-bold text-gray-600 uppercase tracking-widest h-12">Permissions</TableHead>
                                        <TableHead className="text-[10px] font-bold text-gray-600 uppercase tracking-widest h-12 text-right px-6">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        Array.from({ length: 3 }).map((_, i) => (
                                            <TableRow key={i} className="animate-pulse">
                                                <TableCell className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></TableCell>
                                                <TableCell className="py-4"><div className="h-4 bg-gray-200 rounded w-28"></div></TableCell>
                                                <TableCell className="py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></TableCell>
                                                <TableCell className="py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></TableCell>
                                                <TableCell className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12 ml-auto"></div></TableCell>
                                            </TableRow>
                                        ))
                                    ) : adminsList.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="px-6 py-8 text-center text-sm font-semibold text-gray-500">
                                                No administrators found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        adminsList.map((admin: any) => {
                                            const initials = admin.name ? admin.name.split(" ").map((n: string) => n[0]).join("") : "A";
                                            return (
                                                <TableRow key={admin._id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                                                    <TableCell className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="w-10 h-10 rounded-xl">
                                                                <AvatarFallback className="bg-blue-50 text-blue-700 font-bold text-sm">
                                                                    {initials}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="space-y-0.5">
                                                                <p className="text-sm font-bold text-gray-900">{admin.name}</p>
                                                                <p className="text-xs text-gray-500">{admin.email}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-xs text-gray-600 font-bold">{admin.contact || "N/A"}</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-xs text-blue-700 font-bold uppercase">{admin.admin_sub_role || admin.role}</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-1">
                                                            {admin.permissions?.map((p: string, pi: number) => (
                                                                <Badge key={pi} className="bg-green-50 text-green-700 hover:bg-green-50 border-none text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                                                                    {p}
                                                                </Badge>
                                                            )) || <span className="text-xs text-gray-400 font-medium">None</span>}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="px-6 text-right">
                                                        <div className="flex justify-end gap-1">
                                                            <Button
                                                                onClick={() => {
                                                                    setAdminToEdit(admin);
                                                                    setIsCreating(true);
                                                                }}
                                                                variant="ghost"
                                                                size="icon"
                                                                className="w-8 h-8 text-gray-600 hover:text-gray-900 rounded-lg border border-gray-50"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </Button>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-600 hover:text-gray-900 rounded-lg border border-gray-50">
                                                                        <MoreVertical className="w-4 h-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="w-32">
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleDelete(admin._id)}
                                                                        className="cursor-pointer text-xs font-bold text-red-700 hover:text-red-800"
                                                                    >
                                                                        Delete Admin
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}
