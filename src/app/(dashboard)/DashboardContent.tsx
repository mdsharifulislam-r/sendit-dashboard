"use client";

import { 
  Users, 
  Truck, 
  Package, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  XCircle, 
  Bell,
  ArrowRight,
  ShieldCheck,
  Wallet,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export default function DashboardContent() {
  const stats = [
    { label: "Total Users", value: "12,847", icon: Users, color: "text-blue-700", bg: "bg-blue-50" },
    { label: "Active Trips", value: "342", icon: Truck, color: "text-green-700", bg: "bg-green-50" },
    { label: "Active Shipments", value: "1,284", icon: Package, color: "text-purple-700", bg: "bg-purple-50" },
    { label: "Pending Verifications", value: "87", icon: CheckCircle2, color: "text-orange-700", bg: "bg-orange-50" },
    { label: "Open Disputes", value: "23", icon: AlertTriangle, color: "text-orange-700", bg: "bg-orange-50" },
    { label: "Pending Payouts", value: "$48,290", icon: DollarSign, color: "text-green-700", bg: "bg-green-50" },
    { label: "Failed Payments", value: "12", icon: XCircle, color: "text-red-700", bg: "bg-red-50" },
    { label: "System Alerts", value: "5", icon: Bell, color: "text-red-700", bg: "bg-red-50" },
  ];

  const healthMetrics = [
    { label: "Support Queue Size", value: "34 tickets", status: "warning" },
    { label: "KYC Backlog", value: "87 pending", status: "warning" },
    { label: "Withdrawal Backlog", value: "12 pending", status: "success" },
    { label: "Delivery Exceptions", value: "8 cases", status: "success" },
  ];

  const quickActions = [
    { label: "Review KYC", icon: Users, color: "text-blue-700" },
    { label: "Review Withdrawals", icon: Wallet, color: "text-blue-700" },
    { label: "Open Support Tickets", icon: MessageSquare, color: "text-blue-700" },
    { label: "Monitor Risk Alerts", icon: ShieldCheck, color: "text-blue-700" },
  ];

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Operations Overview</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="space-y-1">
              <p className="text-gray-700 text-sm font-bold">{stat.label}</p>
              <h2 className="text-2xl font-bold text-gray-900">{stat.value}</h2>
            </div>
            <button className="text-blue-700 text-xs font-bold flex items-center gap-1 hover:underline">
              View Details <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operation Health */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Operation Health</h3>
          <div className="divide-y divide-gray-50">
            {healthMetrics.map((metric, i) => (
              <div key={i} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                <span className="text-gray-700 text-sm font-bold">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 text-sm font-bold">{metric.value}</span>
                  <div className={`w-2 h-2 rounded-full ${metric.status === 'warning' ? 'bg-orange-500' : 'bg-green-600'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, i) => (
              <button key={i} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                  <span className="text-gray-900 font-bold text-sm">{action.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-blue-700 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
