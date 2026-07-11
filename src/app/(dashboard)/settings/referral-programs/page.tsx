import type { Metadata } from "next";
import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { BadgeDollarSign, CircleCheckBig, UserPlus, Pencil, Pause, Copy, MoreVertical, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Referral Program Details",
};

const activities = [
    { referrer: "alex.johnson@email.com", invitee: "mia.davis@email.com", status: "Reward Paid", reward: "$10.00", date: "May 19, 2024 10:34 AM" },
    { referrer: "james.brown@email.com", invitee: "sara.khan@email.com", status: "Pending", reward: "$10.00", date: "May 18, 2024 09:41 AM" },
    { referrer: "linda.martinez@email.com", invitee: "elisa.davis@email.com", status: "Converted", reward: "$10.00", date: "May 18, 2024 06:52 PM" },
    { referrer: "david.lee@email.com", invitee: "ethan.moore@email.com", status: "Expired", reward: "-", date: "May 18, 2024 02:19 PM" },
];

const statusStyle: Record<string, string> = {
    "Reward Paid": "bg-green-100 text-green-700",
    Pending: "bg-amber-100 text-amber-700",
    Converted: "bg-blue-100 text-blue-700",
    Expired: "bg-red-100 text-red-700",
};

export default function ReferralProgramsPage() {
    return (
        <div className="min-h-screen bg-[#F9F9F9] p-8 space-y-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-bold text-gray-500">Settings &gt; Referral Programs &gt; Referral Program Details</p>
                    <h1 className="mt-1 text-3xl font-bold text-gray-900">Referral Program Details</h1>
                </div>
                <Link
                    href="/settings/discount-referral-management"
                    className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                    Back to Management
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                <div className="space-y-5 xl:col-span-9">
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                                    <UserPlus className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl font-bold text-gray-900">Summer Referral Boost</h2>
                                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-bold text-green-700">Active</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-600">Give $10, Get $10 - limited referral campaign for new users.</p>
                                    <p className="mt-1 text-xs font-semibold text-gray-500">Program ID: RP-2024-0007 | Created on: May 31, 2024</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700"><Pencil className="h-4 w-4" />Edit Program</button>
                                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700"><Pause className="h-4 w-4" />Pause Program</button>
                                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700"><Copy className="h-4 w-4" />Duplicate</button>
                                <button className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600"><MoreVertical className="h-4 w-4" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <StatCard icon={UserPlus} label="Total Referrals" value="1,248" change="+18.6%   vs last 30 days" />
                        <StatCard icon={CircleCheckBig} label="Successful Conversions" value="682" change="+22.4%   vs last 30 days" />
                        <StatCard icon={BadgeDollarSign} label="Pending Rewards" value="$2,310.00" change="+12.3%   vs last 30 days" />
                        <StatCard icon={BadgeDollarSign} label="Total Reward Cost" value="$7,940.00" change="+15.7%   vs last 30 days" />
                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <Card title="Program Rules">
                            <InfoRow title="Total Reward" description="$10.00 (Wallet Credit)" />
                            <InfoRow title="Reward Trigger" description="Invited user verifies and completes first shipment." />
                            <InfoRow title="Invite Reward" description="$10.00 (Wallet Credit)" />
                            <InfoRow title="Max Rewards Per User" description="3 successful referrals per user." />
                            <InfoRow title="Eligibility" description="Invitee must be new and complete email verification." />
                        </Card>

                        <Card title="Performance Overview">
                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                                <div className="h-36 rounded-md bg-gradient-to-b from-blue-100 to-white" />
                                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500">Conversion Rate</p>
                                        <p className="text-sm font-bold text-gray-900">54.6%</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500">Rewards Paid</p>
                                        <p className="text-sm font-bold text-gray-900">$7,940.00</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500">Avg. Reward / User</p>
                                        <p className="text-sm font-bold text-gray-900">$11.64</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                            <h3 className="text-base font-bold text-gray-900">Recent Referral Activity</h3>
                            <button className="text-sm font-bold text-blue-600">View All Activity</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[860px]">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Referrer</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Invitee</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Status</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Reward</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Date</th>
                                        <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-600"> </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {activities.map((item) => (
                                        <tr key={`${item.referrer}-${item.invitee}`} className="hover:bg-gray-50/70">
                                            <td className="px-5 py-4 text-sm font-semibold text-gray-800">{item.referrer}</td>
                                            <td className="px-5 py-4 text-sm font-semibold text-gray-800">{item.invitee}</td>
                                            <td className="px-5 py-4">
                                                <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle[item.status]}`}>{item.status}</span>
                                            </td>
                                            <td className="px-5 py-4 text-sm font-bold text-gray-900">{item.reward}</td>
                                            <td className="px-5 py-4 text-xs font-semibold text-gray-600">{item.date}</td>
                                            <td className="px-5 py-4 text-right text-gray-400"><ChevronRight className="ml-auto h-4 w-4" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 xl:col-span-3">
                    <Card title="Program Status">
                        <p className="rounded-full bg-green-100 px-2 py-1 text-[11px] font-bold text-green-700 w-fit">Active</p>
                        <p className="text-sm font-semibold text-gray-600">The program is currently active and accepting referrals.</p>
                        <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700"><Pause className="h-4 w-4" />Pause Program</button>
                    </Card>

                    <Card title="Validity Period">
                        <p className="text-sm font-bold text-gray-800">Start Date</p>
                        <p className="text-sm font-semibold text-gray-600">May 20, 2024 12:00 AM</p>
                        <p className="mt-2 text-sm font-bold text-gray-800">End Date</p>
                        <p className="text-sm font-semibold text-gray-600">Jun 30, 2024 11:59 PM</p>
                        <p className="mt-2 text-xs font-bold text-gray-500">41 days remaining</p>
                    </Card>

                    <Card title="Target Audience">
                        <p className="text-sm font-bold text-gray-800">Eligible Countries</p>
                        <p className="text-sm font-semibold text-gray-600">All Countries</p>
                        <p className="mt-2 text-sm font-bold text-gray-800">User Segment</p>
                        <p className="text-sm font-semibold text-gray-600">New Users</p>
                        <p className="mt-2 text-sm font-bold text-gray-800">Platform</p>
                        <p className="text-sm font-semibold text-gray-600">All Platforms</p>
                    </Card>

                    <Card title="Notes">
                        <p className="text-sm font-semibold text-gray-600">Summer campaign to drive user growth. Promoted via email, in-app banner and social media.</p>
                        <button className="mt-2 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700"><Pencil className="h-4 w-4" />Edit Notes</button>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    icon: Icon,
    label,
    value,
    change,
}: {
    icon: ComponentType<{ className?: string }>;
    label: string;
    value: string;
    change: string;
}) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="mb-2 inline-flex rounded-lg bg-gray-50 p-2 text-blue-600">
                <Icon className="h-4 w-4" />
            </div>
            <p className="text-xs font-bold text-gray-600">{label}</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{value}</p>
            <p className="text-[11px] font-semibold text-emerald-600">{change}</p>
        </div>
    );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-base font-bold text-gray-900">{title}</h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
}

function InfoRow({ title, description }: { title: string; description: string }) {
    return (
        <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
            <p className="text-xs font-bold text-gray-700">{title}</p>
            <p className="text-xs font-semibold text-gray-600">{description}</p>
        </div>
    );
}
