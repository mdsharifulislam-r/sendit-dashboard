"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
    User, 
    Shield, 
    Settings2, 
    Lock, 
    Eye, 
    EyeOff,
    LayoutGrid,
    Truck,
    Wallet,
    History,
    Map,
    MessageSquare,
    Check
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CreateAdminFormProps {
    onClose: () => void;
}

export default function CreateAdminForm({ onClose }: CreateAdminFormProps) {
    const [selectedRole, setSelectedRole] = useState("Super Admin");
    const [showPassword, setShowPassword] = useState(false);
    const [moduleAccess, setModuleAccess] = useState({
        shipments: true,
        financial: false,
        fleet: true,
        security: false
    });

    const roles = [
        {
            title: "Super Admin",
            description: "Full system access and financial control.",
            icon: <Shield className="w-5 h-5" />
        },
        {
            title: "Senior Dispatcher",
            description: "Manage fleet and complex shipment routes.",
            icon: <Map className="w-5 h-5" />
        },
        {
            title: "Regional Manager",
            description: "Analytics and performance for specific zones.",
            icon: <LayoutGrid className="w-5 h-5" />
        },
        {
            title: "Support Agent",
            description: "Ticketing and basic shipment updates.",
            icon: <MessageSquare className="w-5 h-5" />
        }
    ];

    const modules = [
        {
            id: "shipments",
            title: "Shipments Management",
            description: "Create, track, and modify cargo flows.",
            icon: <Truck className="w-5 h-5 text-blue-600" />,
            bg: "bg-blue-50"
        },
        {
            id: "financial",
            title: "Financial Ledger",
            description: "View invoices, revenue reports, and settlements.",
            icon: <Wallet className="w-5 h-5 text-green-600" />,
            bg: "bg-green-50"
        },
        {
            id: "fleet",
            title: "Fleet Management",
            description: "Assign drivers and monitor vehicle maintenance.",
            icon: <Truck className="w-5 h-5 text-green-600" />,
            bg: "bg-green-50"
        },
        {
            id: "security",
            title: "Security Logs",
            description: "Audit trails, access history, and system alerts.",
            icon: <History className="w-5 h-5 text-red-600" />,
            bg: "bg-red-50"
        }
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Title */}
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-gray-900">Initialize Admin Profile</h1>
                <p className="text-gray-600">Provision credentials and define granular access controls for new logistics personnel.</p>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-50 rounded-md">
                        <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Full Name</Label>
                        <Input placeholder="e.g. Jonathan Harker" className="h-12 bg-gray-100/50 border-none rounded-xl px-4" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Email Address</Label>
                        <Input placeholder="j.harker@sendit.com" className="h-12 bg-gray-100/50 border-none rounded-xl px-4" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <Label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Phone Number</Label>
                        <Input placeholder="+1 (555) 000-0000" className="h-12 bg-gray-100/50 border-none rounded-xl px-4" />
                    </div>
                </div>
            </div>

            {/* Administrative Role */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-50 rounded-md">
                        <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Administrative Role</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {roles.map((role) => (
                        <div 
                            key={role.title}
                            onClick={() => setSelectedRole(role.title)}
                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                                selectedRole === role.title 
                                ? "border-blue-600 bg-blue-50/30" 
                                : "border-gray-50 bg-white hover:border-gray-100"
                            }`}
                        >
                            <div className={`${selectedRole === role.title ? "text-blue-600" : "text-gray-600"}`}>
                                {role.icon}
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold text-gray-900">{role.title}</h3>
                                <p className="text-[11px] text-gray-600 leading-relaxed">{role.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Granular Module Access */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-100 rounded-md">
                        <Settings2 className="w-4 h-4 text-gray-600" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Granular Module Access</h2>
                </div>
                <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                    <CardContent className="p-6 space-y-4">
                        {modules.map((module) => (
                            <div 
                                key={module.id}
                                className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-xl ${module.bg}`}>
                                        {module.icon}
                                    </div>
                                    <div className="space-y-0.5">
                                        <h3 className="text-sm font-bold text-gray-900">{module.title}</h3>
                                        <p className="text-[11px] text-gray-600">{module.description}</p>
                                    </div>
                                </div>
                                <div 
                                    onClick={() => setModuleAccess(prev => ({ ...prev, [module.id]: !prev[module.id as keyof typeof prev] }))}
                                    className={`w-6 h-6 rounded-md border flex items-center justify-center cursor-pointer transition-colors ${
                                        moduleAccess[module.id as keyof typeof moduleAccess]
                                        ? "bg-blue-600 border-blue-600"
                                        : "bg-gray-200 border-gray-200"
                                    }`}
                                >
                                    {moduleAccess[module.id as keyof typeof moduleAccess] && <Check className="w-4 h-4 text-white" />}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Security & Safeguards */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-50 rounded-md">
                        <Lock className="w-4 h-4 text-red-600" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Security & Safeguards</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold text-gray-900">Enforce 2FA Authentication</h3>
                                <p className="text-[11px] text-gray-600">Mandatory two-factor verification via Sendit OTP or Authenticator app.</p>
                            </div>
                            <Switch defaultChecked />
                        </CardContent>
                    </Card>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Temporary Password</Label>
                        <div className="relative">
                            <Input 
                                type={showPassword ? "text" : "password"}
                                defaultValue="••••••••••••"
                                className="h-12 bg-gray-100/50 border-none rounded-xl px-4 pr-12"
                            />
                            <button 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-600">User will be prompted to change this upon first login.</p>
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-8 border-t border-gray-100 flex justify-end gap-6 items-center">
                <button 
                    onClick={onClose}
                    className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                    Cancel
                </button>
                <Button className="bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl px-10 py-6 h-auto font-bold">
                    Create Account
                </Button>
            </div>
        </div>
    );
}
