"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, BarChart3, Loader2 } from "lucide-react";
import { useGetAnalyticsQuery } from "@/redux/apiSlices/analyticsSlice";

export default function AnalyticsContent() {
    const { data: analyticsData, isLoading, error } = useGetAnalyticsQuery({});

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#F9F9F9]">
                <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (error || !analyticsData?.data) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#F9F9F9]">
                <p className="text-red-500 font-medium">Failed to load analytics data.</p>
            </div>
        );
    }

    const { kpis, top_routes_by_demand, support_performance, dispute_trends, financial_overview } = analyticsData.data;

    const stats = [
        { 
            label: "Conversion Rate", 
            value: `${kpis.conversion_rate.value}${kpis.conversion_rate.unit}`, 
            trend: `${kpis.conversion_rate.change > 0 ? '+' : ''}${kpis.conversion_rate.change}%`, 
            trendType: kpis.conversion_rate.change >= 0 ? "up" : "down" 
        },
        { 
            label: "Booking Rate", 
            value: `${kpis.booking_rate.value}${kpis.booking_rate.unit}`, 
            trend: `${kpis.booking_rate.change > 0 ? '+' : ''}${kpis.booking_rate.change}%`, 
            trendType: kpis.booking_rate.change >= 0 ? "up" : "down" 
        },
        { 
            label: "Dispute Rate", 
            value: `${kpis.dispute_rate.value}${kpis.dispute_rate.unit}`, 
            trend: `${kpis.dispute_rate.change > 0 ? '+' : ''}${kpis.dispute_rate.change}%`, 
            trendType: kpis.dispute_rate.change >= 0 ? "up" : "down" 
        },
        { 
            label: "KYC Approval Rate", 
            value: `${kpis.kyc_approval_rate.value}${kpis.kyc_approval_rate.unit}`, 
            trend: `${kpis.kyc_approval_rate.change > 0 ? '+' : ''}${kpis.kyc_approval_rate.change}%`, 
            trendType: kpis.kyc_approval_rate.change >= 0 ? "up" : "down" 
        },
        { 
            label: "Avg Payout Time", 
            value: `${kpis.avg_payout_time.value} ${kpis.avg_payout_time.unit}`, 
            trend: `${kpis.avg_payout_time.change > 0 ? '+' : ''}${kpis.avg_payout_time.change} days`, 
            trendType: kpis.avg_payout_time.change >= 0 ? "up" : "down" 
        },
        { 
            label: "Customer Satisfaction", 
            value: `${kpis.customer_satisfaction.value}/${kpis.customer_satisfaction.max}`, 
            trend: `${kpis.customer_satisfaction.change > 0 ? '+' : ''}${kpis.customer_satisfaction.change}`, 
            trendType: kpis.customer_satisfaction.change >= 0 ? "up" : "down" 
        },
    ];

    const maxBookings = Math.max(...(top_routes_by_demand?.map((r: any) => r.bookings) || [1]));

    const supportPerformance = [
        { 
            label: "Average Response Time", 
            value: `${support_performance.avg_response_time.value} ${support_performance.avg_response_time.unit}`, 
            progress: 100, // could calculate a real percentage based on a max goal if provided
            color: "bg-[#22C55E]" 
        },
        { 
            label: "First Contact Resolution", 
            value: `${support_performance.first_contact_resolution.value}${support_performance.first_contact_resolution.unit}`, 
            progress: support_performance.first_contact_resolution.value, 
            color: "bg-[#2563EB]" 
        },
        { 
            label: "Tickets Resolved", 
            value: `${support_performance.tickets_resolved.resolved} / ${support_performance.tickets_resolved.total}`, 
            progress: support_performance.tickets_resolved.total > 0 ? (support_performance.tickets_resolved.resolved / support_performance.tickets_resolved.total) * 100 : 0, 
            color: "bg-[#9333EA]" 
        },
    ];

    const totalDisputes = dispute_trends.reduce((acc: number, item: any) => acc + item.count, 0) || 1;
    const mappedDisputeTrends = dispute_trends.map((item: any) => ({
        label: item.reason,
        cases: item.count,
        progress: (item.count / totalDisputes) * 100,
        color: "bg-[#EA580C]"
    }));

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
                            {top_routes_by_demand?.map((item: any, i: number) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-gray-900 truncate max-w-[70%] mr-2" title={item.route}>{item.route}</span>
                                        <span className="text-gray-700 font-bold whitespace-nowrap">{item.bookings} bookings</span>
                                    </div>
                                    <Progress value={(item.bookings / maxBookings) * 100} className="h-2 bg-gray-100" indicatorClassName="bg-blue-700" />
                                    <p className="text-xs text-gray-700 font-bold">Revenue: ${item.revenue.toLocaleString()}</p>
                                </div>
                            ))}
                            {(!top_routes_by_demand || top_routes_by_demand.length === 0) && (
                                <p className="text-sm text-gray-500">No route data available.</p>
                            )}
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
                            {mappedDisputeTrends.map((item: any, i: number) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-gray-900">{item.label}</span>
                                        <span className="text-gray-700 font-bold">{item.cases} cases</span>
                                    </div>
                                    <Progress value={item.progress} className="h-1.5 bg-gray-100" indicatorClassName={item.color} />
                                </div>
                            ))}
                            {mappedDisputeTrends.length === 0 && (
                                <p className="text-sm text-gray-500">No dispute data available.</p>
                            )}
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
                                    <p className="text-2xl font-bold text-gray-900">${financial_overview.total_revenue.toLocaleString()}</p>
                                </div>
                                <div className="p-2 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-green-700" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-700 font-bold">Commission Earned</p>
                                    <p className="text-2xl font-bold text-gray-900">${financial_overview.commission_earned.toLocaleString()}</p>
                                </div>
                                <div className="p-2 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-blue-700" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-700 font-bold">Total Payouts</p>
                                    <p className="text-2xl font-bold text-gray-900">${financial_overview.total_payouts.toLocaleString()}</p>
                                </div>
                                <div className="p-2 rounded-lg">
                                    <BarChart3 className="w-6 h-6 text-purple-700" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Export Reports
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900">Export Reports</h2>
                <div className="flex flex-wrap gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">Export as CSV</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-6">Export as PDF</Button>
                    <Button variant="outline" className="border-gray-200 text-gray-700 px-6 font-bold">Schedule Report</Button>
                </div>
            </div>
            */}
        </div>
    );
}
