"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
    Mail, 
    MessageSquare, 
    Bell,
    Search,
    MoreVertical
} from "lucide-react";

export default function NotificationsComponent() {
    const [selectedNotification, setSelectedNotification] = useState<{
        id: string;
        type: string;
        message: string;
        trigger: string;
        status: string;
        date: string;
    } | null>(null);

    const stats = [
        { label: "Email Sent", count: "12,847", icon: <Mail className="w-5 h-5 text-blue-600" /> },
        { label: "SMS Sent", count: "5,432", icon: <MessageSquare className="w-5 h-5 text-green-600" /> },
        { label: "Push Notifications", count: "8,291", icon: <Bell className="w-5 h-5 text-purple-600" /> },
    ];

    const notifications = [
        { id: "NOTIF001", type: "Email", message: "Shipment Delivered Confirmation", trigger: "Delivery Complete", status: "Sent", date: "Apr 18, 2026" },
        { id: "NOTIF002", type: "SMS", message: "Payment Received", trigger: "Payment Success", status: "Sent", date: "Apr 18, 2026" },
        { id: "NOTIF003", type: "Push", message: "KYC Verification Required", trigger: "Account Setup", status: "Pending", date: "Apr 17, 2026" },
        { id: "NOTIF004", type: "Email", message: "Shipment Delayed Alert", trigger: "Delay Detected", status: "Failed", date: "Apr 17, 2026" },
    ];

    const getStatusBadgeClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'sent': return 'bg-green-50 text-green-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            case 'pending': return 'bg-amber-50 text-amber-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            case 'failed': return 'bg-red-50 text-red-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            default: return 'bg-gray-50 text-gray-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'email': return <Mail className="w-4 h-4 text-blue-700" />;
            case 'sms': return <MessageSquare className="w-4 h-4 text-green-700" />;
            case 'push': return <Bell className="w-4 h-4 text-purple-700" />;
            default: return null;
        }
    };

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden block" />
                <h1 className="text-2xl font-bold text-gray-900">Notification Center</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gray-50">
                                {stat.icon}
                            </div>
                            <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">{stat.label}</p>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input 
                    placeholder="Search notifications..." 
                    className="pl-10 bg-white border border-gray-200 rounded-xl h-12 shadow-sm focus-visible:ring-blue-600 font-bold placeholder:text-gray-500" 
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">MESSAGE TYPE</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">MESSAGE</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">TRIGGER EVENT</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">STATUS</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider text-right">DATE</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider text-right">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {notifications.map((notif) => (
                            <tr key={notif.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold text-gray-900">{notif.id}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-700 font-bold">
                                        {getTypeIcon(notif.type)}
                                        {notif.type}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-700 font-bold">{notif.message}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-700 font-bold">{notif.trigger}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={getStatusBadgeClass(notif.status)}>
                                        {notif.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-sm text-gray-700 font-bold">{notif.date}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => setSelectedNotification(notif)}>
                                                    View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>Resend</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={Boolean(selectedNotification)} onOpenChange={(open) => !open && setSelectedNotification(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Notification Details</DialogTitle>
                        <DialogDescription>
                            See notification message and trigger information.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedNotification && (
                        <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase">ID</p>
                                    <p className="font-semibold text-gray-900">{selectedNotification.id}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Type</p>
                                    <p className="font-semibold text-gray-900">{selectedNotification.type}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Status</p>
                                    <p className="font-semibold text-gray-900">{selectedNotification.status}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Date</p>
                                    <p className="font-semibold text-gray-900">{selectedNotification.date}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">Message</p>
                                <p className="font-semibold text-gray-900">{selectedNotification.message}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">Trigger Event</p>
                                <p className="font-semibold text-gray-900">{selectedNotification.trigger}</p>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedNotification(null)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
