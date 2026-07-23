"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    Bell,
    CheckCheck,
    Check,
    Search,
    RefreshCw,
    FileText,
    AlertTriangle,
    DollarSign,
    Eye,
    Filter,
    Clock
} from "lucide-react";
import {
    useGetNotificationsQuery,
    useMarkAllNotificationsAsReadMutation,
    useMarkSingleNotificationAsReadMutation,
    NotificationItem
} from "@/redux/apiSlices/notificationSlice";
import { useProfileQuery } from "@/redux/apiSlices/authSlice";
import { imageUrl } from "@/redux/api/baseApi";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { Table, ConfigProvider, Tooltip } from "antd";
import type { TableProps } from "antd";
import { useErrorToast } from "@/hooks/useErrorToast";

export default function NotificationsContent() {
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");
    const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
    const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null);

    const showError = useErrorToast();

    // Fetch user profile for Socket ID binding
    const { data: profileResponse } = useProfileQuery(undefined);
    const adminId = profileResponse?.data?._id;

    // Fetch notifications
    const {
        data: notifResponse,
        isLoading,
        isFetching,
        refetch,
    } = useGetNotificationsQuery({
        page,
        limit,
    });

    const [markAllAsRead, { isLoading: isMarkingAll }] = useMarkAllNotificationsAsReadMutation();
    const [markSingleAsRead, { isLoading: isMarkingSingle }] = useMarkSingleNotificationAsReadMutation();

    const notifications: NotificationItem[] = notifResponse?.data?.notifications || [];
    const unreadCount: number = notifResponse?.data?.unreadCount || 0;
    const pagination = notifResponse?.pagination;
    const totalCount = pagination?.total || 0;
    const totalPage = pagination?.totalPage || 1;

    // Listen for real-time notifications via Socket.IO
    useEffect(() => {
        if (!adminId) return;

        const socket = io(imageUrl, {
            transports: ["websocket"],
        });

        const eventName = `notification::${adminId}`;

        socket.on(eventName, (data: any) => {
            console.log("Realtime notification received:", data);
            toast.info(data?.title || "New Notification", {
                description: data?.message || "You have a new update.",
                icon: <Bell className="w-5 h-5 text-blue-600 animate-bounce" />,
            });
            refetch();
        });

        return () => {
            socket.off(eventName);
            socket.disconnect();
        };
    }, [adminId, refetch]);

    // Handle Mark All As Read
    const handleMarkAllRead = async () => {
        if (unreadCount === 0) {
            toast.info("All notifications are already read");
            return;
        }
        try {
            const res = await markAllAsRead().unwrap();
            toast.success(res.message || "All notifications marked as read!");
        } catch (error) {
            showError(error);
        }
    };

    // Handle Mark Single As Read
    const handleMarkSingleRead = async (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        try {
            const res = await markSingleAsRead(id).unwrap();
            toast.success(res.message || "Notification marked as read");
            if (selectedNotif && selectedNotif._id === id) {
                setSelectedNotif((prev) => prev ? { ...prev, isRead: true } : null);
            }
        } catch (error) {
            showError(error);
        }
    };

    // Open detail modal and mark as read if unread
    const handleViewDetail = (notif: NotificationItem) => {
        setSelectedNotif(notif);
        if (!notif.isRead) {
            handleMarkSingleRead(notif._id);
        }
    };

    // Filter notifications locally based on search & category / status filters
    const filteredNotifications = useMemo(() => {
        return notifications.filter((item) => {
            // Status filter
            if (statusFilter === "UNREAD" && item.isRead) return false;
            if (statusFilter === "READ" && !item.isRead) return false;

            // Category filter
            if (categoryFilter !== "ALL" && item.filePath?.toLowerCase() !== categoryFilter.toLowerCase()) {
                return false;
            }

            // Search query
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const matchesTitle = item.title?.toLowerCase().includes(q);
                const matchesMsg = item.message?.toLowerCase().includes(q);
                const matchesRef = item.referenceId?.toLowerCase().includes(q);
                const matchesPath = item.filePath?.toLowerCase().includes(q);
                return matchesTitle || matchesMsg || matchesRef || matchesPath;
            }

            return true;
        });
    }, [notifications, statusFilter, categoryFilter, searchQuery]);

    // Unique Categories for Filter Dropdown/Tabs
    const categories = useMemo(() => {
        const set = new Set<string>();
        notifications.forEach((item) => {
            if (item.filePath) set.add(item.filePath);
        });
        return Array.from(set);
    }, [notifications]);

    // Render helper for notification icons
    const getCategoryBadge = (filePath?: string) => {
        const path = filePath?.toLowerCase() || "";
        if (path.includes("report")) {
            return (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Report</span>
                </div>
            );
        }
        if (path.includes("risky") || path.includes("risk")) {
            return (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Risky Item</span>
                </div>
            );
        }
        if (path.includes("withdrawal") || path.includes("payment")) {
            return (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Withdrawal</span>
                </div>
            );
        }
        return (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-100">
                <Bell className="w-3.5 h-3.5" />
                <span className="capitalize">{filePath || "General"}</span>
            </div>
        );
    };

    // Columns for Ant Design Table
    const columns: TableProps<NotificationItem>["columns"] = [
        {
            title: "STATUS",
            dataIndex: "isRead",
            key: "isRead",
            width: 110,
            render: (isRead: boolean) => (
                <div className="flex items-center gap-2">
                    <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                            !isRead ? "bg-blue-600 ring-4 ring-blue-100 animate-pulse" : "bg-gray-300"
                        }`}
                    />
                    <Badge
                        className={`${
                            !isRead
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-gray-100 text-gray-600 border-gray-200"
                        } text-[10px] font-bold px-2 py-0.5 rounded-md border`}
                    >
                        {!isRead ? "UNREAD" : "READ"}
                    </Badge>
                </div>
            ),
        },
        {
            title: "CATEGORY",
            dataIndex: "filePath",
            key: "filePath",
            width: 150,
            render: (filePath: string) => getCategoryBadge(filePath),
        },
        {
            title: "NOTIFICATION SUMMARY",
            key: "summary",
            render: (_, record) => (
                <div className="space-y-1 py-1 cursor-pointer" onClick={() => handleViewDetail(record)}>
                    <div className="flex items-center gap-2">
                        <h4 className={`text-sm ${!record.isRead ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
                            {record.title}
                        </h4>
                        {record.referenceId && (
                            <span className="text-[10px] font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                #{record.referenceId.slice(-6)}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1 font-normal max-w-xl">
                        {record.message}
                    </p>
                </div>
            ),
        },
        {
            title: "DATE & TIME",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 180,
            render: (createdAt: string) => (
                <div className="flex flex-col text-xs">
                    <span className="font-semibold text-gray-800">
                        {createdAt ? new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-"}
                    </span>
                    <span className="text-[11px] text-gray-600">
                        {createdAt ? new Date(createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : ""}
                    </span>
                </div>
            ),
        },
        {
            title: "ACTIONS",
            key: "actions",
            width: 120,
            align: "right",
            render: (_, record) => (
                <div className="flex items-center justify-end gap-1.5">
                    {!record.isRead && (
                        <Tooltip title="Mark as read">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
                                onClick={(e) => handleMarkSingleRead(record._id, e)}
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                        </Tooltip>
                    )}
                    <Tooltip title="View full details">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
                            onClick={() => handleViewDetail(record)}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 md:p-8 space-y-8 bg-[#F8FAFC] min-h-screen">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <SidebarTrigger className="md:hidden block" />
                    <div className="p-3 bg-blue-50 text-[#2563EB] rounded-xl">
                        <Bell className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Notification Center</h1>
                            {unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                                    {unreadCount} new
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-600 font-medium mt-0.5">
                            Manage all system alerts, user submissions, and risky activity logs in real-time.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="h-10 px-4 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium"
                    >
                        <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin text-blue-600" : ""}`} />
                        <span>Refresh</span>
                    </Button>

                    <Button
                        onClick={handleMarkAllRead}
                        disabled={isMarkingAll || unreadCount === 0}
                        className="h-10 px-5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-medium shadow-sm flex items-center gap-2 disabled:opacity-50"
                    >
                        <CheckCheck className="w-4 h-4" />
                        <span>Mark All as Read</span>
                    </Button>
                </div>
            </div>


            {/* Filters & search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 justify-between lg:items-center">
                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search by title, message, or ID..."
                            className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl text-sm focus-visible:ring-blue-600 font-medium placeholder:text-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Status Filter Tabs */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            {(["ALL", "UNREAD", "READ"] as const).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        statusFilter === status
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    {status === "ALL" ? "All" : status === "UNREAD" ? `Unread (${unreadCount})` : "Read"}
                                </button>
                            ))}
                        </div>

                        {/* Category Dropdown/Selector if categories exist */}
                        {categories.length > 0 && (
                            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700">
                                <Filter className="w-3.5 h-3.5 text-gray-400" />
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="bg-transparent focus:outline-none cursor-pointer text-gray-800 font-medium"
                                >
                                    <option value="ALL">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat.replace("_", " ").toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Ant Design Table */}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#2563EB",
                        borderRadius: 12,
                        fontFamily: "inherit",
                    },
                    components: {
                        Table: {
                            headerBg: "#F8FAFC",
                            headerColor: "#475569",
                            headerSplitColor: "transparent",
                            rowHoverBg: "#F1F5F9",
                        },
                    },
                }}
            >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-2 md:p-4">
                    <Table<NotificationItem>
                        columns={columns}
                        dataSource={filteredNotifications}
                        rowKey={(record) => record._id}
                        loading={isLoading || isFetching}
                        rowClassName={(record) => (!record.isRead ? "bg-blue-50/40 font-medium" : "")}
                        pagination={{
                            current: page,
                            pageSize: limit,
                            total: totalCount,
                            onChange: (newPage) => setPage(newPage),
                            showSizeChanger: false,
                            showTotal: (total, range) => (
                                <span className="text-xs text-gray-600 font-medium">
                                    Showing <span className="text-gray-900 font-bold">{range[0]} - {range[1]}</span> of{" "}
                                    <span className="text-gray-900 font-bold">{total}</span> notifications
                                </span>
                            ),
                        }}
                        locale={{
                            emptyText: (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <div className="p-4 rounded-full bg-gray-100 text-gray-400 mb-3">
                                        <Inbox className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-800">No Notifications Found</h3>
                                    <p className="text-xs text-gray-600 max-w-sm mt-1">
                                        {searchQuery || statusFilter !== "ALL" || categoryFilter !== "ALL"
                                            ? "No notifications match your current filter or search criteria."
                                            : "You're all caught up! You have no notifications."}
                                    </p>
                                </div>
                            ),
                        }}
                        scroll={{ x: true }}
                    />
                </div>
            </ConfigProvider>

            {/* Detail Dialog */}
            <Dialog open={Boolean(selectedNotif)} onOpenChange={(open) => !open && setSelectedNotif(null)}>
                <DialogContent className="sm:max-w-lg rounded-2xl p-6">
                    <DialogHeader className="space-y-2">
                        <div className="flex items-center justify-between pr-4">
                            {getCategoryBadge(selectedNotif?.filePath)}
                            <Badge
                                className={`${
                                    selectedNotif?.isRead
                                        ? "bg-gray-100 text-gray-600"
                                        : "bg-blue-100 text-blue-800"
                                } text-xs px-2.5 py-0.5 rounded-full font-semibold border-none`}
                            >
                                {selectedNotif?.isRead ? "Read" : "Unread"}
                            </Badge>
                        </div>
                        <DialogTitle className="text-lg font-bold text-gray-900 leading-snug">
                            {selectedNotif?.title}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-gray-500 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {selectedNotif?.createdAt
                                ? new Date(selectedNotif.createdAt).toLocaleString("en-US", {
                                      dateStyle: "full",
                                      timeStyle: "short",
                                  })
                                : ""}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedNotif && (
                        <div className="space-y-5 py-2">
                            {/* Message Container */}
                            <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-1">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Message Content</p>
                                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                                    {selectedNotif.message}
                                </p>
                            </div>

                            {/* Metadata Grid */}
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="p-3 bg-white border border-gray-100 rounded-xl">
                                    <p className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider mb-1">Notification ID</p>
                                    <p className="font-mono text-gray-800 font-semibold truncate">{selectedNotif._id}</p>
                                </div>

                                {selectedNotif.referenceId && (
                                    <div className="p-3 bg-white border border-gray-100 rounded-xl">
                                        <p className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider mb-1">Reference ID</p>
                                        <p className="font-mono text-gray-800 font-semibold truncate">{selectedNotif.referenceId}</p>
                                    </div>
                                )}

                                <div className="p-3 bg-white border border-gray-100 rounded-xl">
                                    <p className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider mb-1">File Path / Type</p>
                                    <p className="font-semibold text-gray-800 capitalize">{selectedNotif.filePath || "N/A"}</p>
                                </div>

                                <div className="p-3 bg-white border border-gray-100 rounded-xl">
                                    <p className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider mb-1">Receivers</p>
                                    <p className="font-semibold text-gray-800">
                                        {selectedNotif.receiver?.length || 0} Recipient(s)
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex items-center justify-between sm:justify-between pt-2">
                        {!selectedNotif?.isRead ? (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => selectedNotif && handleMarkSingleRead(selectedNotif._id)}
                                disabled={isMarkingSingle}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50 font-semibold text-xs h-9 rounded-xl"
                            >
                                <Check className="w-3.5 h-3.5 mr-1.5" />
                                Mark as Read
                            </Button>
                        ) : (
                            <div />
                        )}
                        <Button
                            onClick={() => setSelectedNotif(null)}
                            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs h-9 px-5 rounded-xl"
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
