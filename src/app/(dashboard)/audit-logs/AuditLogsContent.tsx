"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuditLogsContent() {
    const [searchTerm, setSearchTerm] = useState("");

    const logs = [
        {
            action: "User Suspended",
            admin: "Admin John",
            role: "Super Admin",
            timestamp: "Apr 18, 2026 3:45 PM",
            oldValue: "Active",
            newValue: "Suspended",
            reason: "Multiple failed KYC attempts"
        },
        {
            action: "KYC Approved",
            admin: "Agent Sarah",
            role: "Compliance Admin",
            timestamp: "Apr 18, 2026 2:30 PM",
            oldValue: "Pending",
            newValue: "Verified",
            reason: "Documents verified successfully"
        },
        {
            action: "Withdrawal Approved",
            admin: "Agent Mike",
            role: "Finance Admin",
            timestamp: "Apr 18, 2026 1:15 PM",
            oldValue: "Pending",
            newValue: "Approved",
            reason: "Standard withdrawal request"
        },
        {
            action: "Commission Rate Updated",
            admin: "Admin John",
            role: "Super Admin",
            timestamp: "Apr 18, 2026 11:00 AM",
            oldValue: "12%",
            newValue: "15%",
            reason: "Platform policy update"
        },
        {
            action: "Shipment Cancelled",
            admin: "Agent Lisa",
            role: "Operations Admin",
            timestamp: "Apr 18, 2026 9:30 AM",
            oldValue: "Active",
            newValue: "Cancelled",
            reason: "User request - travel plans changed"
        },
        {
            action: "Dispute Resolved",
            admin: "Agent Tom",
            role: "Support Agent",
            timestamp: "Apr 17, 2026 4:20 PM",
            oldValue: "Open",
            newValue: "Resolved - Refunded",
            reason: "Damaged item - full refund issued"
        }
    ];

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
            </div>

            {/* Audit Trail Banner */}
            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-xl space-y-2">
                <h4 className="text-blue-700 font-bold text-sm">Audit Trail</h4>
                <p className="text-blue-700 text-xs font-bold">All administrative actions are logged for security and compliance purposes. Logs are retained for 2 years.</p>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input 
                        placeholder="Search audit logs..." 
                        className="pl-12 h-12 bg-white border-gray-200 rounded-xl focus-visible:ring-blue-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="h-12 bg-white border border-gray-200 rounded-xl" />
                <div className="h-12 bg-white border border-gray-200 rounded-xl" />
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
                        {logs.map((log, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-5">
                                    <span className="text-sm font-bold text-gray-900">{log.action}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-sm font-bold text-gray-900">{log.admin}</span>
                                        <Badge className={`${
                                            log.role.includes('Super') ? 'bg-purple-100 text-purple-700' :
                                            log.role.includes('Compliance') ? 'bg-blue-100 text-blue-700' :
                                            log.role.includes('Finance') ? 'bg-green-100 text-green-700' :
                                            log.role.includes('Operations') ? 'bg-orange-100 text-orange-700' :
                                            'bg-gray-100 text-gray-700'
                                        } border-none text-[8px] font-bold px-1.5 py-0 w-fit`}>
                                            {log.role}
                                        </Badge>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-xs text-gray-700 font-bold">{log.timestamp}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-sm text-gray-700 font-bold">{log.oldValue}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-sm font-bold text-gray-900">{log.newValue}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-xs text-gray-700 font-bold leading-relaxed">{log.reason}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Export Actions */}
            <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-200 text-gray-700 font-bold text-xs gap-2 shadow-sm">
                    Export CSV
                </Button>
                <Button className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-2 shadow-md">
                    Download Report
                </Button>
            </div>
        </div>
    );
}
