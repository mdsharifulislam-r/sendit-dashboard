"use client";

import { useState, useMemo } from "react";
import { Search, Filter, RefreshCw, Eye, AlertTriangle, ShieldCheck, Ticket, User, HelpCircle, XCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useGetReportsQuery, useUpdateReportStatusMutation, useDeleteReportMutation, ReportItem } from "@/redux/apiSlices/supportSlice";
import { toast } from "sonner";
import { useErrorToast } from "@/hooks/useErrorToast";
import { Button } from "@/components/ui/button";
import { Table, ConfigProvider } from "antd";
import type { TableProps } from "antd";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function SupportDisputesContent() {
    const showError = useErrorToast();
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(8);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [selectedTicket, setSelectedTicket] = useState<ReportItem | null>(null);
    const [deletingTicket, setDeletingTicket] = useState<ReportItem | null>(null);

    // Fetch reports from API using RTK query pagination
    const { data: reportsResponse, isLoading, isFetching, refetch } = useGetReportsQuery({
        page,
        limit,
        status: statusFilter,
    });

    const [updateReportStatus, { isLoading: isUpdating }] = useUpdateReportStatusMutation();
    const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();

    const reports = reportsResponse?.data || [];
    const pagination = reportsResponse?.pagination;
    const totalCount = pagination?.total || reports.length;

    // Filter reports locally based on search bar matching user info, ID, or type
    const filteredReports = useMemo(() => {
        if (!searchTerm.trim()) return reports;
        const q = searchTerm.toLowerCase();
        return reports.filter((item) => {
            const matchesId = item.report_id?.toLowerCase().includes(q);
            const matchesType = item.report_type?.toLowerCase().includes(q);
            const matchesName = item.user?.name?.toLowerCase().includes(q);
            const matchesEmail = item.user?.email?.toLowerCase().includes(q);
            return matchesId || matchesType || matchesName || matchesEmail;
        });
    }, [reports, searchTerm]);

    // Handle Quick Status Updates
    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const res = await updateReportStatus({ id, status: newStatus }).unwrap();
            toast.success(res?.message || `Ticket status updated to "${newStatus}"`);
            refetch();
        } catch (err) {
            showError(err);
        }
    };

    // Handle Delete Report API call
    const handleDeleteReport = async () => {
        if (!deletingTicket) return;
        try {
            const res = await deleteReport(deletingTicket._id).unwrap();
            toast.success(res?.message || `Dispute ticket "${deletingTicket.report_id}" deleted successfully!`);
            setDeletingTicket(null);
            if (selectedTicket?._id === deletingTicket._id) {
                setSelectedTicket(null);
            }
            refetch();
        } catch (error) {
            showError(error);
        }
    };

    // Calculate SLA time (time elapsed since creation)
    const getSlaTimer = (createdAt: string, status: string) => {
        if (status?.toLowerCase() === "closed" || status?.toLowerCase() === "resolved") {
            return "Resolved";
        }
        const createdDate = new Date(createdAt);
        const now = new Date();
        const diffMs = now.getTime() - createdDate.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) {
            return `${diffDays}d ${diffHours % 24}h ago`;
        }
        return `${diffHours}h ${Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))}m ago`;
    };

    // Helper for badge colors
    const getIssueBadgeColor = (type: string) => {
        const lower = type?.toLowerCase() || "";
        if (lower.includes("payment")) return "bg-red-50 text-red-700 border border-red-100";
        if (lower.includes("app")) return "bg-amber-50 text-amber-700 border border-amber-100";
        return "bg-blue-50 text-blue-700 border border-blue-100";
    };

    // Ant Design Columns configuration
    const columns: TableProps<ReportItem>["columns"] = [
        {
            title: "TICKET ID",
            dataIndex: "report_id",
            key: "report_id",
            width: 130,
            render: (report_id: string) => (
                <span className="text-sm font-bold text-gray-900">{report_id}</span>
            ),
        },
        {
            title: "USER",
            key: "user",
            width: 240,
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    {record.user?.image ? (
                        <img
                            src={record.user.image}
                            alt={record.user.name}
                            className="w-7 h-7 rounded-full object-cover border border-gray-250"
                        />
                    ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                            <User className="w-3.5 h-3.5" />
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-bold text-gray-900 leading-tight">
                            {record.user?.name || "Demo User"}
                        </p>
                        <p className="text-[10px] text-gray-500 font-medium">
                            {record.user?.email}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: "ISSUE TYPE",
            dataIndex: "report_type",
            key: "report_type",
            width: 140,
            render: (report_type: string) => (
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${getIssueBadgeColor(report_type)}`}>
                    {report_type}
                </span>
            ),
        },
        {
            title: "PRIORITY",
            key: "priority",
            width: 110,
            render: (_, record) => {
                const isPayment = record.report_type?.toLowerCase().includes("payment");
                const priority = isPayment ? "HIGH" : "MEDIUM";
                return (
                    <Badge className={`
                        ${priority === 'HIGH' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-amber-50 text-amber-700 border border-amber-100'} 
                        border-none text-[10px] font-bold px-3 py-0.5 rounded-full
                    `}>
                        {priority}
                    </Badge>
                );
            },
        },
        {
            title: "STATUS",
            dataIndex: "status",
            key: "status",
            width: 120,
            render: (status: string) => {
                const isClosed = status?.toLowerCase() === "closed";
                return (
                    <Badge className={`
                        ${isClosed ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'} 
                        border-none text-[10px] font-bold px-3 py-0.5 rounded-full capitalize
                    `}>
                        ● {status || "open"}
                    </Badge>
                );
            },
        },
        {
            title: "ASSIGNED TO",
            key: "assignedTo",
            width: 150,
            render: (_, record) => {
                const isPayment = record.report_type?.toLowerCase().includes("payment");
                return (
                    <span className="text-sm text-gray-600 font-medium">
                        {isPayment ? "Billing Agent" : "App Support Agent"}
                    </span>
                );
            },
        },
        {
            title: "SLA TIMER",
            key: "slaTimer",
            width: 120,
            render: (_, record) => (
                <span className="text-xs font-bold text-gray-700">
                    {getSlaTimer(record.createdAt, record.status)}
                </span>
            ),
        },
        {
            title: "ACTIONS",
            key: "actions",
            align: "right",
            width: 120,
            render: (_, record) => {
                return (
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        {/* View Details Button - Icon Only */}
                        <Link 
                            href={`/support-disputes/${record._id}`}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-blue-200 bg-white text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                            title="View Ticket Details"
                        >
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                        </Link>
                        {/* Delete Button - Icon Only */}
                        <button
                            onClick={() => setDeletingTicket(record)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-red-200 bg-white text-red-500 hover:bg-red-50 transition-all shadow-sm"
                            title="Delete Ticket"
                        >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="p-6 md:p-8 space-y-6 bg-[#F8FAFC] min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Support & Disputes</h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                        Monitor user claims, app issues, payments, and communicate to resolve disputes.
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="h-10 px-4 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium self-end sm:self-auto"
                >
                    <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin text-blue-600" : ""}`} />
                    <span>Refresh</span>
                </Button>
            </div>

            {/* Filter Section */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search tickets by ID, user name, email, or issue type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-11 bg-white border-gray-200 focus:ring-blue-500 rounded-xl placeholder:text-gray-400"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                        className="h-11 rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-blue-500 cursor-pointer"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>

            {/* Ant Design Table & Pagination */}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#0052FF",
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
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-2 md:p-4">
                    <Table<ReportItem>
                        columns={columns}
                        dataSource={filteredReports}
                        rowKey={(record) => record._id}
                        loading={isLoading || isFetching}
                        rowClassName={(record) => 
                            `cursor-pointer transition-colors ${
                                selectedTicket?._id === record._id ? "bg-blue-50/40 font-medium" : ""
                            }`
                        }
                        onRow={(record) => ({
                            onClick: () => {
                                setSelectedTicket(record);
                            },
                        })}
                        pagination={{
                            current: page,
                            pageSize: limit,
                            total: totalCount,
                            onChange: (newPage) => setPage(newPage),
                            showSizeChanger: false,
                            showTotal: (total, range) => (
                                <span className="text-xs text-gray-600 font-medium">
                                    Showing <span className="text-gray-900 font-bold">{range[0]}-{range[1]}</span> of{" "}
                                    <span className="text-gray-900 font-bold">{total}</span> tickets
                                </span>
                            ),
                        }}
                        locale={{
                            emptyText: (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <div className="p-4 rounded-full bg-gray-50 text-gray-400 mb-3">
                                        <HelpCircle className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-800">No Tickets Found</h3>
                                    <p className="text-xs text-gray-600 max-w-sm mt-1">
                                        No disputes match your current filter or search criteria.
                                    </p>
                                </div>
                            ),
                        }}
                        scroll={{ x: true }}
                    />
                </div>
            </ConfigProvider>

            {/* Bottom Actions - Active when a ticket is selected */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                <button
                    disabled={!selectedTicket || selectedTicket.status === "closed"}
                    onClick={() => selectedTicket && handleStatusUpdate(selectedTicket._id, "closed")}
                    className="h-14 bg-[#00B67A] text-white rounded-xl font-bold hover:bg-[#00A36D] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Approve Claim</span>
                </button>
                <button
                    disabled={!selectedTicket || selectedTicket.status === "closed"}
                    onClick={() => selectedTicket && handleStatusUpdate(selectedTicket._id, "closed")}
                    className="h-14 bg-[#0052FF] text-white rounded-xl font-bold hover:bg-[#0041CC] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <Ticket className="w-5 h-5" />
                    <span>Partial Refund</span>
                </button>
                <button
                    disabled={!selectedTicket}
                    onClick={() => selectedTicket && toast.info(`Evidence requested for ticket ${selectedTicket.report_id}`)}
                    className="h-14 bg-[#CC8400] text-white rounded-xl font-bold hover:bg-[#B37400] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <AlertTriangle className="w-5 h-5" />
                    <span>Request Evidence</span>
                </button>
                <button
                    disabled={!selectedTicket || selectedTicket.status === "closed"}
                    onClick={() => selectedTicket && handleStatusUpdate(selectedTicket._id, "closed")}
                    className="h-14 bg-[#FF0000] text-white rounded-xl font-bold hover:bg-[#E60000] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <XCircle className="w-5 h-5" />
                    <span>Reject Claim</span>
                </button>
            </div>
            {!selectedTicket && (
                <p className="text-center text-xs text-gray-500 font-semibold mt-2">
                    💡 Select any ticket in the table to activate the bottom action buttons.
                </p>
            )}

            {/* Delete Confirmation Modal */}
            <Dialog open={Boolean(deletingTicket)} onOpenChange={(open) => !open && setDeletingTicket(null)}>
                <DialogContent className="sm:max-w-md rounded-2xl p-6">
                    <DialogHeader className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-bold text-gray-900">
                                Delete Dispute Ticket?
                            </DialogTitle>
                            <DialogDescription className="text-xs text-gray-500 mt-1 leading-relaxed">
                                Are you sure you want to delete the support ticket <strong className="text-gray-900 font-mono">"{deletingTicket?.report_id}"</strong>? This action cannot be undone and will permanently remove this record.
                            </DialogDescription>
                        </div>
                    </DialogHeader>

                    <DialogFooter className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button
                            variant="outline"
                            onClick={() => setDeletingTicket(null)}
                            className="h-10 px-5 rounded-xl border-gray-200 font-bold text-gray-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteReport}
                            disabled={isDeleting}
                            className="h-10 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md flex items-center gap-2 disabled:opacity-50"
                        >
                            {isDeleting ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    <span>Deleting...</span>
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete Ticket</span>
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
