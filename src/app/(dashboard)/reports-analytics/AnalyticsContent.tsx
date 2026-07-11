"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, BarChart3 } from "lucide-react";

export default function AnalyticsContent() {
    const stats = [
        { label: "Conversion Rate", value: "68.5%", trend: "+5.2%", trendType: "up" },
        { label: "Booking Rate", value: "42.8%", trend: "+3.1%", trendType: "up" },
        { label: "Dispute Rate", value: "2.4%", trend: "-0.8%", trendType: "down" },
        { label: "KYC Approval Rate", value: "89.2%", trend: "+2.5%", trendType: "up" },
        { label: "Avg Payout Time", value: "1.8 days", trend: "-0.3 days", trendType: "down" },
        { label: "Customer Satisfaction", value: "4.6/5", trend: "+0.2", trendType: "up" },
    ];

    const routes = [
        { route: "NYC → London", bookings: 342, revenue: "$45,890", progress: 85 },
        { route: "LA → Tokyo", bookings: 289, revenue: "$38,720", progress: 70 },
        { route: "Miami → Paris", bookings: 234, revenue: "$31,560", progress: 60 },
        { route: "Boston → Berlin", bookings: 198, revenue: "$26,730", progress: 50 },
        { route: "Seattle → Sydney", bookings: 167, revenue: "$22,495", progress: 40 },
    ];

    const supportPerformance = [
        { label: "Average Response Time", value: "2.5 hrs", progress: 40, color: "bg-[#22C55E]" },
        { label: "First Contact Resolution", value: "78%", progress: 78, color: "bg-[#2563EB]" },
        { label: "Tickets Resolved", value: "1,245 / 1,342", progress: 92, color: "bg-[#9333EA]" },
    ];

    const disputeTrends = [
        { label: "Damaged Item", cases: 12, progress: 70, color: "bg-[#EA580C]" },
        { label: "Non-Delivery", cases: 8, progress: 45, color: "bg-[#EA580C]" },
        { label: "Wrong Weight", cases: 6, progress: 35, color: "bg-[#EA580C]" },
        { label: "Payment Issue", cases: 4, progress: 20, color: "bg-[#EA580C]" },
    ];

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden block" />
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border border-gray-100 shadow-sm rounded-xl">
                        <CardContent className="p-6">
                            <div className="mb-2">
                                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">{stat.label}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                                <span className={`text-[10px] font-bold ${stat.trendType === 'up' ? 'text-green-700' : 'text-red-700'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Routes by Demand */}
                <Card className="border-none shadow-sm rounded-xl">
                    <CardContent className="p-6 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900">Top Routes by Demand</h2>
                        <div className="space-y-6">
                            {routes.map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-gray-900">{item.route}</span>
                                        <span className="text-gray-700 font-bold">{item.bookings} bookings</span>
                                    </div>
                                    <Progress value={item.progress} className="h-2 bg-gray-100" indicatorClassName="bg-blue-700" />
                                    <p className="text-xs text-gray-700 font-bold">Revenue: {item.revenue}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Support Performance */}
                <Card className="border-none shadow-sm rounded-xl">
                    <CardContent className="p-6 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900">Support Performance</h2>
                        <div className="space-y-8">
                            {supportPerformance.map((item, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700 font-bold">{item.label}</span>
                                        <span className="font-bold text-gray-900">{item.value}</span>
                                    </div>
                                    <Progress value={item.progress} className="h-2 bg-gray-100" indicatorClassName={item.color} />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Dispute Trends */}
                <Card className="border-none shadow-sm rounded-xl">
                    <CardContent className="p-6 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900">Dispute Trends</h2>
                        <div className="space-y-6">
                            {disputeTrends.map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-gray-900">{item.label}</span>
                                        <span className="text-gray-700 font-bold">{item.cases} cases</span>
                                    </div>
                                    <Progress value={item.progress} className="h-1.5 bg-gray-100" indicatorClassName={item.color} />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Overview */}
                <Card className="border-none shadow-sm rounded-xl">
                    <CardContent className="p-6 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900">Financial Overview</h2>
                        <div className="space-y-8">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-700 font-bold">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-900">$248,560</p>
                                </div>
                                <div className="p-2 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-green-700" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-700 font-bold">Commission Earned</p>
                                    <p className="text-2xl font-bold text-gray-900">$37,284</p>
                                </div>
                                <div className="p-2 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-blue-700" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-700 font-bold">Total Payouts</p>
                                    <p className="text-2xl font-bold text-gray-900">$211,276</p>
                                </div>
                                <div className="p-2 rounded-lg">
                                    <BarChart3 className="w-6 h-6 text-purple-700" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Export Reports */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900">Export Reports</h2>
                <div className="flex flex-wrap gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">Export as CSV</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-6">Export as PDF</Button>
                    <Button variant="outline" className="border-gray-200 text-gray-700 px-6 font-bold">Schedule Report</Button>
                </div>
            </div>
        </div>
    );
}
