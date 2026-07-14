"use client";

import { useState, useEffect } from "react";
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
    Map,
    MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { 
    useCreateAdminMutation, 
    useUpdateAdminMutation 
} from "@/redux/apiSlices/adminsSlice";

interface CreateAdminFormProps {
    onClose: () => void;
    adminToEdit?: any;
}

export default function CreateAdminForm({ onClose, adminToEdit }: CreateAdminFormProps) {
    const [name, setName] = useState(adminToEdit?.name || "");
    const [email, setEmail] = useState(adminToEdit?.email || "");
    const [contact, setContact] = useState(adminToEdit?.contact || "");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState(adminToEdit?.admin_sub_role || "Support Agent");
    const [permissions, setPermissions] = useState<string[]>(adminToEdit?.permissions || ["Read"]);
    const [showPassword, setShowPassword] = useState(false);

    const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
    const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation();

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

    const sidebarOptions = [
        "Overview",
        "Users & Verification",
        "Trips & Shipments",
        "Payments & Wallets",
        "Risk & Policy",
        "Admin Management",
        "Audit Logs"
    ];

    const handleSave = async () => {
        if (!name || !email) {
            toast.error("Please fill in the required fields (Name, Email)");
            return;
        }

        const payload = {
            name,
            email,
            contact: contact || null,
            admin_sub_role: selectedRole,
            permissions,
            ...(password ? { password } : {})
        };

        try {
            if (adminToEdit) {
                await updateAdmin({ id: adminToEdit._id, data: payload }).unwrap();
                toast.success("Admin updated successfully!");
            } else {
                if (!password) {
                    toast.error("Password is required for new accounts");
                    return;
                }
                await createAdmin(payload).unwrap();
                toast.success("Admin created successfully!");
            }
            onClose();
        } catch (error: any) {
            console.error("Save admin error:", error);
            toast.error(error?.data?.message || "Failed to save admin profile");
        }
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Title */}
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-gray-900">
                    {adminToEdit ? "Edit Admin Profile" : "Initialize Admin Profile"}
                </h1>
                <p className="text-gray-600">
                    {adminToEdit 
                        ? "Update credentials and access controls for this administrator." 
                        : "Provision credentials and define granular access controls for new logistics personnel."}
                </p>
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
                        <Label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Full Name *</Label>
                        <Input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Jonathan Harker" 
                            className="h-12 bg-gray-100/50 border-none rounded-xl px-4" 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Email Address *</Label>
                        <Input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="j.harker@sendit.com" 
                            className="h-12 bg-gray-100/50 border-none rounded-xl px-4" 
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <Label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Phone Number</Label>
                        <Input 
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="+1 (555) 000-0000" 
                            className="h-12 bg-gray-100/50 border-none rounded-xl px-4" 
                        />
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

            {/* Sidebar Options Access */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-100 rounded-md">
                        <Settings2 className="w-4 h-4 text-gray-600" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Sidebar Permissions Access</h2>
                </div>
                <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sidebarOptions.map((option) => {
                            const isChecked = permissions.includes(option);
                            return (
                                <div key={option} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                                    <span className="text-xs font-bold text-gray-900">{option}</span>
                                    <Switch 
                                        checked={isChecked}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setPermissions(prev => [...prev, option]);
                                            } else {
                                                setPermissions(prev => prev.filter(p => p !== option));
                                            }
                                        }}
                                    />
                                </div>
                            );
                        })}
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
                <div className="grid grid-cols-1 gap-8 items-start">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                            {adminToEdit ? "Update Password (Optional)" : "Temporary Password *"}
                        </Label>
                        <div className="relative">
                            <Input 
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={adminToEdit ? "•••••••••••• (Leave blank to keep current)" : "Enter temporary password"}
                                className="h-12 bg-gray-100/50 border-none rounded-xl px-4 pr-12"
                            />
                            <button 
                                type="button"
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
                <Button 
                    onClick={handleSave}
                    disabled={isCreating || isUpdating}
                    className="bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl px-10 py-6 h-auto font-bold disabled:opacity-50"
                >
                    {isCreating || isUpdating ? "Saving..." : adminToEdit ? "Save Changes" : "Create Account"}
                </Button>
            </div>
        </div>
    );
}
