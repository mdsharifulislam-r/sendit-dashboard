"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const MOCK_TICKETS = [
    {
        id: "TKT1245",
        user: "Sarah Johnson",
        issueType: "Damaged Item",
        priority: "HIGH",
        status: "Pending",
        assignedTo: "Agent A",
        slaTimer: "2h 15m",
    },
    {
        id: "TKT1244",
        user: "Michael Chen",
        issueType: "Payment Issue",
        priority: "MEDIUM",
        status: "Active",
        assignedTo: "Agent B",
        slaTimer: "4h 30m",
    },
    {
        id: "TKT1243",
        user: "Emma Williams",
        issueType: "Non-Delivery",
        priority: "HIGH",
        status: "Pending",
        assignedTo: "Agent A",
        slaTimer: "1h 45m",
    },
    {
        id: "TKT1242",
        user: "James Martinez",
        issueType: "Wrong Weight",
        priority: "LOW",
        status: "Completed",
        assignedTo: "Agent C",
        slaTimer: "Resolved",
    },
];

export default function SupportDisputesContent() {
    return (
        <div className="p-8 space-y-6 bg-[#F8FAFC] min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Support & Disputes</h1>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input 
                            placeholder="Search tickets..." 
                            className="pl-10 h-11 bg-white border-gray-200 focus:ring-blue-500 rounded-lg placeholder:text-gray-500"
                        />
                    </div>
                    <div className="w-24 h-11 border border-gray-200 rounded-lg"></div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#F8FAFC] border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">Ticket ID</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">Issue Type</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">Priority</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">Assigned To</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">SLA Timer</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {MOCK_TICKETS.map((ticket) => (
                            <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold text-gray-900">{ticket.id}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                    {ticket.user}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                    {ticket.issueType}
                                </td>
                                <td className="px-6 py-4">
                                    <Badge className={`
                                        ${ticket.priority === 'HIGH' ? 'bg-red-50 text-red-700' : 
                                          ticket.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-700' : 
                                          'bg-blue-50 text-blue-700'} 
                                        border-none text-[10px] font-bold px-3 py-0.5 rounded-full
                                    `}>
                                        {ticket.priority}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge className={`
                                        ${ticket.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 
                                          ticket.status === 'Active' ? 'bg-green-50 text-green-700' : 
                                          'bg-green-50 text-green-700'} 
                                        border-none text-[10px] font-bold px-3 py-0.5 rounded-full
                                    `}>
                                        {ticket.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                    {ticket.assignedTo}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700 font-bold">
                                    {ticket.slaTimer}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-3">
                                        <button className="text-[11px] font-bold text-[#007AFF] hover:underline uppercase">Refund</button>
                                        <button className="text-[11px] font-bold text-[#FF9500] hover:underline uppercase">Escalate</button>
                                        <Link 
                                            href={`/support-disputes/${ticket.id}`}
                                            className="text-[11px] font-bold text-gray-900 hover:underline uppercase"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-4 gap-4 pt-4">
                <button className="h-14 bg-[#00B67A] text-white rounded-xl font-bold hover:bg-[#00A36D] transition-colors">
                    Refund
                </button>
                <button className="h-14 bg-[#0052FF] text-white rounded-xl font-bold hover:bg-[#0041CC] transition-colors">
                    Partial Refund
                </button>
                <button className="h-14 bg-[#CC8400] text-white rounded-xl font-bold hover:bg-[#B37400] transition-colors">
                    Request Evidence
                </button>
                <button className="h-14 bg-[#FF0000] text-white rounded-xl font-bold hover:bg-[#E60000] transition-colors">
                    Reject Claim
                </button>
            </div>
        </div>
    );
}
