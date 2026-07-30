"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useErrorToast } from "@/hooks/useErrorToast";

import { useGetAllUsersQuery, useCreateUserMutation } from "@/redux/apiSlices/usersSlice";

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Add user form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");

    const [page, setPage] = useState(1);

    const { data: usersResponse, isLoading, isFetching } = useGetAllUsersQuery({ page, limit: 10 });
    const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
    const usersList = usersResponse?.data || [];
    const totalPages = usersResponse?.pagination?.totalPage || 1;
    const showError = useErrorToast();

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await createUser({ name, email, contact, password }).unwrap();
            toast.success(res?.message || "User created successfully!");
            setIsAddModalOpen(false);
            setName("");
            setEmail("");
            setContact("");
            setPassword("");
        } catch (error: any) {
            showError(error, "Failed to create user");
        }
    };

    const filteredUsers = usersList.filter((user: any) => {
        const term = searchTerm.toLowerCase();
        return (
            (user.name || "").toLowerCase().includes(term) ||
            (user.email || "").toLowerCase().includes(term) ||
            (user._id || "").toLowerCase().includes(term)
        );
    });

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
                    <Button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-4"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Add User Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                            Create a new user account by filling out the details below.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateUser} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Name</label>
                            <Input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="e.g. John Doe" 
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Email</label>
                            <Input 
                                type="email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="e.g. john@example.com" 
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Contact</label>
                            <Input 
                                value={contact} 
                                onChange={(e) => setContact(e.target.value)} 
                                placeholder="e.g. +1234567890" 
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Password</label>
                            <Input 
                                type="password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Enter secure password" 
                                required 
                            />
                        </div>
                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isCreating} className="bg-blue-600 hover:bg-blue-700 text-white">
                                {isCreating ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : null}
                                Create User
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

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
                        {isLoading || isFetching ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-5 bg-gray-200 rounded-full w-14"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                                    </td>
                                </tr>
                            ))
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-sm font-semibold text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user: any) => {
                                const statusText = user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1).toLowerCase() : "Active";
                                const isVerified = user.isKycVerified ? "Verified" : "Unverified";
                                const walletBal = user.wallet_balance !== undefined ? `$${(user.wallet_balance).toLocaleString()}` : "$0";
                                const userRole = user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : "Traveler";

                                return (
                                    <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-900">{user.name || "N/A"}</span>
                                                <span className="text-[10px] text-gray-700 font-mono font-semibold">{user._id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-700 font-bold">{user.email || "N/A"}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-700 font-bold">{userRole}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge className={`
                                                ${statusText === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} 
                                                border-none text-[10px] font-bold px-3 py-0.5 rounded-full
                                            `}>
                                                {statusText}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge className={`
                                                ${isVerified === 'Verified' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} 
                                                border-none text-[10px] font-bold px-3 py-0.5 rounded-full
                                            `}>
                                                {isVerified}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-900">{walletBal}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/users-management/${user._id}`} className="text-blue-700 text-sm font-semibold hover:underline">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white px-4 py-3 border-t border-gray-100 sm:px-6 rounded-b-xl">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700 font-bold">
                                Showing page <span className="font-bold">{page}</span> of <span className="font-bold">{totalPages}</span>
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1 || isFetching}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages || isFetching}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
