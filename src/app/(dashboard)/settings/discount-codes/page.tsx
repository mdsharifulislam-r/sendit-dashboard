"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    Calendar,
    Sparkles,
    Users,
    Tag,
    Clock,
    RefreshCw,
    CheckCircle2
} from "lucide-react";
import {
    useCreateCouponMutation,
    useUpdateCouponMutation,
    useGetSingleCouponQuery,
    CreateCouponPayload
} from "@/redux/apiSlices/couponSlice";
import { toast } from "sonner";
import { useErrorToast } from "@/hooks/useErrorToast";
import { Button } from "@/components/ui/button";

export default function DiscountCodesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id");
    const isEditMode = Boolean(editId);

    const showError = useErrorToast();

    // Fetch existing coupon details if in Edit mode
    const { data: singleCouponResponse, isLoading: isLoadingSingle } = useGetSingleCouponQuery(
        editId!,
        { skip: !editId }
    );

    // Form states matching GET/POST/PATCH /coupon schema
    const [type, setType] = useState<"Coupon" | "Referral">("Coupon");
    const [name, setName] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [couponType, setCouponType] = useState<"percentage" | "fixed">("percentage");
    const [discountPercentage, setDiscountPercentage] = useState<string>("15");
    const [discountAmount, setDiscountAmount] = useState<string>("10");
    const [referrerAmount, setReferrerAmount] = useState<string>("10");
    const [refereeAmount, setRefereeAmount] = useState<string>("5");
    const [startDate, setStartDate] = useState<string>("");
    const [expiryDate, setExpiryDate] = useState<string>("");
    const [maxUsage, setMaxUsage] = useState<string>("100");

    const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
    const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();
    const isSubmitting = isCreating || isUpdating;

    // Populate form data when editing existing coupon
    useEffect(() => {
        if (singleCouponResponse?.data) {
            const item = singleCouponResponse.data;
            if (item.name) setName(item.name);
            if (item.code) setCode(item.code);

            const isRef = item.type?.toLowerCase().includes("referral") || Boolean(item.refferar_amount);
            setType(isRef ? "Referral" : "Coupon");

            const isFixed = item.coupon_type === "fixed" || Boolean(item.discount_amount && item.discount_amount > 0);
            setCouponType(isFixed ? "fixed" : "percentage");

            if (item.discount_percentage !== undefined) setDiscountPercentage(String(item.discount_percentage));
            if (item.discount_amount !== undefined) setDiscountAmount(String(item.discount_amount));
            if (item.refferar_amount !== undefined) setReferrerAmount(String(item.refferar_amount));
            if (item.reffree_amount !== undefined) setRefereeAmount(String(item.reffree_amount));
            if (item.max_usage !== undefined) setMaxUsage(String(item.max_usage));

            if (item.startDate) {
                setStartDate(item.startDate.split("T")[0]);
            }
            if (item.expiry_date) {
                setExpiryDate(item.expiry_date.split("T")[0]);
            }
        }
    }, [singleCouponResponse]);

    // Random code generator helper
    const handleGenerateCode = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCode(result);
    };

    // Submit handler (handles both Create and Edit)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter a campaign name");
            return;
        }

        if (!code.trim()) {
            toast.error("Please enter or generate a code");
            return;
        }

        const payload: CreateCouponPayload = {
            code: code.trim(),
            name: name.trim(),
            type,
            coupon_type: couponType,
            ...(couponType === "percentage"
                ? { discount_percentage: Number(discountPercentage) || 0 }
                : { discount_amount: Number(discountAmount) || 0 }),
            ...(startDate ? { startDate } : {}),
            ...(expiryDate ? { expiry_date: expiryDate } : {}),
            ...(maxUsage ? { max_usage: Number(maxUsage) || 0 } : {}),
            ...(type === "Referral"
                ? {
                      refferar_amount: Number(referrerAmount) || 0,
                      reffree_amount: Number(refereeAmount) || 0,
                  }
                : {}),
        };

        try {
            if (isEditMode && editId) {
                const res = await updateCoupon({ id: editId, body: payload }).unwrap();
                toast.success(res?.message || "Coupon updated successfully!");
            } else {
                const res = await createCoupon(payload).unwrap();
                toast.success(res?.message || "Coupon code published successfully!");
            }
            router.push("/settings/discount-referral-management");
        } catch (error) {
            showError(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F9F9] p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        {isEditMode ? "Edit Discount / Referral Code" : "Create Discount / Referral Code"}
                    </h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                        {isEditMode
                            ? `Updating parameters for coupon ID: ${editId}`
                            : "Configure promotional discount codes and referral campaigns for your users."}
                    </p>
                </div>
                <Link
                    href="/settings/discount-referral-management"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shrink-0"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Management
                </Link>
            </div>

            {isLoadingSingle ? (
                <div className="h-96 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-gray-100 p-8 space-y-3">
                    <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-sm font-bold text-gray-800">Loading coupon details...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                    {/* Main Configuration Form */}
                    <div className="space-y-6 xl:col-span-8">
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
                            {/* Campaign Category Switch */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Campaign Category *
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setType("Coupon")}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-bold transition-all ${
                                            type === "Coupon"
                                                ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/10"
                                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                        }`}
                                    >
                                        <Tag className="w-4 h-4" />
                                        <span>Discount Coupon</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setType("Referral")}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-bold transition-all ${
                                            type === "Referral"
                                                ? "border-purple-600 bg-purple-50 text-purple-700 ring-2 ring-purple-500/10"
                                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                        }`}
                                    >
                                        <Users className="w-4 h-4" />
                                        <span>Referral Program</span>
                                    </button>
                                </div>
                            </div>

                            {/* Basic Information */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Campaign Name *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Summer Sale 2026"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue-500 transition-all placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Coupon Code *</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. SUMMER50"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                                            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-3.5 pr-24 text-sm font-mono font-bold text-gray-900 outline-none focus:border-blue-500 transition-all placeholder:text-gray-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleGenerateCode}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-100 transition-colors"
                                        >
                                            Generate
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Discount Configuration */}
                            <div className="space-y-4 pt-2 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900">Discount Configuration</h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Discount Type *</label>
                                        <select
                                            value={couponType}
                                            onChange={(e) => setCouponType(e.target.value as "percentage" | "fixed")}
                                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm font-semibold text-gray-800 outline-none focus:border-blue-500 cursor-pointer"
                                        >
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="fixed">Fixed Amount ($)</option>
                                        </select>
                                    </div>

                                    {couponType === "percentage" ? (
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Discount Percentage *</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    required
                                                    placeholder="50"
                                                    value={discountPercentage}
                                                    onChange={(e) => setDiscountPercentage(e.target.value)}
                                                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-3.5 pr-8 text-sm font-bold text-gray-900 outline-none focus:border-blue-500"
                                                />
                                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">%</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Discount Amount *</label>
                                            <div className="relative">
                                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">$</span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    required
                                                    placeholder="500"
                                                    value={discountAmount}
                                                    onChange={(e) => setDiscountAmount(e.target.value)}
                                                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-8 pr-3.5 text-sm font-bold text-gray-900 outline-none focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Referral Rewards (Visible when Referral mode selected) */}
                            {type === "Referral" && (
                                <div className="space-y-4 pt-4 border-t border-gray-100 bg-purple-50/40 p-4 rounded-xl">
                                    <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-purple-600" />
                                        Referral Program Rewards
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Referrer Bonus Amount ($)</label>
                                            <div className="relative">
                                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">$</span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    placeholder="10"
                                                    value={referrerAmount}
                                                    onChange={(e) => setReferrerAmount(e.target.value)}
                                                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-8 pr-3.5 text-sm font-bold text-gray-900 outline-none focus:border-purple-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Referee Bonus Amount ($)</label>
                                            <div className="relative">
                                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">$</span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    placeholder="5"
                                                    value={refereeAmount}
                                                    onChange={(e) => setRefereeAmount(e.target.value)}
                                                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-8 pr-3.5 text-sm font-bold text-gray-900 outline-none focus:border-purple-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Limits & Validity Dates */}
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900">Limits & Validity Dates</h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Max Usage Limit</label>
                                        <input
                                            type="number"
                                            min="1"
                                            placeholder="e.g. 10"
                                            value={maxUsage}
                                            onChange={(e) => setMaxUsage(e.target.value)}
                                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm font-bold text-gray-900 outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Start Date</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm font-semibold text-gray-800 outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Expiry Date</label>
                                        <input
                                            type="date"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm font-semibold text-gray-800 outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push("/settings/discount-referral-management")}
                                    className="h-11 px-5 rounded-xl border-gray-200 font-bold text-gray-700"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="h-11 px-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            <span>{isEditMode ? "Updating..." : "Publishing..."}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" />
                                            <span>{isEditMode ? "Update Code" : "Publish Code"}</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Live Preview Card */}
                    <div className="space-y-6 xl:col-span-4">
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4 sticky top-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-bold text-gray-900">Live Code Preview</h2>
                                <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5">
                                    Realtime Preview
                                </span>
                            </div>

                            <div className="space-y-4 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 p-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{type} Code</span>
                                    <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border border-blue-200 text-blue-700">
                                        {code || "YOURCODE"}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {name || "Campaign Title"}
                                    </h3>
                                    <div className="mt-2">
                                        <span className="inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                                            {couponType === "percentage"
                                                ? `${discountPercentage || 0}% OFF`
                                                : `$${discountAmount || 0} OFF`}
                                        </span>
                                    </div>
                                </div>

                                {type === "Referral" && (
                                    <div className="p-3 bg-white/80 rounded-xl border border-purple-100 text-xs space-y-1">
                                        <p className="font-bold text-purple-900">Referral Program Rewards</p>
                                        <p className="text-purple-700">Referrer: <strong>${referrerAmount || 0}</strong></p>
                                        <p className="text-purple-700">Referee: <strong>${refereeAmount || 0}</strong></p>
                                    </div>
                                )}

                                <ul className="space-y-1.5 text-xs font-medium text-gray-600 pt-2 border-t border-blue-100">
                                    <li className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                                        <span>Max Usage: <strong>{maxUsage || "Unlimited"}</strong></span>
                                    </li>
                                    {startDate && (
                                        <li className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                            <span>Starts: <strong>{startDate}</strong></span>
                                        </li>
                                    )}
                                    {expiryDate && (
                                        <li className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                            <span>Expires: <strong>{expiryDate}</strong></span>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-500 leading-relaxed font-medium">
                                {isEditMode
                                    ? "Editing existing coupon values. Clicking Update Code will update the database."
                                    : "This card provides an exact preview of how the code and discount conditions will be applied upon publication."}
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
