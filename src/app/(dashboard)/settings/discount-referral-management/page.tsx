import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Users, Ticket, RotateCcw, DollarSign, Search, ChevronRight, Filter, Eye, MoreVertical } from "lucide-react";

export const metadata: Metadata = {
    title: "Discount & Referral Management",
};

const codes = [
    { name: "SUMMER15", slug: "SUMMER15", type: "Discount Code", benefit: "15% OFF", usage: "284 / 1,000", trend: "28% used", status: "Active", validity: "May 20, 2024 - Jun 20, 2024" },
    { name: "WELCOME10", slug: "WELCOME10", type: "Discount Code", benefit: "$10 OFF", usage: "451 / 2,000", trend: "22% used", status: "Active", validity: "May 15, 2024 - Jun 15, 2024" },
    { name: "REFERR5", slug: "REFERR5", type: "Referral Code", benefit: "$5 Store Credit", usage: "642 referrals", trend: "High adoption", status: "Active", validity: "Apr 10, 2024 - No Expiry" },
    { name: "SPRINGSALE", slug: "SPRINGSALE", type: "Discount Code", benefit: "25% OFF", usage: "1,205 / 3,000", trend: "40% used", status: "Expired", validity: "Mar 1, 2024 - Apr 30, 2024" },
];

const statusClass: Record<string, string> = {
    Active: "bg-green-50 text-green-700",
    Expired: "bg-red-50 text-red-700",
};

export default function DiscountReferralManagementPage() {
    return (
        <div className="min-h-screen bg-[#F9F9F9] p-8 space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Discount & Referral Management</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/settings/discount-codes" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
                        <Plus className="h-4 w-4" />
                        Create Discount Code
                    </Link>
                    <Link href="/settings/referral-programs" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
                        <Users className="h-4 w-4" />
                        View Referral Programs
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: "Active Discount Codes", value: "24", icon: Ticket },
                    { label: "Active Referral Programs", value: "6", icon: Users },
                    { label: "Total Redemptions", value: "1,842", icon: RotateCcw },
                    { label: "Revenue Impact", value: "$12,540.80", icon: DollarSign },
                ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="mb-3 inline-flex rounded-lg bg-gray-50 p-2 text-blue-600">
                            <item.icon className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-bold text-gray-600">{item.label}</p>
                        <p className="mt-1 text-3xl font-bold text-gray-900">{item.value}</p>
                        <p className="mt-1 text-[11px] font-semibold text-emerald-600">+ 12% vs last 30 days</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm xl:col-span-9">
                    <div className="border-b border-gray-100 px-5 pt-4">
                        <div className="flex items-center gap-5 text-sm font-bold text-gray-500">
                            <Link href="/settings/discount-referral-management" className="border-b-2 border-blue-600 pb-3 text-blue-700">All Codes</Link>
                            <Link href="/settings/discount-codes" className="pb-3 hover:text-gray-800">Discount Codes</Link>
                            <Link href="/settings/referral-programs" className="pb-3 hover:text-gray-800">Referral Codes</Link>
                            <button className="pb-3">Archived</button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 px-5 py-3">
                        <div className="relative min-w-[220px] flex-1">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by code name or code..."
                                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm font-semibold outline-none focus:border-blue-400"
                            />
                        </div>
                        <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700">
                            <option>All Types</option>
                        </select>
                        <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700">
                            <option>All Statuses</option>
                        </select>
                        <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700">
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead className="bg-gray-50/70">
                                <tr>
                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Code Name</th>
                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Type</th>
                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Reward / Discount</th>
                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Usage</th>
                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Status</th>
                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Validity</th>
                                    <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {codes.map((code) => (
                                    <tr key={code.name} className="hover:bg-gray-50/70">
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-bold text-gray-900">{code.name}</p>
                                            <p className="text-xs font-semibold text-gray-500">{code.slug}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">{code.type}</span>
                                        </td>
                                        <td className="px-5 py-4 text-sm font-bold text-gray-800">{code.benefit}</td>
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-bold text-gray-800">{code.usage}</p>
                                            <p className="text-xs font-semibold text-blue-600">{code.trend}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[code.status]}`}>{code.status}</span>
                                        </td>
                                        <td className="px-5 py-4 text-xs font-semibold text-gray-600">{code.validity}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={code.type === "Referral Code" ? "/settings/referral-programs" : "/settings/discount-codes"}
                                                    className="rounded-md border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Link>
                                                <button className="rounded-md border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50"><MoreVertical className="h-3.5 w-3.5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-4 xl:col-span-3">
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900">Insights</h3>
                        <div className="mt-4 space-y-4">
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-gray-500">Top Performing Codes</p>
                                <div className="flex items-center justify-between text-sm font-bold text-gray-800">
                                    <span>SPRINGSALE</span>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </div>
                                <div className="flex items-center justify-between text-sm font-bold text-gray-800">
                                    <span>FREESHIP</span>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </div>
                                <div className="flex items-center justify-between text-sm font-bold text-gray-800">
                                    <span>REFERR5</span>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <p className="text-xs font-bold text-gray-500">Redemption Overview</p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">1,842</p>
                                <p className="text-xs font-semibold text-gray-600">Total redemptions</p>
                            </div>
                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <p className="text-xs font-bold text-gray-500">Revenue Impact (30 Days)</p>
                                <p className="mt-1 text-xl font-bold text-gray-900">$12,540.80</p>
                                <p className="text-xs font-semibold text-emerald-600">+22% vs last 30 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
