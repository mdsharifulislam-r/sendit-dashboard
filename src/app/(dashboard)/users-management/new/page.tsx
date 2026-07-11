"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
    Shield, 
    User, 
    Mail, 
    Phone, 
    Lock, 
    Eye, 
    EyeOff, 
    Truck, 
    DollarSign, 
    Activity, 
    MapPin, 
    Headphones,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function InitializeAdminProfile() {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState("super_admin");

    const roles = [
        {
            id: "super_admin",
            title: "Super Admin",
            desc: "Full system access and financial control.",
            icon: <Shield className="w-5 h-5" />
        },
        {
            id: "senior_dispatcher",
            title: "Senior Dispatcher",
            desc: "Manage fleet and complex shipment routes.",
            icon: <Truck className="w-5 h-5" />
        },
        {
            id: "regional_manager",
            title: "Regional Manager",
            desc: "Analytics and performance for specific zones.",
            icon: <MapPin className="w-5 h-5" />
        },
        {
            id: "support_agent",
            title: "Support Agent",
            desc: "Ticketing and basic shipment updates.",
            icon: <Headphones className="w-5 h-5" />
        }
    ];

    const modules = [
        { id: "shipments", title: "Shipments Management", desc: "Create, track, and modify cargo flows.", icon: <Truck className="w-5 h-5" />, checked: true },
        { id: "financial", title: "Financial Ledger", desc: "View invoices, revenue reports, and settlements.", icon: <DollarSign className="w-5 h-5" />, checked: false },
        { id: "fleet", title: "Fleet Management", desc: "Assign drivers and monitor vehicle maintenance.", icon: <Activity className="w-5 h-5" />, checked: true },
        { id: "security", title: "Security Logs", desc: "Audit trails, access history, and system alerts.", icon: <Shield className="w-5 h-5" />, checked: false },
    ];

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen max-w-5xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Initialize Admin Profile</h1>
                <p className="text-gray-500 mt-1">Provision credentials and define granular access controls for new logistics personnel.</p>
            </div>

            <div className="space-y-12">
                {/* Personal Information */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-blue-600">
                        <User className="w-5 h-5" />
                        <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                            <Input placeholder="e.g. Jonathan Harker" className="h-12 bg-gray-100/50 border-gray-200 rounded-lg focus-visible:ring-blue-600" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                            <Input placeholder="j.harker@sendit.com" className="h-12 bg-gray-100/50 border-gray-200 rounded-lg focus-visible:ring-blue-600" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                            <Input placeholder="+1 (555) 000-0000" className="h-12 bg-gray-100/50 border-gray-200 rounded-lg focus-visible:ring-blue-600" />
                        </div>
                    </div>
                </section>

                {/* Administrative Role */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-green-500">
                        <CheckCircle2 className="w-5 h-5" />
                        <h2 className="text-lg font-bold text-gray-900">Administrative Role</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className={`p-6 rounded-xl border text-left transition-all space-y-3 ${
                                    selectedRole === role.id 
                                    ? 'bg-blue-50 border-blue-600 ring-1 ring-blue-600' 
                                    : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                                }`}
                            >
                                <div className={`${selectedRole === role.id ? 'text-blue-600' : 'text-green-500'}`}>
                                    {role.icon}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-gray-900">{role.title}</h4>
                                    <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{role.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Granular Module Access */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-gray-400">
                        <Activity className="w-5 h-5" />
                        <h2 className="text-lg font-bold text-gray-900">Granular Module Access</h2>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                        {modules.map((module) => (
                            <div key={module.id} className="p-6 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                        module.id === 'shipments' ? 'bg-blue-50 text-blue-600' :
                                        module.id === 'financial' ? 'bg-green-50 text-green-600' :
                                        module.id === 'fleet' ? 'bg-green-50 text-green-600' :
                                        'bg-red-50 text-red-600'
                                    }`}>
                                        {module.icon}
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-sm font-bold text-gray-900">{module.title}</h4>
                                        <p className="text-xs text-gray-400 font-medium">{module.desc}</p>
                                    </div>
                                </div>
                                <input 
                                    type="checkbox" 
                                    defaultChecked={module.checked}
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Security & Safeguards */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-red-500">
                        <Shield className="w-5 h-5" />
                        <h2 className="text-lg font-bold text-gray-900">Security & Safeguards</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-gray-900">Enforce 2FA Authentication</h4>
                                <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-[200px]">
                                    Mandatory two-factor verification via Sendit OTP or Authenticator app.
                                </p>
                            </div>
                            <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Temporary Password</label>
                            <div className="relative">
                                <Input 
                                    type={showPassword ? "text" : "password"} 
                                    defaultValue="••••••••••••"
                                    className="h-12 bg-gray-100/50 border-gray-200 rounded-lg focus-visible:ring-blue-600 pr-12"
                                />
                                <button 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium">User will be prompted to change this upon first login.</p>
                        </div>
                    </div>
                </section>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-6 pt-8 border-t border-gray-100">
                    <Link href="/users-management" className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                        Cancel
                    </Link>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-xl font-bold shadow-lg transition-all">
                        Create Account
                    </Button>
                </div>
            </div>
        </div>
    );
}
