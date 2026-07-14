"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    CheckCircle,
    XCircle,
    RefreshCcw,
    Flag,
    ShieldCheck,
    Clock
} from "lucide-react";
import Link from "next/link";
import { useGetUserByIdQuery, useUpdateApproveByIdMutation, useUpdateSuspendByIdMutation } from "@/redux/apiSlices/usersSlice";
import { toast } from "sonner";

export default function UserDetailsContent({ id }: { id: string }) {
    const { data: userResponse, isLoading, refetch } = useGetUserByIdQuery(id);
    const user = userResponse?.data;

    const [updateApprove, { isLoading: isApproving }] = useUpdateApproveByIdMutation();
    const [updateSuspend, { isLoading: isSuspending }] = useUpdateSuspendByIdMutation();

    const handleApprove = async () => {
        try {
            await updateApprove(id).unwrap();
            toast.success("KYC approved successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to approve KYC");
        }
    };

    const handleSuspend = async () => {
        try {
            const res = await updateSuspend(id).unwrap();
            console.log(res, 'res user suspend');

            toast.success("User suspended successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to suspend user");
        }
    };

    const getDocStatusBadge = (status: string) => {
        switch (status?.toLowerCase()) {
            case "approved":
            case "verified":
                return (
                    <>
                        <Badge className="bg-green-50 text-green-700 border-none px-2 py-0.5 text-[8px] font-bold mb-1">APPROVED</Badge>
                        <CheckCircle className="w-4 h-4 text-green-700 absolute bottom-4 right-4" />
                    </>
                );
            case "rejected":
            case "failed":
                return (
                    <>
                        <Badge className="bg-red-50 text-red-700 border-none px-2 py-0.5 text-[8px] font-bold mb-1">REJECTED</Badge>
                        <XCircle className="w-4 h-4 text-red-700 absolute bottom-4 right-4" />
                    </>
                );
            case "pending":
            default:
                return (
                    <>
                        <Badge className="bg-amber-50 text-amber-700 border-none px-2 py-0.5 text-[8px] font-bold mb-1">PENDING</Badge>
                        <Clock className="w-4 h-4 text-amber-700 absolute bottom-4 right-4" />
                    </>
                );
        }
    };

    if (isLoading) {
        return (
            <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen animate-pulse">
                {/* Header Skeleton */}
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <div className="h-8 bg-gray-200 rounded w-48"></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="flex gap-3">
                        <div className="h-10 bg-gray-200 rounded w-28"></div>
                        <div className="h-10 bg-gray-200 rounded w-28"></div>
                    </div>
                </div>
                {/* Main Content Grid Skeleton */}
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-4 h-64 bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-5 h-64 bg-blue-100 rounded-3xl p-8">
                        <div className="h-4 bg-blue-200 rounded w-24 mb-4"></div>
                        <div className="h-12 bg-blue-200 rounded w-48 mb-6"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-16 bg-blue-200 rounded"></div>
                            <div className="h-16 bg-blue-200 rounded"></div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-3 h-64 bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-gray-700">User not found</p>
                <Link href="/users-management" className="text-blue-700 font-bold hover:underline">
                    Back to Users List
                </Link>
            </div>
        );
    }

    const statusText = user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1).toLowerCase() : "Active";
    const isVerified = user.isKycVerified ? "Verified" : "Unverified";
    const walletBal = user.wallet_balance !== undefined ? `$${(user.wallet_balance).toLocaleString()}` : "$0";
    const userRole = user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : "Traveler";
    const isKycApproved = user.isKycVerified === true;
    const isUserSuspended = user.status?.toLowerCase() === "delete";
    const isApproveDisabled = isKycApproved && !isUserSuspended;
    const isSuspendDisabled = isUserSuspended;

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{user.name || "N/A"}</h1>
                    <p className="text-gray-700 text-sm mt-1 font-mono font-bold">User ID: {user._id}</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        disabled={isApproveDisabled || isApproving}
                        onClick={handleApprove}
                        className={`rounded-lg px-6 font-bold h-10 transition-colors ${(isApproveDisabled || isApproving)
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed border-none hover:bg-gray-200"
                            : "bg-[#00B67A] hover:bg-[#00A36D] text-white hover:text-white cursor-pointer"
                            }`}
                    >
                        {isApproving ? "Approving..." : isKycApproved ? "KYC Approved" : "Approve KYC"}
                    </Button>
                    <Button
                        disabled={isSuspendDisabled || isSuspending}
                        onClick={handleSuspend}
                        className={`rounded-lg px-6 font-bold h-10 transition-colors ${(isSuspendDisabled || isSuspending)
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed border-none hover:bg-gray-200"
                            : "bg-[#FF3B30] hover:bg-[#E6352B] text-white hover:text-white cursor-pointer"
                            }`}
                    >
                        {isSuspending ? "Suspending..." : isUserSuspended ? "User Suspended" : "Suspend User"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Basic Information */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Basic Information</h2>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Full Legal Name</p>
                                <p className="text-sm font-bold text-gray-900">{user.name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Email Address</p>
                                <p className="text-sm font-bold text-gray-900">{user.email || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Phone Number</p>
                                <p className="text-sm font-bold text-gray-900">{user.contact || "N/A"}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Role</p>
                                    <p className="text-sm font-bold text-gray-900">{userRole}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Language</p>
                                    <p className="text-sm font-bold text-gray-900">English (UK)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wallet Summary */}
                <div className="col-span-12 lg:col-span-5">
                    <div className="bg-[#0052FF] p-8 rounded-3xl shadow-lg text-white space-y-8 h-full">
                        <div>
                            <p className="text-xs font-bold opacity-100 mb-2 uppercase tracking-wider">Available Balance</p>
                            <h3 className="text-5xl font-bold">{walletBal}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/20 p-4 rounded-xl">
                                <p className="text-[10px] font-bold opacity-100 uppercase tracking-wider mb-1">Pending Funds</p>
                                <p className="text-lg font-bold">$0.00</p>
                            </div>
                            <div className="bg-white/20 p-4 rounded-xl">
                                <p className="text-[10px] font-bold opacity-100 uppercase tracking-wider mb-1">Total Earned</p>
                                <p className="text-lg font-bold">{walletBal}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Status */}
                <div className="col-span-12 lg:col-span-3">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Account Status</h2>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700 font-bold">Verification</span>
                                <Badge className="bg-green-50 text-green-700 border-none px-3 py-0.5 text-[10px] font-bold rounded-full">{isVerified}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700 font-bold">Risk Level</span>
                                <Badge className="bg-gray-100 text-gray-700 border-none px-3 py-0.5 text-[10px] font-bold rounded-full">Low Risk</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700 font-bold">Auto-Payout</span>
                                <Switch checked className="data-[state=checked]:bg-green-500" />
                            </div>
                            <div className="pt-4 border-t border-gray-50 flex items-center gap-2 text-green-700 font-bold text-xs uppercase tracking-tight">
                                <CheckCircle className="w-4 h-4" />
                                {statusText} Status
                            </div>
                        </div>
                    </div>
                </div>

                {/* Uploaded Documents */}
                <div className="col-span-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Uploaded Documents</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Passport */}
                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-3 relative">
                                <div className="h-32 bg-gray-200 rounded-lg overflow-hidden relative flex items-center justify-center">
                                    {user.passport_info?.file ? (
                                        <img src={user.passport_info.file} alt="Passport" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 bg-[#C05621]/20"></div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Passport</p>
                                    <p className="text-[10px] text-gray-600 font-bold">Passport Verification Doc</p>
                                </div>
                                {getDocStatusBadge(user.passport_info?.status)}
                            </div>

                            {/* CIN (ID Card) */}
                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-3 relative">
                                <div className="h-32 bg-gray-200 rounded-lg overflow-hidden relative flex items-center justify-center gap-1 p-1">
                                    {user.id_card_info?.front || user.id_card_info?.back ? (
                                        <>
                                            {user.id_card_info.front && <img src={user.id_card_info.front} alt="ID Front" className="w-1/2 h-full object-cover rounded" />}
                                            {user.id_card_info.back && <img src={user.id_card_info.back} alt="ID Back" className="w-1/2 h-full object-cover rounded" />}
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 bg-[#2D3748]/20"></div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">CIN (ID Card)</p>
                                    <p className="text-[10px] text-gray-600 font-bold">Front & Back</p>
                                </div>
                                {getDocStatusBadge(user.id_card_info?.status)}
                            </div>

                            {/* Driving License */}
                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-3 relative">
                                <div className="h-32 bg-gray-200 rounded-lg overflow-hidden relative flex items-center justify-center">
                                    {user.driving_license_info?.file ? (
                                        <img src={user.driving_license_info.file} alt="Driving License" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 bg-[#2C7A7B]/20"></div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Driving License</p>
                                    <p className="text-[10px] text-gray-600 font-bold">Driving License Doc</p>
                                </div>
                                {getDocStatusBadge(user.driving_license_info?.status)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="col-span-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Actions</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <button className="p-6 rounded-xl border border-gray-100 hover:bg-gray-50 flex flex-col items-center justify-center gap-3 transition-colors group">
                                <RefreshCcw className="w-6 h-6 text-blue-700" />
                                <span className="text-[8px] font-bold text-gray-900 uppercase tracking-widest text-center">Request Re-upload</span>
                            </button>
                            <button className="p-6 rounded-xl border border-gray-100 hover:bg-gray-50 flex flex-col items-center justify-center gap-3 transition-colors group">
                                <XCircle className="w-6 h-6 text-red-700" />
                                <span className="text-[8px] font-bold text-gray-900 uppercase tracking-widest text-center">Reject KYC</span>
                            </button>
                            <button className="p-6 rounded-xl border border-gray-100 hover:bg-gray-50 flex flex-col items-center justify-center gap-3 transition-colors group">
                                <Flag className="w-6 h-6 text-red-700" />
                                <span className="text-[8px] font-bold text-gray-900 uppercase tracking-widest text-center">Flag User</span>
                            </button>
                            <button className="p-6 rounded-xl border border-gray-100 hover:bg-gray-50 flex flex-col items-center justify-center gap-3 transition-colors group">
                                <ShieldCheck className="w-6 h-6 text-green-700" />
                                <span className="text-[8px] font-bold text-gray-900 uppercase tracking-widest text-center">Reactivate User</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
