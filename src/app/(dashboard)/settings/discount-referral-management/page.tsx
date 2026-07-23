"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Plus,
    Users,
    Search,
    Filter,
    Eye,
    Pencil,
    Trash2,
    RefreshCw,
    Tag,
    Clock,
    CheckCircle2,
    XCircle,
    Calendar,
    Award,
    AlertTriangle
} from "lucide-react";
import {
    useGetCouponsQuery,
    useDeleteCouponMutation,
    CouponItem
} from "@/redux/apiSlices/couponSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useErrorToast } from "@/hooks/useErrorToast";

export default function DiscountReferralManagementPage() {
    const router = useRouter();
    const showError = useErrorToast();

    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [typeFilter, setTypeFilter] = useState<string>("ALL");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    
    const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(null);
    const [deletingCoupon, setDeletingCoupon] = useState<CouponItem | null>(null);

    // Fetch coupons from GET /coupon API
    const {
        data: couponsResponse,
        isLoading,
        isFetching,
        refetch,
    } = useGetCouponsQuery({
        page,
        limit,
    });

    const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

    const coupons: CouponItem[] = couponsResponse?.data || [];
    const pagination = couponsResponse?.pagination;
    const totalCount = pagination?.total || coupons.length;
    const totalPage = pagination?.totalPage || 1;

    // Filter coupons based on search and selected type/status
    const filteredCoupons = useMemo(() => {
        return coupons.filter((item) => {
            // Type filter
            const itemType = (item.type || (item.refferar_amount ? "Referral" : "Discount")).toLowerCase();
            if (typeFilter === "DISCOUNT" && itemType.includes("referral")) return false;
            if (typeFilter === "REFERRAL" && !itemType.includes("referral")) return false;

            // Status filter (Active vs Expired)
            const isExpired = item.expiry_date && new Date(item.expiry_date) < new Date();
            if (statusFilter === "ACTIVE" && isExpired) return false;
            if (statusFilter === "EXPIRED" && !isExpired) return false;

            // Search query filter
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const matchesCode = item.code?.toLowerCase().includes(q);
                const matchesName = item.name?.toLowerCase().includes(q);
                const matchesStripe = item.stripe_coupon_code?.toLowerCase().includes(q);
                return matchesCode || matchesName || matchesStripe;
            }

            return true;
        });
    }, [coupons, typeFilter, statusFilter, searchQuery]);

    // Handle Delete Coupon API call
    const handleDeleteCoupon = async () => {
        if (!deletingCoupon) return;
        try {
            const res = await deleteCoupon(deletingCoupon._id).unwrap();
            toast.success(res?.message || `Coupon "${deletingCoupon.code}" deleted successfully!`);
            setDeletingCoupon(null);
            refetch();
        } catch (error) {
            showError(error);
        }
    };

    // Helper for formatting reward/discount
    const getDiscountDisplay = (item: CouponItem) => {
        if (item.refferar_amount || item.reffree_amount) {
            return `$${item.refferar_amount || 0} Referrer / $${item.reffree_amount || 0} Referee`;
        }
        if (item.coupon_type === "percentage" || (item.discount_percentage && item.discount_percentage > 0)) {
            return `${item.discount_percentage}% OFF`;
        }
        if (item.discount_amount && item.discount_amount > 0) {
            return `$${item.discount_amount.toFixed(2)} OFF`;
        }
        return `${item.discount_percentage || 0}% OFF`;
    };

    // Helper to determine status
    const getCouponStatus = (item: CouponItem) => {
        if (item.expiry_date && new Date(item.expiry_date) < new Date()) {
            return { label: "Expired", className: "bg-red-50 text-red-700 border-red-100" };
        }
        return { label: "Active", className: "bg-green-50 text-green-700 border-green-100" };
    };

    return (
        <div className="min-h-screen bg-[#F9F9F9] p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Discount & Referral Management
                    </h1>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                        View, edit, search, and manage all promo codes and referral programs.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="h-10 px-4 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium"
                    >
                        <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin text-blue-600" : ""}`} />
                        <span>Refresh</span>
                    </Button>

                    <Link
                        href="/settings/discount-codes"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 shadow-sm transition-all"
                    >
                        <Plus className="h-4 w-4" />
                        Create Discount Code
                    </Link>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                {/* Navigation Tabs */}
                <div className="border-b border-gray-100 px-6 pt-4">
                    <div className="flex items-center gap-6 text-sm font-bold text-gray-500">
                        <button
                            onClick={() => setTypeFilter("ALL")}
                            className={`pb-3.5 transition-all border-b-2 ${
                                typeFilter === "ALL"
                                    ? "border-blue-600 text-blue-700 font-bold"
                                    : "border-transparent hover:text-gray-800"
                            }`}
                        >
                            All Codes ({totalCount})
                        </button>
                        <button
                            onClick={() => setTypeFilter("DISCOUNT")}
                            className={`pb-3.5 transition-all border-b-2 ${
                                typeFilter === "DISCOUNT"
                                    ? "border-blue-600 text-blue-700 font-bold"
                                    : "border-transparent hover:text-gray-800"
                            }`}
                        >
                            Discount Codes
                        </button>
                        <button
                            onClick={() => setTypeFilter("REFERRAL")}
                            className={`pb-3.5 transition-all border-b-2 ${
                                typeFilter === "REFERRAL"
                                    ? "border-blue-600 text-blue-700 font-bold"
                                    : "border-transparent hover:text-gray-800"
                            }`}
                        >
                            Referral Codes
                        </button>
                    </div>
                </div>

                {/* Search & Filters Controls */}
                <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 px-6 py-4 bg-gray-50/50">
                    <div className="relative min-w-[240px] flex-1">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by code name, code, or stripe ID..."
                            className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm font-semibold outline-none focus:border-blue-500 transition-all placeholder:text-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="h-10 rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-blue-500 cursor-pointer"
                    >
                        <option value="ALL">All Types</option>
                        <option value="DISCOUNT">Discount Codes</option>
                        <option value="REFERRAL">Referral Codes</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-10 rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-blue-500 cursor-pointer"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="ACTIVE">Active</option>
                        <option value="EXPIRED">Expired</option>
                    </select>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setSearchQuery("");
                            setTypeFilter("ALL");
                            setStatusFilter("ALL");
                        }}
                        className="h-10 px-3.5 rounded-xl border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                    >
                        <Filter className="h-3.5 w-3.5 mr-1" />
                        Reset Filters
                    </Button>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px] text-left">
                        <thead className="bg-gray-50/70 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-gray-600">Code Name</th>
                                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-gray-600">Type</th>
                                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-gray-600">Reward / Discount</th>
                                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-gray-600">Usage</th>
                                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-gray-600">Status</th>
                                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-gray-600">Validity</th>
                                <th className="px-6 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading || isFetching ? (
                                Array.from({ length: 5 }).map((_, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4"><Skeleton className="h-5 w-28 mb-1" /><Skeleton className="h-3 w-16" /></td>
                                        <td className="px-6 py-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
                                        <td className="px-6 py-4"><Skeleton className="h-5 w-20" /></td>
                                        <td className="px-6 py-4"><Skeleton className="h-5 w-24 mb-1" /><Skeleton className="h-3 w-16" /></td>
                                        <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
                                        <td className="px-6 py-4"><Skeleton className="h-4 w-28" /></td>
                                        <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-24 ml-auto" /></td>
                                    </tr>
                                ))
                            ) : filteredCoupons.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-gray-600">
                                        <div className="flex flex-col items-center justify-center">
                                            <Tag className="w-10 h-10 text-gray-300 mb-2" />
                                            <p className="text-sm font-semibold text-gray-700">No coupons or codes found</p>
                                            <p className="text-xs text-gray-600 mt-1 max-w-sm">
                                                No coupons match your filter criteria or query. Try resetting filters or adding a new code.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredCoupons.map((code) => {
                                    const status = getCouponStatus(code);
                                    const isReferral = code.type?.toLowerCase().includes("referral") || Boolean(code.refferar_amount);
                                    const usedCount = code.used_count || 0;
                                    const maxUsage = code.max_usage || 0;
                                    const usagePercent = maxUsage > 0 ? Math.round((usedCount / maxUsage) * 100) : 0;

                                    return (
                                        <tr key={code._id} className="hover:bg-gray-50/70 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-gray-900">{code.name || code.code}</p>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                                        {code.code}
                                                    </span>
                                                    {code.stripe_coupon_code && (
                                                        <span className="text-[10px] font-mono text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                                                            Stripe: {code.stripe_coupon_code}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                                                        isReferral
                                                            ? "bg-purple-50 text-purple-700 border border-purple-100"
                                                            : "bg-blue-50 text-blue-700 border border-blue-100"
                                                    }`}
                                                >
                                                    {isReferral ? "Referral Code" : "Discount Code"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-gray-800">
                                                {getDiscountDisplay(code)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-gray-800">
                                                    {usedCount} {maxUsage > 0 ? `/ ${maxUsage}` : "redemptions"}
                                                </p>
                                                {maxUsage > 0 && (
                                                    <p className="text-xs font-semibold text-blue-600 mt-0.5">
                                                        {usagePercent}% used
                                                    </p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold border ${status.className}`}>
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-semibold text-gray-600">
                                                {code.expiry_date
                                                    ? new Date(code.expiry_date).toLocaleDateString("en-US", {
                                                          month: "short",
                                                          day: "numeric",
                                                          year: "numeric",
                                                      })
                                                    : "No Expiry"}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    {/* View Details */}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
                                                        onClick={() => setSelectedCoupon(code)}
                                                        title="View Details"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>

                                                    {/* Edit Button */}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
                                                        onClick={() => router.push(`/settings/discount-codes?id=${code._id}`)}
                                                        title="Edit Code"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>

                                                    {/* Delete Button */}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg"
                                                        onClick={() => setDeletingCoupon(code)}
                                                        title="Delete Code"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer Pagination */}
                {!isLoading && filteredCoupons.length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 px-6 py-4 bg-gray-50/30 text-xs text-gray-600 font-medium">
                        <div>
                            Showing <span className="font-bold text-gray-900">{filteredCoupons.length}</span> of{" "}
                            <span className="font-bold text-gray-900">{totalCount}</span> coupon codes
                        </div>

                        {totalPage > 1 && (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page <= 1}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="h-8 px-3 rounded-lg text-xs"
                                >
                                    Previous
                                </Button>
                                <span className="px-2 font-bold text-gray-800">
                                    Page {page} of {totalPage}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page >= totalPage}
                                    onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
                                    className="h-8 px-3 rounded-lg text-xs"
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Coupon Details Modal */}
            <Dialog open={Boolean(selectedCoupon)} onOpenChange={(open) => !open && setSelectedCoupon(null)}>
                <DialogContent className="sm:max-w-md rounded-2xl p-6">
                    <DialogHeader className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">
                                {selectedCoupon?.code}
                            </span>
                            {selectedCoupon && (
                                <Badge className={`${getCouponStatus(selectedCoupon).className} border-none font-bold text-xs`}>
                                    {getCouponStatus(selectedCoupon).label}
                                </Badge>
                            )}
                        </div>
                        <DialogTitle className="text-lg font-bold text-gray-900">
                            {selectedCoupon?.name}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-gray-500">
                            Stripe ID: <code className="font-mono text-gray-700">{selectedCoupon?.stripe_coupon_code || "N/A"}</code>
                        </DialogDescription>
                    </DialogHeader>

                    {selectedCoupon && (
                        <div className="space-y-4 py-2 text-xs">
                            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div>
                                    <p className="text-gray-400 font-semibold uppercase text-[10px]">Discount Value</p>
                                    <p className="font-bold text-sm text-gray-900 mt-0.5">{getDiscountDisplay(selectedCoupon)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-semibold uppercase text-[10px]">Coupon Type</p>
                                    <p className="font-bold text-gray-800 capitalize mt-0.5">{selectedCoupon.coupon_type || selectedCoupon.type || "Percentage"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-semibold uppercase text-[10px]">Total Redemptions</p>
                                    <p className="font-bold text-gray-800 mt-0.5">
                                        {selectedCoupon.used_count || 0} / {selectedCoupon.max_usage || "Unlimited"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-semibold uppercase text-[10px]">Expiry Date</p>
                                    <p className="font-bold text-gray-800 mt-0.5">
                                        {selectedCoupon.expiry_date
                                            ? new Date(selectedCoupon.expiry_date).toLocaleDateString("en-US", { dateStyle: "medium" })
                                            : "No Expiry"}
                                    </p>
                                </div>
                            </div>

                            {(selectedCoupon.refferar_amount !== undefined || selectedCoupon.reffree_amount !== undefined) && (
                                <div className="p-4 bg-purple-50/60 border border-purple-100 rounded-xl space-y-2">
                                    <p className="font-bold text-purple-900 flex items-center gap-1.5">
                                        <Award className="w-4 h-4 text-purple-600" /> Referral Rewards Breakdown
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 text-purple-800 font-medium">
                                        <p>Referrer Bonus: <strong>${selectedCoupon.refferar_amount || 0}</strong></p>
                                        <p>Referee Bonus: <strong>${selectedCoupon.reffree_amount || 0}</strong></p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3 text-[11px] text-gray-500 pt-1">
                                <div>Created: {selectedCoupon.createdAt ? new Date(selectedCoupon.createdAt).toLocaleDateString() : "N/A"}</div>
                                <div className="text-right">Updated: {selectedCoupon.updatedAt ? new Date(selectedCoupon.updatedAt).toLocaleDateString() : "N/A"}</div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            onClick={() => setSelectedCoupon(null)}
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs h-9 rounded-xl"
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={Boolean(deletingCoupon)} onOpenChange={(open) => !open && setDeletingCoupon(null)}>
                <DialogContent className="sm:max-w-md rounded-2xl p-6">
                    <DialogHeader className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-bold text-gray-900">
                                Delete Coupon Code?
                            </DialogTitle>
                            <DialogDescription className="text-xs text-gray-500 mt-1 leading-relaxed">
                                Are you sure you want to delete the coupon code <strong className="text-gray-900 font-mono">"{deletingCoupon?.code}"</strong> ({deletingCoupon?.name})? This action cannot be undone and will permanently remove this code.
                            </DialogDescription>
                        </div>
                    </DialogHeader>

                    <DialogFooter className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button
                            variant="outline"
                            onClick={() => setDeletingCoupon(null)}
                            className="h-10 px-5 rounded-xl border-gray-200 font-bold text-gray-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteCoupon}
                            disabled={isDeleting}
                            className="h-10 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md flex items-center gap-2 disabled:opacity-50"
                        >
                            {isDeleting ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    <span>Deleting...</span>
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete Coupon</span>
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
