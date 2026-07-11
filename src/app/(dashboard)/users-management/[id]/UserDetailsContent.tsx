"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
    CheckCircle, 
    XCircle, 
    RefreshCcw, 
    Flag, 
    ShieldCheck, 
    FileText, 
    Clock, 
    Lock,
    Shield
} from "lucide-react";

export default function UserDetailsContent({ id }: { id: string }) {
    const [note, setNote] = useState("");

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Sarah Johnson</h1>
                    <p className="text-gray-700 text-sm mt-1 font-bold">User ID: USR001</p>
                </div>
                <div className="flex gap-3">
                    <Button className="bg-[#00B67A] hover:bg-[#00A36D] text-white rounded-lg px-6 font-bold h-10">
                        Approve KYC
                    </Button>
                    <Button variant="destructive" className="bg-[#FF3B30] hover:bg-[#E6352B] text-white rounded-lg px-6 font-bold h-10">
                        Suspend User
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
                                <p className="text-sm font-bold text-gray-900">Sarah Elizabeth Johnson</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Email Address</p>
                                <p className="text-sm font-bold text-gray-900">s.johnson@example.com</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Phone Number</p>
                                <p className="text-sm font-bold text-gray-900">+254 712 345 678</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Role</p>
                                    <p className="text-sm font-bold text-gray-900">Premium Shipper</p>
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
                            <h3 className="text-5xl font-bold">$12,450.00</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/20 p-4 rounded-xl">
                                <p className="text-[10px] font-bold opacity-100 uppercase tracking-wider mb-1">Pending Funds</p>
                                <p className="text-lg font-bold">$1,200.50</p>
                            </div>
                            <div className="bg-white/20 p-4 rounded-xl">
                                <p className="text-[10px] font-bold opacity-100 uppercase tracking-wider mb-1">Total Earned</p>
                                <p className="text-lg font-bold">$45,000.00</p>
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
                                <Badge className="bg-green-50 text-green-700 border-none px-3 py-0.5 text-[10px] font-bold rounded-full">Level 3</Badge>
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
                                Active Status
                            </div>
                        </div>
                    </div>
                </div>

                {/* Uploaded Documents */}
                <div className="col-span-12 lg:col-span-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Uploaded Documents</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Passport */}
                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-3 relative">
                                <div className="h-32 bg-gray-200 rounded-lg overflow-hidden relative">
                                    <div className="absolute inset-0 bg-[#C05621]/20"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Passport</p>
                                    <p className="text-[10px] text-gray-600 font-bold">Expires: 2028-10</p>
                                </div>
                                <CheckCircle className="w-4 h-4 text-green-700 absolute bottom-4 right-4" />
                            </div>
                            {/* CIN */}
                            <div className="p-4 rounded-xl border border-[#0052FF] bg-[#0052FF]/5 space-y-3 relative">
                                <div className="h-32 bg-gray-200 rounded-lg overflow-hidden relative">
                                    <div className="absolute inset-0 bg-[#2D3748]/80 flex flex-col items-center justify-center text-white p-2">
                                        <Badge className="bg-[#0052FF] text-white border-none px-2 py-0.5 text-[8px] font-bold mb-1">REVIEW REQUIRED</Badge>
                                        <p className="text-[8px] font-bold">CIN (ID Card)</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">CIN (ID Card)</p>
                                    <p className="text-[10px] text-gray-600 font-bold">Front & Back</p>
                                </div>
                                <div className="w-4 h-4 border-2 border-[#0052FF] rounded-full absolute bottom-4 right-4 flex items-center justify-center">
                                    <div className="w-1.5 h-0.5 bg-[#0052FF]"></div>
                                </div>
                            </div>
                            {/* Driving License */}
                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-3 relative">
                                <div className="h-32 bg-gray-200 rounded-lg overflow-hidden relative">
                                    <div className="absolute inset-0 bg-[#2C7A7B]/20"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Driving License</p>
                                    <p className="text-[10px] text-gray-600 font-bold">Class B/C</p>
                                </div>
                                <CheckCircle className="w-4 h-4 text-green-700 absolute bottom-4 right-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Agreements */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Agreements</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50/50 border border-gray-50">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-bold text-gray-700">Terms of Service</span>
                                </div>
                                <Badge className="bg-green-50 text-green-700 border-none px-2 py-0.5 text-[8px] font-bold rounded-md">SIGNED</Badge>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50/50 border border-gray-50">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-bold text-gray-700">Privacy Policy</span>
                                </div>
                                <Badge className="bg-green-50 text-green-700 border-none px-2 py-0.5 text-[8px] font-bold rounded-md">SIGNED</Badge>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50/50 border border-gray-50">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-bold text-gray-700">KYC Consent</span>
                                </div>
                                <Badge className="bg-green-50 text-green-700 border-none px-2 py-0.5 text-[8px] font-bold rounded-md">SIGNED</Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="col-span-12 lg:col-span-7">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                    <CheckCircle className="w-5 h-5 text-green-700" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Withdrawal Approved</p>
                                    <p className="text-xs text-gray-700 mt-1 font-bold">Administrator approved a payout of $450.00 to Bank Account ...4567</p>
                                    <p className="text-[10px] font-bold text-gray-700 mt-2 uppercase">2 Hours Ago</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                    <RefreshCcw className="w-5 h-5 text-blue-700" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">New Document Uploaded</p>
                                    <p className="text-xs text-gray-700 mt-1 font-bold">User uploaded a new CIN (ID Card) for verification</p>
                                    <p className="text-[10px] font-bold text-gray-700 mt-2 uppercase">5 Hours Ago</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                    <Clock className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">User Login</p>
                                    <p className="text-xs text-gray-700 mt-1 font-bold">Successful login from IP: 192.168.1.104 (Nairobi, KE)</p>
                                    <p className="text-[10px] font-bold text-gray-700 mt-2 uppercase">Yesterday</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="col-span-12 lg:col-span-5">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Actions</h2>
                        <div className="grid grid-cols-2 gap-4">
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

                {/* Internal Notes */}
                <div className="col-span-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Internal Notes</h2>
                        <div className="space-y-4">
                            <Textarea 
                                placeholder="Add a private note about this user for the compliance team..." 
                                className="min-h-[120px] bg-gray-100/50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#0052FF] p-4 text-sm font-bold placeholder:text-gray-500"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-700 text-[10px] font-bold uppercase tracking-widest">
                                    <Lock className="w-3 h-3" />
                                    Visibility: Compliance Team Only
                                </div>
                                <Button className="bg-[#0052FF] hover:bg-[#0041CC] text-white rounded-lg px-8 font-bold h-10">
                                    Save Note
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
