"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetAuditLogsQuery } from "@/redux/apiSlices/auditLogsSlice";
import { useProfileQuery } from "@/redux/apiSlices/authSlice";
import { imageUrl } from "@/redux/api/baseApi";
import { io } from "socket.io-client";
import { Table, ConfigProvider } from "antd";
import type { TableProps } from "antd";

interface AuditLog {
    _id: string;
    action: string;
    user?: {
        _id?: string;
        name?: string;
        role?: string;
        email?: string;
    };
    createdAt?: string;
    old_value?: string;
    new_value?: string;
    reason?: string;
}

export default function AuditLogsContent() {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);

    const { data: profileResponse } = useProfileQuery(undefined);
    const adminUser = profileResponse?.data;
    const adminId = adminUser?._id;

    const {
        data: auditResponse,
        isLoading,
        isFetching,
    } = useGetAuditLogsQuery({
        searchTerm,
        page,
        limit: 8,
    });

    const logs: AuditLog[] = auditResponse?.data || [];
    const pagination = auditResponse?.pagination;

    const total = Number(pagination?.total || 0);
    const currentPage = Number(pagination?.page || page);
    const limit = Number(pagination?.limit || 10);

    // Reset page when search changes
    const handleSearchChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    // Socket connection
    useEffect(() => {
        if (!adminId) return;

        const socket = io(imageUrl, {
            transports: ["websocket"],
        });

        const eventName = `get-audits::${adminId}`;

        socket.on(eventName, () => {
            // Do not manually add realtime logs to paginated data.
            // Instead, refetch the first page if needed.
            console.log("New audit log received");
        });

        return () => {
            socket.off(eventName);
            socket.disconnect();
        };
    }, [adminId]);

    const columns: TableProps<AuditLog>["columns"] = [
        {
            title: "ACTION",
            dataIndex: "action",
            key: "action",
            render: (action: string) => (
                <span className="text-sm font-bold text-gray-900">
                    {action || "-"}
                </span>
            ),
        },
        {
            title: "ADMIN NAME",
            dataIndex: "user",
            key: "user",
            render: (user: AuditLog["user"]) => {
                const userName = user?.name || "N/A";
                const userRole = user?.role || "N/A";

                return (
                    <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-bold text-gray-900">
                            {userName}
                        </span>

                        <Badge
                            className={`${userRole.includes("SUPER_ADMIN")
                                    ? "bg-purple-100 text-purple-700"
                                    : userRole.includes("ADMIN")
                                        ? "bg-blue-100 text-blue-700"
                                        : userRole.includes("TRAVELER")
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-700"
                                } border-none text-[8px] font-bold px-1.5 py-0 w-fit`}
                        >
                            {userRole}
                        </Badge>
                    </div>
                );
            },
        },
        {
            title: "TIMESTAMP",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: string) => (
                <span className="text-xs text-gray-700 font-bold">
                    {createdAt
                        ? new Date(createdAt).toLocaleString()
                        : "N/A"}
                </span>
            ),
        },
        {
            title: "OLD VALUE",
            dataIndex: "old_value",
            key: "old_value",
            render: (val: string) => (
                <span className="text-sm text-gray-700 font-bold">
                    {val || "-"}
                </span>
            ),
        },
        {
            title: "NEW VALUE",
            dataIndex: "new_value",
            key: "new_value",
            render: (val: string) => (
                <span className="text-sm font-bold text-gray-900">
                    {val || "-"}
                </span>
            ),
        },
        {
            title: "REASON",
            dataIndex: "reason",
            key: "reason",
            render: (reason: string) => (
                <span className="text-xs text-gray-700 font-bold leading-relaxed">
                    {reason || "-"}
                </span>
            ),
        },
    ];

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden block" />

                <h1 className="text-3xl font-bold text-gray-900">
                    Audit Logs
                </h1>
            </div>

            {/* Audit Trail Banner */}
            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-xl space-y-2">
                <h4 className="text-blue-700 font-bold text-sm">
                    Audit Trail
                </h4>

                <p className="text-blue-700 text-xs font-bold">
                    All administrative actions are logged for security and
                    compliance purposes. Logs are retained for 2 years.
                </p>
            </div>

            {/* Search */}
            <div className="flex gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />

                    <Input
                        placeholder="Search audit logs..."
                        className="pl-12 h-12 bg-white border-gray-200 rounded-xl focus-visible:ring-blue-600"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* Logs Table with Ant Design */}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#2563EB",
                        borderRadius: 8,
                    },
                }}
            >
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4">
                    <Table<AuditLog>
                        columns={columns}
                        dataSource={logs}
                        rowKey={(record) => record._id}
                        loading={isLoading || isFetching}
                        pagination={{
                            current: currentPage,
                            pageSize: limit,
                            total: total,
                            onChange: (newPage) => setPage(newPage),
                            showSizeChanger: false,
                            showTotal: (totalCount, range) => (
                                <span className="text-xs text-gray-600 font-medium">
                                    Showing{" "}
                                    <span className="text-gray-900 font-bold">
                                        {range[0]} - {range[1]}
                                    </span>{" "}
                                    of{" "}
                                    <span className="text-gray-900 font-bold">
                                        {totalCount}
                                    </span>{" "}
                                    logs
                                </span>
                            ),
                        }}
                        scroll={{ x: true }}
                    />
                </div>
            </ConfigProvider>
        </div>
    );
}