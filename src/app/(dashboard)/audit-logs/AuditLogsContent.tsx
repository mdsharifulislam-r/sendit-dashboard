"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetAuditLogsQuery } from "@/redux/apiSlices/auditLogsSlice";
import { useProfileQuery } from "@/redux/apiSlices/authSlice";
import { imageUrl } from "@/redux/api/baseApi";
import { io } from "socket.io-client";

export default function AuditLogsContent() {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [realtimeLogs, setRealtimeLogs] = useState<any[]>([]);

    // API Integration
    const { data: profileResponse } = useProfileQuery(undefined);
    const adminUser = profileResponse?.data;
    const adminId = adminUser?._id;

    const { data: auditResponse, isLoading } = useGetAuditLogsQuery({
        searchTerm,
        page,
        limit: 10
    });

    const dbLogs = auditResponse?.data || [];
    const pagination = auditResponse?.pagination;
    const totalPage = Number(pagination?.totalPage || 1);
    const currentPage = Number(pagination?.page || page);

    // Socket Integration for realtime audit logs
    useEffect(() => {
        if (!adminId) return;

        // Connect to socket server
        const socket = io(imageUrl, {
            transports: ["websocket"]
        });

        const eventName = `get-audits::${adminId}`;
        console.log("Subscribing to socket event:", eventName);

        socket.on(eventName, (newLog: any) => {
            console.log("Received realtime audit log:", newLog);
            if (newLog) {
                setRealtimeLogs(prev => [newLog, ...prev]);
            }
        });

        return () => {
            socket.off(eventName);
            socket.disconnect();
        };
    }, [adminId]);

    // Reset realtime logs when user changes pages or searches
    useEffect(() => {
        setRealtimeLogs([]);
    }, [page, searchTerm]);

    // Merge DB logs and Realtime logs, filtering out potential duplicates
    const logs = useMemo(() => {
        const dbIds = new Set(dbLogs.map((log: any) => log._id));
        const uniqueRealtime = realtimeLogs.filter((log: any) => !dbIds.has(log._id));
        return [...uniqueRealtime, ...dbLogs];
    }, [realtimeLogs, dbLogs]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden block" />
                <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
            </div>

            {/* Audit Trail Banner */}
            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-xl space-y-2">
                <h4 className="text-blue-700 font-bold text-sm">Audit Trail</h4>
                <p className="text-blue-700 text-xs font-bold">All administrative actions are logged for security and compliance purposes. Logs are retained for 2 years.</p>
            </div>

            {/* Search and Filters */}
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

            {/* Logs Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/30 border-b border-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Action</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Admin Name</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Timestamp</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Old Value</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">New Value</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Reason</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                                    <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                                    <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                                    <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                    <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                    <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                                </tr>
                            ))
                        ) : logs.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-sm font-semibold text-gray-500">
                                    No audit logs found
                                </td>
                            </tr>
                        ) : (
                            logs.map((log: any) => {
                                const userName = log.user?.name || "N/A";
                                const userRole = log.user?.role || "N/A";
                                const timestamp = log.createdAt ? new Date(log.createdAt).toLocaleString() : "N/A";
                                return (
                                    <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <span className="text-sm font-bold text-gray-900">{log.action}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-sm font-bold text-gray-900">{userName}</span>
                                                <Badge className={`${
                                                    userRole.includes('SUPER_ADMIN') ? 'bg-purple-100 text-purple-700' :
                                                    userRole.includes('ADMIN') ? 'bg-blue-100 text-blue-700' :
                                                    userRole.includes('TRAVELER') ? 'bg-green-100 text-green-700' :
                                                    'bg-gray-100 text-gray-700'
                                                } border-none text-[8px] font-bold px-1.5 py-0 w-fit`}>
                                                    {userRole}
                                                </Badge>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-xs text-gray-700 font-bold">{timestamp}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm text-gray-700 font-bold">{log.old_value || "-"}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm font-bold text-gray-900">{log.new_value || "-"}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-xs text-gray-700 font-bold leading-relaxed">{log.reason || "-"}</span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {pagination && totalPage > 1 && (
                    <div className="p-6 flex justify-between items-center bg-gray-50/30 border-t border-gray-50">
                        <p className="text-xs text-gray-600 font-medium">
                            Showing <span className="text-gray-900">{(currentPage - 1) * 10 + 1} - {Math.min(currentPage * 10, pagination.total)}</span> of {pagination.total} logs
                        </p>
                        <div className="flex gap-1">
                            <Button 
                                variant="outline" 
                                size="icon" 
                                className="w-8 h-8 border-gray-100 text-gray-600 rounded-lg"
                                disabled={currentPage <= 1}
                                onClick={() => setPage(currentPage - 1)}
                            >
                                {"<"}
                            </Button>
                            {Array.from({ length: totalPage }).map((_, idx) => {
                                const pNum = idx + 1;
                                return (
                                    <Button 
                                        key={pNum}
                                        onClick={() => setPage(pNum)}
                                        className={`w-8 h-8 rounded-lg text-xs font-bold ${
                                            currentPage === pNum 
                                                ? "bg-blue-600 text-white" 
                                                : "bg-transparent hover:bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {pNum}
                                    </Button>
                                );
                            })}
                            <Button 
                                variant="outline" 
                                size="icon" 
                                className="w-8 h-8 border-gray-100 text-gray-600 rounded-lg"
                                disabled={currentPage >= totalPage}
                                onClick={() => setPage(currentPage + 1)}
                            >
                                {">"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Export Actions */}
            {/* <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-200 text-gray-700 font-bold text-xs gap-2 shadow-sm">
                    Export CSV
                </Button>
                <Button className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-2 shadow-md">
                    Download Report
                </Button>
            </div> */}
        </div>
    );
}
