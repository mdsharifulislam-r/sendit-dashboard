"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
    AlertTriangle, 
    Flag, 
    XCircle, 
    Shield, 
    MoreHorizontal,
    Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription, 
    DialogFooter 
} from "@/components/ui/dialog";
import { 
    useGetAllriskMonitoringItemsQuery, 
    useGetRiskMonitoringSettingQuery, 
    useCreateRiskMonitoringSettingMutation, 
    useUpdateRiskMonitoringStatusMutation 
} from "@/redux/apiSlices/riskMonitoringSlice";

export default function ModerationPage() {
    // Settings state
    const [highValueThreshold, setHighValueThreshold] = useState("");
    const [maxFailedKycAttempts, setMaxFailedKycAttempts] = useState("");
    const [autoFlagWeightThreshold, setAutoFlagWeightThreshold] = useState("");
    const [rapidTransactionWindow, setRapidTransactionWindow] = useState("");

    // Review Modal state
    const [reviewItem, setReviewItem] = useState<any>(null);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    // API Integration
    const { data: settingsResponse } = useGetRiskMonitoringSettingQuery(undefined);
    const { data: riskyResponse } = useGetAllriskMonitoringItemsQuery(undefined);
    const [createSetting, { isLoading: isSaving }] = useCreateRiskMonitoringSettingMutation();
    const [updateStatus] = useUpdateRiskMonitoringStatusMutation();

    const settingsData = settingsResponse?.data;
    const riskyItemsList = riskyResponse?.data || [];

    // Populate settings values on load
    useEffect(() => {
        if (settingsData) {
            setHighValueThreshold(settingsData.high_value_threshold?.toString() || "");
            setMaxFailedKycAttempts(settingsData.max_failed_kyc_attempts?.toString() || "");
            setAutoFlagWeightThreshold(settingsData.auto_flag_weight_threshold?.toString() || "");
            setRapidTransactionWindow(settingsData.rapid_transaction_window_hours?.toString() || "");
        }
    }, [settingsData]);

    const handleSaveSettings = async () => {
        try {
            await createSetting({
                high_value_threshold: Number(highValueThreshold),
                max_failed_kyc_attempts: Number(maxFailedKycAttempts),
                auto_flag_weight_threshold: Number(autoFlagWeightThreshold),
                rapid_transaction_window_hours: Number(rapidTransactionWindow),
            }).unwrap();
            toast.success("Risk settings updated successfully!");
        } catch (error) {
            console.error("Failed to save settings", error);
            toast.error("Failed to update risk settings.");
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await updateStatus({ id, status }).unwrap();
            toast.success(`Risk status updated to ${status}`);
        } catch (error) {
            console.error("Failed to update status", error);
            toast.error("Failed to update risk status.");
        }
    };

    const handleOpenReview = (item: any) => {
        setReviewItem(item);
        setIsReviewOpen(true);
    };

    // Filter categories dynamically by type (User, Trip, Transaction)
    const userRisks = useMemo(() => {
        return riskyItemsList.filter((item: any) => item.type === "User");
    }, [riskyItemsList]);

    const tripRisks = useMemo(() => {
        return riskyItemsList.filter((item: any) => item.type === "Trip");
    }, [riskyItemsList]);

    const transactionRisks = useMemo(() => {
        return riskyItemsList.filter((item: any) => item.type === "Transaction");
    }, [riskyItemsList]);

    return (
        <div className="p-8 space-y-12 bg-[#F9F9F9] min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden block" />
                <h1 className="text-2xl font-bold text-gray-900">Risk Monitoring</h1>
            </div>

            {/* Risk Sections Rows */}
            <div className="space-y-12">
                {/* Row 1: User Risks */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        <h2 className="text-xl font-bold text-gray-900">User</h2>
                        <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-none px-2.5 py-0.5 text-xs font-bold">{userRisks.length} items</Badge>
                    </div>
                    {userRisks.length === 0 ? (
                        <p className="text-sm font-semibold text-gray-500 py-2">No suspicious user alerts flagged.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userRisks.map((user: any) => {
                                const name = user.item?.name || "Suspicious User";
                                const email = user.item?.email || "N/A";
                                return (
                                    <div key={user._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[190px]">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{name}</h3>
                                                    <p className="text-xs text-gray-400 font-mono">{email}</p>
                                                </div>
                                                <Badge className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50 border-none px-3 py-1 rounded-full text-[10px] font-bold">{user.status}</Badge>
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2">{user.description}</p>
                                        </div>
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-4">
                                            <span className="text-xs text-gray-400">Date: <b>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</b></span>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 gap-1 font-bold text-xs border border-gray-100 hover:bg-gray-50 rounded-xl">
                                                        Actions <MoreHorizontal className="w-3.5 h-3.5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-36">
                                                    <DropdownMenuItem onClick={() => handleOpenReview(user)} className="cursor-pointer font-bold text-xs text-blue-700">
                                                        Review
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus(user._id, "Clear")} className="cursor-pointer font-bold text-xs text-green-700">
                                                        Clear Risk
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus(user._id, "Blacklist")} className="cursor-pointer font-bold text-xs text-red-700">
                                                        Blacklist
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Row 2: Transaction Risks */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                        <Shield className="w-5 h-5 text-purple-500" />
                        <h2 className="text-xl font-bold text-gray-900">Transaction</h2>
                        <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-none px-2.5 py-0.5 text-xs font-bold">{transactionRisks.length} items</Badge>
                    </div>
                    {transactionRisks.length === 0 ? (
                        <p className="text-sm font-semibold text-gray-500 py-2">No suspicious transaction alerts flagged.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {transactionRisks.map((payment: any) => {
                                const amountStr = payment.item?.amount ? `$${payment.item.amount}` : "Suspicious Payment";
                                const trxId = payment.item?.trx_id || "N/A";
                                return (
                                    <div key={payment._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[190px]">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{amountStr}</h3>
                                                    <p className="text-xs text-gray-400 font-mono">Trx ID: {trxId}</p>
                                                </div>
                                                <Badge className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50 border-none px-3 py-1 rounded-full text-[10px] font-bold">{payment.status}</Badge>
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2">{payment.description}</p>
                                        </div>
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-4">
                                            <span className="text-xs text-gray-400">Date: <b>{payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "N/A"}</b></span>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 gap-1 font-bold text-xs border border-gray-100 hover:bg-gray-50 rounded-xl">
                                                        Actions <MoreHorizontal className="w-3.5 h-3.5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-36">
                                                    <DropdownMenuItem onClick={() => handleOpenReview(payment)} className="cursor-pointer font-bold text-xs text-blue-700">
                                                        Review
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus(payment._id, "Clear")} className="cursor-pointer font-bold text-xs text-green-700">
                                                        Clear Risk
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus(payment._id, "Blacklist")} className="cursor-pointer font-bold text-xs text-red-700">
                                                        Blacklist
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Row 3: Trip Risks */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                        <Flag className="w-5 h-5 text-red-500" />
                        <h2 className="text-xl font-bold text-gray-900">Trip</h2>
                        <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-none px-2.5 py-0.5 text-xs font-bold">{tripRisks.length} items</Badge>
                    </div>
                    {tripRisks.length === 0 ? (
                        <p className="text-sm font-semibold text-gray-500 py-2">No suspicious trip alerts flagged.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tripRisks.map((shipment: any) => {
                                const route = shipment.item?.id || "Suspicious Shipment";
                                return (
                                    <div key={shipment._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[190px]">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{route}</h3>
                                                    <p className="text-xs text-gray-400 font-mono">Trip ID</p>
                                                </div>
                                                <Badge className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50 border-none px-3 py-1 rounded-full text-[10px] font-bold">{shipment.status}</Badge>
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2">{shipment.description}</p>
                                        </div>
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-4">
                                            <span className="text-xs text-gray-400">Date: <b>{shipment.createdAt ? new Date(shipment.createdAt).toLocaleDateString() : "N/A"}</b></span>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 gap-1 font-bold text-xs border border-gray-100 hover:bg-gray-50 rounded-xl">
                                                        Actions <MoreHorizontal className="w-3.5 h-3.5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-36">
                                                    <DropdownMenuItem onClick={() => handleOpenReview(shipment)} className="cursor-pointer font-bold text-xs text-blue-700">
                                                        Review
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus(shipment._id, "Clear")} className="cursor-pointer font-bold text-xs text-green-700">
                                                        Clear Risk
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus(shipment._id, "Blacklist")} className="cursor-pointer font-bold text-xs text-red-700">
                                                        Blacklist
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Risk Settings */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-gray-900">Risk Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase">High Value Threshold</Label>
                        <Input 
                            value={highValueThreshold} 
                            onChange={(e) => setHighValueThreshold(e.target.value)} 
                            className="bg-transparent border-gray-200 rounded-lg h-11" 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase">Max Failed KYC Attempts</Label>
                        <Input 
                            value={maxFailedKycAttempts} 
                            onChange={(e) => setMaxFailedKycAttempts(e.target.value)} 
                            className="bg-transparent border-gray-200 rounded-lg h-11" 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase">Auto-Flag Weight Threshold (kg)</Label>
                        <Input 
                            value={autoFlagWeightThreshold} 
                            onChange={(e) => setAutoFlagWeightThreshold(e.target.value)} 
                            className="bg-transparent border-gray-200 rounded-lg h-11" 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase">Rapid Transaction Window (hours)</Label>
                        <Input 
                            value={rapidTransactionWindow} 
                            onChange={(e) => setRapidTransactionWindow(e.target.value)} 
                            className="bg-transparent border-gray-200 rounded-lg h-11" 
                        />
                    </div>
                </div>
                <Button 
                    onClick={handleSaveSettings} 
                    disabled={isSaving}
                    className="bg-[#0052FF] hover:bg-[#0041CC] text-white rounded-lg px-8 h-11 font-bold disabled:opacity-50"
                >
                    {isSaving ? "Saving..." : "Save Risk Settings"}
                </Button>
            </div>

            {/* Review Dialog */}
            <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                <DialogContent className="max-w-md bg-white rounded-2xl p-6 border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-gray-900">Risky Item Review</DialogTitle>
                        <DialogDescription className="text-xs font-medium text-gray-500">
                            Detailed report of the flagged risky event.
                        </DialogDescription>
                    </DialogHeader>

                    {reviewItem && (
                        <div className="space-y-4 py-4 text-sm text-gray-700">
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="font-bold text-gray-500 uppercase text-[10px]">Type</span>
                                <Badge className="bg-red-50 text-red-700 hover:bg-red-50 border-none font-bold text-xs">{reviewItem.type}</Badge>
                            </div>
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="font-bold text-gray-500 uppercase text-[10px]">Flag Status</span>
                                <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-none font-bold text-xs">{reviewItem.status}</Badge>
                            </div>
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="font-bold text-gray-500 uppercase text-[10px]">Date Flagged</span>
                                <span className="font-bold">{reviewItem.createdAt ? new Date(reviewItem.createdAt).toLocaleString() : "N/A"}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="font-bold text-gray-500 uppercase text-[10px] block">Trigger Description</span>
                                <p className="bg-gray-50 p-3 rounded-lg text-xs font-bold text-gray-800 border border-gray-100">{reviewItem.description}</p>
                            </div>

                            {/* Item Details */}
                            <div className="space-y-2 pt-2">
                                <span className="font-bold text-gray-500 uppercase text-[10px] block">Associated Object Details</span>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2 text-xs">
                                    {reviewItem.type === "User" && reviewItem.item && (
                                        <>
                                            <p className="flex justify-between"><span className="text-gray-500">Name:</span> <span className="font-bold text-gray-800">{reviewItem.item.name || "N/A"}</span></p>
                                            <p className="flex justify-between"><span className="text-gray-500">Email:</span> <span className="font-bold text-gray-800">{reviewItem.item.email || "N/A"}</span></p>
                                            <p className="flex justify-between"><span className="text-gray-500">Database ID:</span> <span className="font-mono text-gray-500">{reviewItem.item._id || "N/A"}</span></p>
                                        </>
                                    )}
                                    {reviewItem.type === "Trip" && reviewItem.item && (
                                        <>
                                            <p className="flex justify-between"><span className="text-gray-500">Trip ID:</span> <span className="font-bold text-gray-800">{reviewItem.item.id || "N/A"}</span></p>
                                            <p className="flex justify-between"><span className="text-gray-500">Database ID:</span> <span className="font-mono text-gray-500">{reviewItem.item._id || "N/A"}</span></p>
                                        </>
                                    )}
                                    {reviewItem.type === "Transaction" && reviewItem.item && (
                                        <>
                                            <p className="flex justify-between"><span className="text-gray-500">Title:</span> <span className="font-bold text-gray-800">{reviewItem.item.title || "N/A"}</span></p>
                                            <p className="flex justify-between"><span className="text-gray-500">Transaction ID:</span> <span className="font-bold text-gray-800">{reviewItem.item.trx_id || "N/A"}</span></p>
                                            <p className="flex justify-between"><span className="text-gray-500">Amount:</span> <span className="font-bold text-gray-800">${reviewItem.item.amount || "0.00"}</span></p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex justify-end gap-3 pt-2">
                        <Button variant="outline" className="border-gray-200 text-gray-700 font-bold text-xs rounded-xl" onClick={() => setIsReviewOpen(false)}>
                            Close
                        </Button>
                        {reviewItem && (
                            <>
                                <Button className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs rounded-xl" onClick={() => { handleUpdateStatus(reviewItem._id, "Clear"); setIsReviewOpen(false); }}>
                                    Clear Risk
                                </Button>
                                <Button variant="destructive" className="font-bold text-xs rounded-xl" onClick={() => { handleUpdateStatus(reviewItem._id, "Blacklist"); setIsReviewOpen(false); }}>
                                    Blacklist User
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
