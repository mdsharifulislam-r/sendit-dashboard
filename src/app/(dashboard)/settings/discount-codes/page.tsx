import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Sparkles, Users, Truck, Car, Percent } from "lucide-react";

export const metadata: Metadata = {
    title: "Create Discount Code",
};

export default function DiscountCodesPage() {
    return (
        <div className="min-h-screen bg-[#F9F9F9] p-8 space-y-5">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Discount Code</h1>
                    <p className="text-sm font-semibold text-gray-600">Create and configure discount or referral code for your users.</p>
                </div>
                <Link href="/settings/discount-referral-management" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Discount Codes
                </Link>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-3 gap-4 text-sm">
                    <Step active number="1" title="Code Details" subtitle="Configure the basic information" />
                    <Step number="2" title="Rules & Restrictions" subtitle="Set usage limits and rules" />
                    <Step number="3" title="Review & Publish" subtitle="Review and activate your code" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                <div className="space-y-5 xl:col-span-7">
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <h2 className="mb-4 text-base font-bold text-gray-900">Basic Information</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Field label="Campaign Name *" placeholder="e.g Summer Sale 2025" />
                            <Field label="Code *" placeholder="e.g SUMMER25" rightAction />
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700"><Percent className="h-4 w-4" />Discount</button>
                            <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-600"><Users className="h-4 w-4" />Referral</button>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Field label="Discount Type *" placeholder="Percentage" />
                            <Field label="Minimum Order (Optional)" placeholder="$ 0.00" />
                            <Field label="Discount Value *" placeholder="15" suffix="%" />
                        </div>

                        <div className="mt-4">
                            <p className="text-sm font-bold text-gray-700">Applicable To *</p>
                            <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                                <Pill active icon={<Users className="h-4 w-4" />} label="All Users" />
                                <Pill icon={<Users className="h-4 w-4" />} label="New Users" />
                                <Pill icon={<Truck className="h-4 w-4" />} label="Travelers" />
                                <Pill icon={<Car className="h-4 w-4" />} label="Transporters" />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Field label="Start Date *" placeholder="Jun 4, 2025 12:00 AM" icon={<Calendar className="h-4 w-4 text-gray-400" />} />
                            <Field label="End Date" placeholder="Jun 18, 2025 11:59 PM" icon={<Calendar className="h-4 w-4 text-gray-400" />} />
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Field label="Referrer Reward (Referral Only)" placeholder="$ 0.00" />
                            <Field label="Referee Reward (Optional)" placeholder="$ 0.00" />
                        </div>
                    </div>
                </div>

                <div className="space-y-5 xl:col-span-3">
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <h2 className="mb-4 text-base font-bold text-gray-900">Additional Options</h2>
                        <div className="space-y-4">
                            {["First order only", "Single-use per user", "Stackable with other offers", "Auto-expire"].map((item, index) => (
                                <div key={item} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{item}</p>
                                        <p className="text-xs font-semibold text-gray-500">Optional campaign setting</p>
                                    </div>
                                    <button className={`h-5 w-9 rounded-full ${index === 3 ? "bg-blue-600" : "bg-gray-200"}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <h2 className="mb-4 text-base font-bold text-gray-900">Status</h2>
                        <div className="space-y-3">
                            {["Draft", "Active", "Inactive"].map((state, index) => (
                                <label key={state} className="flex items-start gap-3 rounded-lg border border-gray-100 p-3">
                                    <span className={`mt-0.5 h-4 w-4 rounded-full border ${index === 0 ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"}`} />
                                    <span>
                                        <p className="text-sm font-bold text-gray-800">{state}</p>
                                        <p className="text-xs font-semibold text-gray-500">Save as {state.toLowerCase()} setting</p>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-5 xl:col-span-2">
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-base font-bold text-gray-900">Code Preview</h2>
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">Live Preview</span>
                        </div>
                        <div className="space-y-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                            <p className="text-xl font-bold text-gray-900">SUMMER25</p>
                            <p className="inline-flex rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">15% OFF</p>
                            <p className="text-sm font-semibold text-gray-700">All Users</p>
                            <ul className="space-y-1 text-xs font-semibold text-gray-600">
                                <li>Minimum Order: No minimum</li>
                                <li>Valid Until: Jun 18, 2025 11:59 PM</li>
                                <li>Single-use per User: No</li>
                            </ul>
                            <p className="rounded-lg border border-blue-200 bg-white p-2 text-[11px] font-semibold text-blue-700">
                                This is a preview of how the code appears to users.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4">
                <button className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50">Save Draft</button>
                <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
                    <Sparkles className="h-4 w-4" />
                    Publish Code
                </button>
            </div>
        </div>
    );
}

function Field({
    label,
    placeholder,
    rightAction = false,
    suffix,
    icon,
}: {
    label: string;
    placeholder: string;
    rightAction?: boolean;
    suffix?: string;
    icon?: ReactNode;
}) {
    return (
        <label className="space-y-2">
            <span className="text-sm font-bold text-gray-700">{label}</span>
            <div className="relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-800 outline-none transition focus:border-blue-400"
                />
                {rightAction ? (
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600">Generate</button>
                ) : null}
                {suffix ? <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">{suffix}</span> : null}
                {icon ? <span className="absolute right-3 top-1/2 -translate-y-1/2">{icon}</span> : null}
            </div>
        </label>
    );
}

function Step({ number, title, subtitle, active = false }: { number: string; title: string; subtitle: string; active?: boolean }) {
    return (
        <div className="flex items-start gap-3 rounded-lg p-2">
            <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>{number}</span>
            <span>
                <p className={`text-sm font-bold ${active ? "text-blue-700" : "text-gray-700"}`}>{title}</p>
                <p className="text-xs font-semibold text-gray-500">{subtitle}</p>
            </span>
        </div>
    );
}

function Pill({ label, icon, active = false }: { label: string; icon: ReactNode; active?: boolean }) {
    return (
        <button className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-bold ${active ? "border-blue-200 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-600"}`}>
            {icon}
            {label}
        </button>
    );
}
