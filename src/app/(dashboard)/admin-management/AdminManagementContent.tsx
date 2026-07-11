"use client";

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateAdminForm from "./CreateAdminForm";
import { 
    Plus, 
    Filter, 
    Download, 
    MoreVertical, 
    Edit2, 
    CheckCircle2, 
    XCircle, 
    ShieldCheck, 
    LogIn, 
    AlertTriangle,
    FileText,
    Settings2,
    Lock
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function AdminManagementContent() {
    const [isCreating, setIsCreating] = useState(false);
    const [admins] = useState([
        {
            name: "Sarah Connor",
            email: "sarah.c@sendit.com",
            role: "Senior Dispatcher",
            permissions: ["FLEET EDIT", "SHIPMENTS"],
            security: "2FA Enabled",
            status: true,
            avatar: "/avatar.png"
        },
        {
            name: "Marcus Wright",
            email: "m.wright@sendit.com",
            role: "Support Agent",
            permissions: ["VIEW ONLY"],
            security: "2FA Disabled",
            status: true,
            avatar: "/user.png"
        },
        {
            name: "Kyle Reese",
            email: "kyle.r@sendit.com",
            role: "Regional Manager",
            permissions: ["ALL ACCESS"],
            security: "2FA Enabled",
            status: false,
            avatar: "/avatar.png"
        }
    ]);

    const securityActivities = [
        {
            icon: <LogIn className="w-4 h-4 text-green-600" />,
            iconBg: "bg-green-50",
            title: "Successful login from London, UK",
            subtitle: "Sarah Connor • 2 minutes ago"
        },
        {
            icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
            iconBg: "bg-red-50",
            title: "Failed attempt: Incorrect password",
            subtitle: "Unknown IP • 1 hour ago"
        }
    ];

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
            {isCreating ? (
                <CreateAdminForm onClose={() => setIsCreating(false)} />
            ) : (
                <>
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger className="md:hidden block" />
                                <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
                            </div>
                            <p className="text-gray-600">Configure access levels and monitor administrative security across the platform.</p>
                        </div>
                        <Button 
                            onClick={() => setIsCreating(true)}
                            className="bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl px-6 py-6 h-auto"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create Admin
                        </Button>
                    </div>

                    {/* Top Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 2FA Adoption Rate */}
                        <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">2FA Adoption Rate</span>
                                    <Badge className="bg-green-50 text-green-700 border-none font-bold text-[10px] px-2">+4.2%</Badge>
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-4xl font-bold text-gray-900">94.2%</h2>
                                    <p className="text-xs text-gray-600 font-medium">32 of 34 accounts protected</p>
                                </div>
                                <div className="flex items-end gap-1 h-12 pt-2">
                                    {[40, 60, 45, 70, 55, 90].map((h, i) => (
                                        <div key={i} className={`flex-1 rounded-sm ${i === 5 ? 'bg-blue-600' : 'bg-blue-200'}`} style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Security Activity */}
                        <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                            <CardContent className="p-6 space-y-4">
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Recent Security Activity</span>
                                <div className="space-y-4">
                                    {securityActivities.map((activity, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className={`p-2 rounded-full ${activity.iconBg}`}>
                                                {activity.icon}
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-bold text-gray-900">{activity.title}</p>
                                                <p className="text-xs text-gray-600">{activity.subtitle}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Role Distribution */}
                        <Card className="bg-[#2563EB] border-none shadow-sm rounded-2xl overflow-hidden relative">
                            <div className="absolute right-0 bottom-0 opacity-10">
                                <ShieldCheck className="w-32 h-32 text-white" />
                            </div>
                            <CardContent className="p-6 space-y-6 relative z-10">
                                <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Role Distribution</span>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-white">
                                            <span className="text-sm font-medium">Super Admins</span>
                                            <span className="text-sm font-bold">04</span>
                                        </div>
                                        <Progress value={30} className="h-1 bg-blue-400/30" indicatorClassName="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-white">
                                            <span className="text-sm font-medium">Dispatchers</span>
                                            <span className="text-sm font-bold">18</span>
                                        </div>
                                        <Progress value={60} className="h-1 bg-blue-400/30" indicatorClassName="bg-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Administrator Directory */}
                    <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                        <CardContent className="p-0">
                            <div className="p-6 flex justify-between items-center border-b border-gray-50">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xl font-bold text-gray-900">Administrator Directory</h2>
                                    <Badge className="bg-green-50 text-green-700 hover:bg-green-50 border-none px-3 py-1 rounded-full text-[10px] font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 inline-block"></span>
                                        34 Active Admins
                                    </Badge>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="h-9 border-gray-100 text-gray-700 text-xs font-bold rounded-lg px-4">
                                        <Filter className="w-3.5 h-3.5 mr-2" />
                                        Filter
                                    </Button>
                                    <Button variant="outline" className="h-9 border-gray-100 text-gray-700 text-xs font-bold rounded-lg px-4">
                                        <Download className="w-3.5 h-3.5 mr-2" />
                                        Export CSV
                                    </Button>
                                </div>
                            </div>
                            <Table>
                                <TableHeader className="bg-gray-50/50">
                                    <TableRow className="border-b border-gray-50 hover:bg-transparent">
                                        <TableHead className="text-[10px] font-bold text-gray-600 uppercase tracking-widest h-12 px-6">Administrator</TableHead>
                                        <TableHead className="text-[10px] font-bold text-gray-600 uppercase tracking-widest h-12">Role & Permissions</TableHead>
                                        <TableHead className="text-[10px] font-bold text-gray-600 uppercase tracking-widest h-12">Security</TableHead>
                                        <TableHead className="text-[10px] font-bold text-gray-600 uppercase tracking-widest h-12">Status</TableHead>
                                        <TableHead className="text-[10px] font-bold text-gray-600 uppercase tracking-widest h-12 text-right px-6">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {admins.map((admin, i) => (
                                        <TableRow key={i} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                                            <TableCell className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-10 h-10 rounded-xl">
                                                        <AvatarImage src={admin.avatar} />
                                                        <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="space-y-0.5">
                                                        <p className="text-sm font-bold text-gray-900">{admin.name}</p>
                                                        <p className="text-xs text-gray-600">{admin.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1.5">
                                                    <p className="text-sm font-medium text-blue-700">{admin.role}</p>
                                                    <div className="flex gap-1.5">
                                                        {admin.permissions.map((p, pi) => (
                                                            <Badge key={pi} className={`${p === 'ALL ACCESS' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'} border-none text-[9px] font-bold px-1.5 py-0 rounded-sm`}>
                                                                {p}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {admin.security === "2FA Enabled" ? (
                                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <ShieldCheck className="w-4 h-4 text-red-600" />
                                                    )}
                                                    <span className={`text-xs font-bold ${admin.security === "2FA Enabled" ? "text-green-700" : "text-red-700"}`}>
                                                        {admin.security}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Switch checked={admin.status} />
                                                    <span className={`text-xs font-bold ${admin.status ? "text-gray-900" : "text-gray-600"}`}>
                                                        {admin.status ? "Active" : "Deactivated"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-600 hover:text-gray-900">
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-600 hover:text-gray-900">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="p-6 flex justify-between items-center bg-gray-50/30">
                                <p className="text-xs text-gray-600 font-medium">Showing <span className="text-gray-900">1 - 10</span> of 34 administrators</p>
                                <div className="flex gap-1">
                                    <Button variant="outline" size="icon" className="w-8 h-8 border-gray-100 text-gray-600 rounded-lg">{"<"}</Button>
                                    <Button className="w-8 h-8 bg-blue-600 text-white rounded-lg text-xs font-bold">1</Button>
                                    <Button variant="ghost" className="w-8 h-8 text-gray-600 text-xs font-bold hover:bg-transparent">2</Button>
                                    <Button variant="ghost" className="w-8 h-8 text-gray-600 text-xs font-bold hover:bg-transparent">3</Button>
                                    <Button variant="outline" size="icon" className="w-8 h-8 border-gray-100 text-gray-600 rounded-lg">{">"}</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bottom Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Role Configuration */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                                <CardContent className="p-8 space-y-8">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <h2 className="text-xl font-bold text-gray-900">Role Configuration</h2>
                                            <p className="text-sm text-gray-600">Manage what each admin level is allowed to see and perform.</p>
                                        </div>
                                        <button className="text-sm font-bold text-blue-600 hover:underline">Customize Rules</button>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-4 border border-gray-50 rounded-2xl hover:bg-gray-50/50 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                                                    <Settings2 className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <h3 className="text-sm font-bold text-gray-900">Manage Finances</h3>
                                                    <p className="text-xs text-gray-600">Access to billing, invoices, and payment gateway settings.</p>
                                                </div>
                                            </div>
                                            <div className="flex -space-x-2">
                                                <div className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-600">SA</div>
                                                <div className="w-7 h-7 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-green-600">AM</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border border-gray-50 rounded-2xl hover:bg-gray-50/50 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
                                                    <Edit2 className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <h3 className="text-sm font-bold text-gray-900">Edit Shipments</h3>
                                                    <p className="text-xs text-gray-600">Modify ongoing routes, assign drivers, and update status logs.</p>
                                                </div>
                                            </div>
                                            <div className="flex -space-x-2">
                                                <div className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-600">SA</div>
                                                <div className="w-7 h-7 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-orange-600">DS</div>
                                                <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-gray-600">+4</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Security Overview & Report */}
                        <div className="space-y-8">
                            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                                <CardContent className="p-8 space-y-8">
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Security Overview</span>
                                    <div className="flex gap-4 items-center">
                                        <div className="p-3 bg-green-50 rounded-2xl">
                                            <ShieldCheck className="w-8 h-8 text-green-600" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-bold text-gray-900">Health: Excellent</h3>
                                            <p className="text-xs text-gray-600">All critical accounts secured.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 pt-4 border-t border-gray-50">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-gray-900">Hardware Key Support</span>
                                            <Badge className="bg-green-50 text-green-600 border-none text-[8px] font-bold uppercase tracking-wider">Enforced</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-gray-900">IP Whitelisting</span>
                                            <Badge className="bg-red-50 text-red-600 border-none text-[8px] font-bold uppercase tracking-wider">Disabled</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-100 border-none shadow-sm rounded-2xl overflow-hidden">
                                <CardContent className="p-8 text-center space-y-6">
                                    <div className="mx-auto w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-bold text-gray-900">Need a full compliance report?</h3>
                                    </div>
                                    <Button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold text-xs py-6 h-auto shadow-sm">
                                        Generate Audit PDF
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}


