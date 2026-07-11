"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, UserPlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

import { MOCK_USERS, type IUser } from "@/data/demoUsers";

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState<IUser[]>(MOCK_USERS);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        role: "",
        kycStatus: "",
    });

    const filteredUsers = users.filter((user) => {
        const term = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.userId.toLowerCase().includes(term)
        );
    });

    const resetForm = () => {
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            address: "",
            role: "",
            kycStatus: "",
        });
        setFormErrors({});
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.fullName.trim()) errors.fullName = "Full name is required";
        if (!formData.email.trim()) errors.email = "Email is required";
        if (!formData.phone.trim()) errors.phone = "Phone number is required";
        if (!formData.address.trim()) errors.address = "Address is required";
        if (!formData.role) errors.role = "Role is required";
        if (!formData.kycStatus) errors.kycStatus = "KYC status is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCreateUser = () => {
        if (!validateForm()) return;

        const nextIndex = users.length + 1;
        const createdUser: IUser = {
            id: String(Date.now()),
            userId: `USR${String(nextIndex).padStart(3, "0")}`,
            name: formData.fullName.trim(),
            email: formData.email.trim(),
            joinDate: new Date().toLocaleDateString(),
            role: formData.role,
            status: "Active",
            verification: formData.kycStatus === "approved" ? "Verified" : "Unverified",
            walletBalance: "$0.00",
            eventsCreated: 0,
        };

        setUsers((prev) => [createdUser, ...prev]);
        setIsAddUserOpen(false);
        resetForm();
        alert("User created successfully");
    };

    return (
        <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-xl font-bold text-gray-900">Users Management</h1>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex gap-4 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text" 
                            placeholder="Search by name, email, phone, user ID, parcel ID" 
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-500 font-bold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
                        <Filter className="w-5 h-5" />
                    </button>
                    <Button className="bg-blue-700 hover:bg-blue-800 text-white font-bold" onClick={() => setIsAddUserOpen(true)}>
                        <UserPlus className="w-4 h-4 mr-1" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#F8FAFC] border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">User Name</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">Verification</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">Wallet Balance</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900">{user.name}</span>
                                        <span className="text-xs text-gray-700 font-bold">{user.userId}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-700 font-bold">{user.email}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-700 font-bold">{user.role}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge className={`
                                        ${user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} 
                                        border-none text-[10px] font-bold px-3 py-0.5 rounded-full
                                    `}>
                                        {user.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge className={`
                                        ${user.verification === 'Verified' ? 'bg-green-50 text-green-700' : 
                                          user.verification === 'Pending' ? 'bg-amber-50 text-amber-700' : 
                                          'bg-red-50 text-red-700'} 
                                        border-none text-[10px] font-bold px-3 py-0.5 rounded-full
                                    `}>
                                        {user.verification}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold text-gray-900">{user.walletBalance}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/users-management/${user.id}`} className="text-blue-700 text-sm font-semibold hover:underline">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={isAddUserOpen} onOpenChange={(open) => {
                setIsAddUserOpen(open);
                if (!open) resetForm();
            }}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>Create a user manually for users and verification management.</DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label className="font-bold">Full Name</Label>
                            <Input
                                value={formData.fullName}
                                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                                placeholder="Enter full name"
                            />
                            {formErrors.fullName ? <p className="text-xs text-red-600 font-semibold">{formErrors.fullName}</p> : null}
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold">Email</Label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder="user@email.com"
                            />
                            {formErrors.email ? <p className="text-xs text-red-600 font-semibold">{formErrors.email}</p> : null}
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold">Phone Number</Label>
                            <Input
                                value={formData.phone}
                                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                                placeholder="+880..."
                            />
                            {formErrors.phone ? <p className="text-xs text-red-600 font-semibold">{formErrors.phone}</p> : null}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label className="font-bold">Address</Label>
                            <Textarea
                                value={formData.address}
                                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                                placeholder="Enter address"
                                rows={3}
                            />
                            {formErrors.address ? <p className="text-xs text-red-600 font-semibold">{formErrors.address}</p> : null}
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold">Role</Label>
                            <Select value={formData.role} onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Sender">Sender</SelectItem>
                                    <SelectItem value="Traveler">Traveler</SelectItem>
                                    <SelectItem value="Transporter">Transporter</SelectItem>
                                </SelectContent>
                            </Select>
                            {formErrors.role ? <p className="text-xs text-red-600 font-semibold">{formErrors.role}</p> : null}
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold">KYC Status</Label>
                            <Select value={formData.kycStatus} onValueChange={(value) => setFormData((prev) => ({ ...prev, kycStatus: value }))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select KYC status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="not-approved">Not Approved</SelectItem>
                                </SelectContent>
                            </Select>
                            {formErrors.kycStatus ? <p className="text-xs text-red-600 font-semibold">{formErrors.kycStatus}</p> : null}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsAddUserOpen(false);
                                resetForm();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button className="bg-blue-700 hover:bg-blue-800 text-white" onClick={handleCreateUser}>
                            Create User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
