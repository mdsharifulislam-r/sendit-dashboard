import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChartColumnIncreasing, CircleDot, Percent, Users } from "lucide-react";

export const metadata: Metadata = {
    title: "Code Usage Insights",
};

const usageRows = [
    { code: "SUMMER15", type: "Discount", redemptions: "284", conversion: "22.6%", revenue: "$3,920.00" },
    { code: "WELCOME10", type: "Discount", redemptions: "451", conversion: "31.4%", revenue: "$5,810.00" },
    { code: "REFERR5", type: "Referral", redemptions: "642", conversion: "54.6%", revenue: "$2,810.00" },
];

export default function CodeUsagePage() {
    return (
        <div className="min-h-screen bg-[#F9F9F9] p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Code Usage Insights</h1>
                    <p className="text-sm font-semibold text-gray-600">Monitor code performance and redemption behavior.</p>
                </div>
                <Link href="/settings/discount-referral-management" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <InsightCard icon={ChartColumnIncreasing} label="Total Redemptions" value="1,842" />
                <InsightCard icon={Users} label="Unique Users" value="1,188" />
                <InsightCard icon={Percent} label="Avg Conversion Rate" value="36.2%" />
                <InsightCard icon={CircleDot} label="Active Campaigns" value="29" />
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-6 py-4">
                    <h2 className="text-lg font-bold text-gray-900">Top Performing Codes</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Code</th>
                                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Type</th>
                                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Redemptions</th>
                                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Conversion Rate</th>
                                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">Revenue Impact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {usageRows.map((row) => (
                                <tr key={row.code} className="hover:bg-gray-50/70">
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{row.code}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">{row.type}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">{row.redemptions}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">{row.conversion}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{row.revenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function InsightCard({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-blue-50 p-2 text-blue-600">
                <Icon className="h-4 w-4" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-600">{label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
}
