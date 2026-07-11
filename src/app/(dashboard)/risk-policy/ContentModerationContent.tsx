
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Badge } from "lucide-react";
import ReviewReportedContent from "@/components/dashboard/content/ContentReviewModal";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
    AlertTriangle, 
    Flag, 
    XCircle, 
    Shield, 
    MoreHorizontal,
    Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ModerationPage() {
    const riskStats = [
        { label: "Suspicious Users", count: 12, icon: <AlertTriangle className="w-5 h-5 text-orange-500" />, bg: "bg-white" },
        { label: "Suspicious Shipments", count: 8, icon: <Flag className="w-5 h-5 text-red-500" />, bg: "bg-white" },
        { label: "Failed KYC", count: 23, icon: <XCircle className="w-5 h-5 text-yellow-600" />, bg: "bg-white" },
        { label: "Payment Anomalies", count: 5, icon: <Shield className="w-5 h-5 text-purple-500" />, bg: "bg-white" },
    ];

    const suspiciousUsers = [
        { name: "Emma Williams", id: "USR003", reason: "Multiple failed KYC attempts", status: "Warning" },
        { name: "John Doe", id: "USR129", reason: "Unusual transaction pattern", status: "Warning" },
    ];

    const suspiciousShipments = [
        { route: "Miami → Paris", id: "SHP2843", reason: "High declared value", status: "Warning" },
        { route: "NYC → Dubai", id: "SHP2789", reason: "Restricted item flagged", status: "Warning" },
    ];

    const failedKYC = [
        { name: "Alice Brown", id: "USR234", reason: "Document quality issue", status: "Warning" },
        { name: "Bob Smith", id: "USR567", reason: "Information mismatch", status: "Warning" },
    ];

    const paymentAnomalies = [
        { amount: "$2,500.00", id: "TXN5401", reason: "Unusually high amount", status: "Warning" },
        { amount: "$850.00", id: "TXN5392", reason: "Rapid repeat transactions", status: "Warning" },
    ];

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden block" />
                <h1 className="text-2xl font-bold text-gray-900">Risk Monitoring</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {riskStats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-gray-50">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Risk Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Suspicious Users */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <h2 className="text-lg font-bold text-gray-900">Suspicious Users</h2>
                        <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-none px-2 py-0 text-[10px] font-bold">12 items</Badge>
                    </div>
                    <div className="space-y-4">
                        {suspiciousUsers.map((user, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{user.name}</h3>
                                        <p className="text-xs text-gray-400">{user.id}</p>
                                    </div>
                                    <Badge className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50 border-none px-3 py-1 rounded-full text-[10px] font-bold">Warning</Badge>
                                </div>
                                <p className="text-sm text-gray-500">{user.reason}</p>
                                <div className="flex gap-4 pt-2">
                                    <button className="text-xs font-bold text-blue-600 hover:underline">Review</button>
                                    <button className="text-xs font-bold text-green-600 hover:underline">Clear Risk</button>
                                    <button className="text-xs font-bold text-red-600 hover:underline">Blacklist</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Suspicious Shipments */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Flag className="w-4 h-4 text-red-500" />
                        <h2 className="text-lg font-bold text-gray-900">Suspicious Shipments</h2>
                        <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-none px-2 py-0 text-[10px] font-bold">8 items</Badge>
                    </div>
                    <div className="space-y-4">
                        {suspiciousShipments.map((shipment, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{shipment.route}</h3>
                                        <p className="text-xs text-gray-400">{shipment.id}</p>
                                    </div>
                                    <Badge className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50 border-none px-3 py-1 rounded-full text-[10px] font-bold">Warning</Badge>
                                </div>
                                <p className="text-sm text-gray-500">{shipment.reason}</p>
                                <div className="flex gap-4 pt-2">
                                    <button className="text-xs font-bold text-blue-600 hover:underline">Review</button>
                                    <button className="text-xs font-bold text-green-600 hover:underline">Clear Risk</button>
                                    <button className="text-xs font-bold text-red-600 hover:underline">Blacklist</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Failed KYC */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-yellow-600" />
                        <h2 className="text-lg font-bold text-gray-900">Failed KYC</h2>
                        <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-none px-2 py-0 text-[10px] font-bold">23 items</Badge>
                    </div>
                    <div className="space-y-4">
                        {failedKYC.map((kyc, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{kyc.name}</h3>
                                        <p className="text-xs text-gray-400">{kyc.id}</p>
                                    </div>
                                    <Badge className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50 border-none px-3 py-1 rounded-full text-[10px] font-bold">Warning</Badge>
                                </div>
                                <p className="text-sm text-gray-500">{kyc.reason}</p>
                                <div className="flex gap-4 pt-2">
                                    <button className="text-xs font-bold text-blue-600 hover:underline">Review</button>
                                    <button className="text-xs font-bold text-green-600 hover:underline">Clear Risk</button>
                                    <button className="text-xs font-bold text-red-600 hover:underline">Blacklist</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Anomalies */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-purple-500" />
                        <h2 className="text-lg font-bold text-gray-900">Payment Anomalies</h2>
                        <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-none px-2 py-0 text-[10px] font-bold">5 items</Badge>
                    </div>
                    <div className="space-y-4">
                        {paymentAnomalies.map((payment, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{payment.amount}</h3>
                                        <p className="text-xs text-gray-400">{payment.id}</p>
                                    </div>
                                    <Badge className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50 border-none px-3 py-1 rounded-full text-[10px] font-bold">Warning</Badge>
                                </div>
                                <p className="text-sm text-gray-500">{payment.reason}</p>
                                <div className="flex gap-4 pt-2">
                                    <button className="text-xs font-bold text-blue-600 hover:underline">Review</button>
                                    <button className="text-xs font-bold text-green-600 hover:underline">Clear Risk</button>
                                    <button className="text-xs font-bold text-red-600 hover:underline">Blacklist</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Risk Settings */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-gray-900">Risk Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase">High Value Threshold</Label>
                        <Input defaultValue="1000" className="bg-transparent border-gray-200 rounded-lg h-11" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase">Max Failed KYC Attempts</Label>
                        <Input defaultValue="3" className="bg-transparent border-gray-200 rounded-lg h-11" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase">Auto-Flag Weight Threshold (kg)</Label>
                        <Input defaultValue="20" className="bg-transparent border-gray-200 rounded-lg h-11" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase">Rapid Transaction Window (hours)</Label>
                        <Input defaultValue="24" className="bg-transparent border-gray-200 rounded-lg h-11" />
                    </div>
                </div>
                <Button className="bg-[#0052FF] hover:bg-[#0041CC] text-white rounded-lg px-8 h-11 font-bold">
                    Save Risk Settings
                </Button>
            </div>
        </div>
    );
}
