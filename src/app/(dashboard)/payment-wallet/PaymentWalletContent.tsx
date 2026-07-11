"use client";

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
    Search, 
    TrendingUp,
    Filter,
    Download,
    Plus,
    MoreVertical,
    ExternalLink,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Clock,
    RotateCcw,
    Settings2,
    FileText,
    History,
    ArrowRight,
    Info,
    Eye
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { 
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function PaymentWalletPage() {
    const [activeTab, setActiveTab] = useState<"transactions" | "withdrawals">("transactions");
    const [showManualAction, setShowManualAction] = useState(false);
    const [manualActionType, setManualActionType] = useState<string>("");
    const [selectedUserForAction, setSelectedUserForAction] = useState<any>(null);
    const [userSearchTerm, setUserSearchTerm] = useState("");
    const [showDetails, setShowDetails] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [showAuditLogs, setShowAuditLogs] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Mock Users for Search
    const mockUsers = [
        { id: "USR001", name: "Sarah Johnson", email: "sarah.j@example.com", balance: "$1,240.00", avatar: "SJ" },
        { id: "USR002", name: "Emma Williams", email: "emma.w@example.com", balance: "$850.50", avatar: "EW" },
        { id: "USR003", name: "Michael Chen", email: "m.chen@example.com", balance: "$2,100.00", avatar: "MC" },
        { id: "USR004", name: "James Martinez", email: "james.m@example.com", balance: "$45.00", avatar: "JM" },
        { id: "USR005", name: "Robert Wilson", email: "r.wilson@example.com", balance: "$3,420.00", avatar: "RW" },
    ];

    const filteredUsers = userSearchTerm.length > 1 
        ? mockUsers.filter(u => 
            u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) || 
            u.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
            u.id.toLowerCase().includes(userSearchTerm.toLowerCase())
          )
        : [];

    const handleManualAction = (type: string, user?: any) => {
        setManualActionType(type);
        setSelectedUserForAction(user || null);
        setUserSearchTerm("");
        setShowManualAction(true);
    };

    const handleViewDetails = (item: any) => {
        setSelectedItem(item);
        setShowDetails(true);
    };

    const auditLogs = [
        { id: "LOG1", admin: "Admin John", action: "Manual Refund", target: "TXN5431", reason: "Customer error", date: "Apr 19, 2026 10:30 AM", oldValue: "$120.00", newValue: "$0.00 (Refunded)" },
        { id: "LOG2", admin: "Admin Sarah", action: "Withdrawal Approved", target: "WDL9874", reason: "Verified", date: "Apr 18, 2026 02:15 PM", oldValue: "Pending", newValue: "Approved" },
        { id: "LOG3", admin: "System", action: "Payout Failed", target: "WDL9873", reason: "Bank rejection", date: "Apr 17, 2026 11:45 AM", oldValue: "Processing", newValue: "Failed" },
    ];

    const stats = [
        { label: "Total Balance", amount: "$124,560.00", trend: "+12.5% from last month", icon: <TrendingUp className="w-4 h-4 text-blue-700" />, bg: "bg-blue-50" },
        { label: "Pending Earnings", amount: "$48,290.00", trend: "Across 127 transactions", icon: <TrendingUp className="w-4 h-4 text-amber-700" />, bg: "bg-amber-50" },
        { label: "Withdrawn Amount", amount: "$76,270.00", trend: "Last 30 days", icon: <TrendingUp className="w-4 h-4 text-green-700" />, bg: "bg-green-50" },
    ];  

    const transactions = [
        { id: "TXN5432", type: "Payment", user: "Sarah Johnson", amount: "$45.00", status: "Completed", date: "Apr 18, 2026", method: "Wallet", shipmentId: "SHP-9921", sender: "Sarah Johnson", receiver: "John Doe", timeline: [{ status: "Initiated", date: "Apr 18, 10:00 AM" }, { status: "Completed", date: "Apr 18, 10:05 AM" }] },
        { id: "TXN5431", type: "Refund", user: "Emma Williams", amount: "$25.00", status: "Pending", date: "Apr 17, 2026", method: "Stripe", shipmentId: "SHP-8812", sender: "Emma Williams", receiver: "Michael Ross", timeline: [{ status: "Refund Requested", date: "Apr 17, 02:30 PM" }] },
        { id: "TXN5430", type: "Commission", user: "Michael Chen", amount: "$8.50", status: "Completed", date: "Apr 17, 2026", method: "System", shipmentId: "SHP-7711", sender: "Michael Chen", receiver: "Platform", timeline: [{ status: "Calculated", date: "Apr 17, 09:00 AM" }, { status: "Paid", date: "Apr 17, 09:10 AM" }] },
        { id: "TXN5429", type: "Payment", user: "James Martinez", amount: "$120.00", status: "Failed", date: "Apr 16, 2026", method: "Card", shipmentId: "SHP-6610", sender: "James Martinez", receiver: "Alice Smith", timeline: [{ status: "Initiated", date: "Apr 16, 11:00 AM" }, { status: "Failed", date: "Apr 16, 11:02 AM" }] },
        { id: "TXN5428", type: "Adjustment", user: "Platform Admin", amount: "$10.00", status: "Completed", date: "Apr 15, 2026", method: "Manual", shipmentId: "N/A", sender: "Platform", receiver: "Sarah Johnson", timeline: [{ status: "Manual Adjustment", date: "Apr 15, 03:00 PM" }] },
    ];

    const withdrawals = [
        { id: "WDL9876", user: "Robert Wilson", amount: "$1,200.00", status: "Pending", date: "Apr 19, 2026", method: "Bank Transfer" },
        { id: "WDL9875", user: "Linda Davis", amount: "$450.00", status: "Under Review", date: "Apr 18, 2026", method: "PayPal" },
        { id: "WDL9874", user: "Kevin Lee", amount: "$890.00", status: "Processing", date: "Apr 18, 2026", method: "Bank Transfer" },
        { id: "WDL9873", user: "Maria Garcia", amount: "$2,100.00", status: "Failed", date: "Apr 17, 2026", method: "Stripe Connect" },
        { id: "WDL9872", user: "Thomas Wright", amount: "$320.00", status: "Rejected", date: "Apr 16, 2026", method: "Bank Transfer" },
    ];

    const getStatusBadgeClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'bg-green-50 text-green-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            case 'pending': return 'bg-amber-50 text-amber-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            case 'failed': return 'bg-red-50 text-red-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            case 'under review': return 'bg-blue-50 text-blue-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            case 'processing': return 'bg-purple-50 text-purple-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            case 'rejected': return 'bg-gray-100 text-gray-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            case 'reversed': return 'bg-orange-50 text-orange-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            case 'refunded': return 'bg-purple-50 text-purple-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            case 'payout processing': return 'bg-cyan-50 text-cyan-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            case 'payout rejected': return 'bg-rose-50 text-rose-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
            default: return 'bg-gray-50 text-gray-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
        }
    };

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="md:hidden block" />
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Financial Hub</h1>
                    </div>
                    <p className="text-sm font-bold text-gray-500">Manage transactions, payouts, and manual adjustments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-gray-200 text-gray-700 font-bold gap-2 bg-white shadow-sm hover:bg-gray-50">
                                <Download className="w-4 h-4" />
                                Export
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="font-bold">Export Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer font-bold">
                                <FileText className="w-4 h-4 mr-2" /> Export Transactions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer font-bold">
                                <TrendingUp className="w-4 h-4 mr-2" /> Export Payouts
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer font-bold">
                                <RotateCcw className="w-4 h-4 mr-2" /> Export Adjustments
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer font-bold text-blue-700">
                                <Download className="w-4 h-4 mr-2" /> Export Filtered View
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    {stat.icon}
                                </div>
                                <Badge variant="secondary" className="bg-gray-50 text-gray-600 font-bold border-none text-[10px]">
                                    MONTHLY
                                </Badge>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-bold text-gray-900 tracking-tight">{stat.amount}</p>
                                    <span className={`text-[11px] font-bold ${stat.label === "Total Balance" ? "text-green-600" : "text-gray-500"}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Area */}
            <Tabs defaultValue="transactions" onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
                    <TabsList className="bg-transparent border-none p-0 gap-2">
                        <TabsTrigger 
                            value="transactions" 
                            className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
                        >
                            Transactions
                        </TabsTrigger>
                        <TabsTrigger 
                            value="withdrawals" 
                            className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
                        >
                            Withdrawals
                        </TabsTrigger>
                    </TabsList>
                    
                    <div className="flex items-center gap-2 px-2">
                        <Button 
                            onClick={() => setShowFilters(true)}
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-600 font-bold gap-2 hover:bg-gray-50"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </Button>
                        <div className="w-[1px] h-4 bg-gray-200" />
                        <Button 
                            onClick={() => setShowAuditLogs(true)}
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-600 font-bold gap-2 hover:bg-gray-50"
                        >
                            <History className="w-4 h-4" />
                            Audit Logs
                        </Button>
                    </div>
                </div>

                {/* Search & Action Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input 
                            placeholder={`Search by ID, user, or amount...`} 
                            className="pl-11 bg-white border-gray-200 rounded-2xl h-12 shadow-sm focus-visible:ring-blue-600 font-bold placeholder:text-gray-400" 
                        />
                    </div>
                </div>

                <TabsContent value="transactions" className="m-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50/50">
                                <TableRow className="hover:bg-transparent border-b border-gray-100">
                                    <TableHead className="px-6 h-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Transaction</TableHead>
                                    <TableHead className="px-6 h-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sender/User</TableHead>
                                    <TableHead className="px-6 h-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Type & Method</TableHead>
                                    <TableHead className="px-6 h-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Amount</TableHead>
                                    <TableHead className="px-6 h-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</TableHead>
                                    <TableHead className="px-6 h-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((txn) => (
                                    <TableRow key={txn.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 group">
                                        <TableCell className="px-6 py-4">
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-bold text-gray-900">{txn.id}</p>
                                                <p className="text-[10px] font-bold text-gray-500 uppercase">{txn.date}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 rounded-lg border border-gray-100">
                                                    <AvatarFallback className="bg-blue-50 text-blue-700 text-[10px] font-bold">
                                                        {txn.user.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm text-gray-900 font-bold">{txn.user}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <div className="space-y-0.5">
                                                <p className="text-sm text-gray-900 font-bold">{txn.type}</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase">{txn.method}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-900">{txn.amount}</span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <Badge className={getStatusBadgeClass(txn.status)}>
                                                {txn.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {txn.status === "Pending" && (
                                                    <div className="flex items-center gap-2">
                                                        <Button size="sm" className="h-8 bg-green-700 hover:bg-green-700 text-white font-bold text-[10px] px-3 rounded-lg shadow-none hover:shadow-none transform-none transition-none select-none">Approve</Button>
                                                        <Button size="sm" variant="outline" className="h-8 border-red-200 hover:border-red-200 text-red-700 hover:text-red-700 hover:bg-transparent font-bold text-[10px] px-3 rounded-lg shadow-none hover:shadow-none transform-none transition-none select-none">Reject</Button>
                                                    </div>
                                                )}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-56">
                                                         <DropdownMenuLabel className="font-bold">Transaction Actions</DropdownMenuLabel>
                                                         <DropdownMenuSeparator />
                                                         <DropdownMenuItem onClick={() => handleViewDetails(txn)} className="font-bold gap-2 cursor-pointer">
                                                             <ExternalLink className="w-4 h-4" /> View Details
                                                         </DropdownMenuItem>
                                                         
                                                         <DropdownMenuSeparator />
                                                         <DropdownMenuLabel className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1.5">Quick Manual Actions</DropdownMenuLabel>
                                                         
                                                         <DropdownMenuItem onClick={() => handleManualAction("Refund", txn)} className="font-bold gap-2 cursor-pointer text-amber-700">
                                                             <RotateCcw className="w-4 h-4" /> Issue Refund
                                                         </DropdownMenuItem>
                                                         <DropdownMenuItem onClick={() => handleManualAction("Credit", txn)} className="font-bold gap-2 cursor-pointer text-blue-700">
                                                             <Plus className="w-4 h-4" /> Credit Wallet
                                                         </DropdownMenuItem>
                                                         <DropdownMenuItem onClick={() => handleManualAction("Deduct", txn)} className="font-bold gap-2 cursor-pointer text-red-700">
                                                             <XCircle className="w-4 h-4" /> Deduct Wallet
                                                         </DropdownMenuItem>
                                                         <DropdownMenuItem onClick={() => handleManualAction("Adjustment", txn)} className="font-bold gap-2 cursor-pointer">
                                                             <Settings2 className="w-4 h-4" /> Manual Adjustment
                                                         </DropdownMenuItem>
                                                         
                                                         <DropdownMenuSeparator />
                                                         <DropdownMenuItem onClick={() => handleManualAction("Freeze Wallet", txn)} className="font-bold gap-2 cursor-pointer text-red-700">
                                                             <AlertCircle className="w-4 h-4" /> Freeze User Wallet
                                                         </DropdownMenuItem>
                                                     </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                <TabsContent value="withdrawals" className="m-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50/50">
                                <TableRow className="hover:bg-transparent border-b border-gray-100">
                                    <TableHead className="px-6 h-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Withdrawal ID</TableHead>
                                    <TableHead className="px-6 h-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest">User</TableHead>
                                    <TableHead className="px-6 h-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Payout Method</TableHead>
                                    <TableHead className="px-6 h-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Amount</TableHead>
                                    <TableHead className="px-6 h-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</TableHead>
                                    <TableHead className="px-6 h-12 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {withdrawals.map((wdl) => (
                                    <TableRow key={wdl.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 group">
                                        <TableCell className="px-6 py-4">
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-bold text-gray-900">{wdl.id}</p>
                                                <p className="text-[10px] font-bold text-gray-500 uppercase">{wdl.date}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 rounded-lg border border-gray-100">
                                                    <AvatarFallback className="bg-blue-50 text-blue-700 text-[10px] font-bold">
                                                        {wdl.user.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm text-gray-900 font-bold">{wdl.user}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <span className="text-sm text-gray-900 font-bold">{wdl.method}</span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-900">{wdl.amount}</span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <Badge className={getStatusBadgeClass(wdl.status)}>
                                                {wdl.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {wdl.status === "Pending" && (
                                                    <div className="flex items-center gap-2">
                                                        <Button size="sm" className="h-8 bg-green-700 hover:bg-green-700 text-white font-bold text-[10px] px-3 rounded-lg shadow-none hover:shadow-none transform-none transition-none select-none">Approve</Button>
                                                        <Button size="sm" variant="outline" className="h-8 border-red-200 hover:border-red-200 text-red-700 hover:text-red-700 hover:bg-transparent font-bold text-[10px] px-3 rounded-lg shadow-none hover:shadow-none transform-none transition-none select-none">Reject</Button>
                                                    </div>
                                                )}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-56">
                                                        <DropdownMenuLabel className="font-bold">Withdrawal Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleViewDetails(wdl)} className="font-bold gap-2 cursor-pointer">
                                                            <Eye className="w-4 h-4" /> View Details
                                                        </DropdownMenuItem>
                                                        
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuLabel className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1.5">Management</DropdownMenuLabel>
                                                        
                                                        <DropdownMenuItem className="font-bold gap-2 cursor-pointer text-green-700">
                                                            <CheckCircle2 className="w-4 h-4" /> Mark as Paid
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="font-bold gap-2 cursor-pointer text-blue-700">
                                                            <Clock className="w-4 h-4" /> Hold for Review
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="font-bold gap-2 cursor-pointer text-red-700">
                                                            <XCircle className="w-4 h-4" /> Cancel Request
                                                        </DropdownMenuItem>

                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuLabel className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1.5">Manual Adjustments</DropdownMenuLabel>
                                                        
                                                        <DropdownMenuItem onClick={() => handleManualAction("Adjustment", wdl)} className="font-bold gap-2 cursor-pointer">
                                                            <Settings2 className="w-4 h-4" /> Manual Adjustment
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleManualAction("Credit", wdl)} className="font-bold gap-2 cursor-pointer text-blue-700">
                                                            <Plus className="w-4 h-4" /> Credit User
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleManualAction("Freeze Wallet", wdl)} className="font-bold gap-2 cursor-pointer text-red-700">
                                                            <AlertCircle className="w-4 h-4" /> Freeze User
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Manual Action Dialog */}
            <Dialog open={showManualAction} onOpenChange={setShowManualAction}>
                <DialogContent className="max-w-md p-0 gap-0 border-none shadow-2xl overflow-hidden">
                    <div className="bg-amber-600 p-8 text-white relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Plus className="w-24 h-24" />
                        </div>
                        <div className="relative space-y-2">
                            <Badge className="bg-white/20 text-white border-none font-bold text-[10px] tracking-widest uppercase">Admin Override</Badge>
                            <DialogTitle className="text-2xl font-bold tracking-tight">{manualActionType} Operation</DialogTitle>
                            <DialogDescription className="text-amber-100 font-bold opacity-80">
                                Perform a manual financial action. This will be logged in the audit trail.
                            </DialogDescription>
                        </div>
                    </div>

                    <div className="p-8 space-y-6 bg-white">
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target User / ID</Label>
                                
                                {selectedUserForAction ? (
                                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 rounded-xl border-2 border-white shadow-sm">
                                                <AvatarFallback className="bg-blue-600 text-white font-bold text-xs">
                                                    {selectedUserForAction.avatar || selectedUserForAction.user?.split(' ').map((n:any) => n[0]).join('') || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{selectedUserForAction.name || selectedUserForAction.user}</p>
                                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">{selectedUserForAction.id || "External User"}</p>
                                            </div>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={() => setSelectedUserForAction(null)}
                                            className="h-8 w-8 p-0 rounded-full hover:bg-blue-100 text-blue-600"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input 
                                                placeholder="Search user by name, email or ID..." 
                                                className="pl-10 font-bold bg-gray-50/50 border-gray-100 rounded-2xl h-11 focus-visible:ring-blue-600"
                                                value={userSearchTerm}
                                                onChange={(e) => setUserSearchTerm(e.target.value)}
                                            />
                                        </div>

                                        {filteredUsers.length > 0 && (
                                            <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                                <div className="max-h-[240px] overflow-y-auto p-2">
                                                    {filteredUsers.map((user) => (
                                                        <button
                                                            key={user.id}
                                                            onClick={() => {
                                                                setSelectedUserForAction(user);
                                                                setUserSearchTerm("");
                                                            }}
                                                            className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-colors text-left"
                                                        >
                                                            <Avatar className="h-9 w-9 rounded-lg border border-gray-100">
                                                                <AvatarFallback className="bg-blue-50 text-blue-700 font-bold text-[10px]">
                                                                    {user.avatar}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                                                <p className="text-[10px] font-bold text-gray-400">{user.email}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xs font-bold text-blue-700">{user.balance}</p>
                                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{user.id}</p>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            {manualActionType !== "Freeze Wallet" && (
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Amount ($)</Label>
                                    <Input type="number" placeholder="0.00" className="font-bold rounded-xl border-gray-200 h-11" />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{manualActionType === "Freeze Wallet" ? "Reason for Freezing" : "Reason / Description"}</Label>
                                <Textarea 
                                    placeholder="Explain the reason for this action..." 
                                    className="font-bold min-h-[100px] rounded-2xl border-gray-200 focus:ring-amber-500" 
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</Label>
                                <Select>
                                    <SelectTrigger className="font-bold rounded-xl border-gray-200 h-11">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                                        <SelectItem value="error" className="font-bold">Error Correction</SelectItem>
                                        <SelectItem value="promo" className="font-bold text-green-700">Promotional Credit</SelectItem>
                                        <SelectItem value="dispute" className="font-bold text-red-700">Dispute Resolution</SelectItem>
                                        <SelectItem value="other" className="font-bold">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-[11px] font-bold text-amber-800 leading-relaxed">
                                This action will be permanently recorded in the system audit logs and will affect the users account immediately.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="p-6 border-t bg-gray-50/50">
                        <Button variant="ghost" onClick={() => setShowManualAction(false)} className="font-bold rounded-xl">Cancel</Button>
                        <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl px-8 h-11 shadow-lg shadow-amber-200/50">Confirm Action</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Transaction/Withdrawal Details Dialog */}
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
                <DialogContent className="sm:max-w-[1000px] w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0 border-none shadow-2xl">
                    <div className="bg-blue-700 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp className="w-32 h-32" />
                        </div>
                        <div className="relative space-y-2">
                            <Badge className="bg-white/20 text-white border-none font-bold text-[10px] tracking-widest uppercase">Investigation View</Badge>
                            <DialogTitle className="text-3xl font-bold tracking-tight">{selectedItem?.id}</DialogTitle>
                            <DialogDescription className="text-blue-100 font-bold opacity-80">
                                Detailed financial breakdown and audit trail for this entity.
                            </DialogDescription>
                        </div>
                    </div>
                    
                    {selectedItem && (
                        <div className="p-8 space-y-8">
                            {/* Key Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</p>
                                    <p className="text-xl font-bold text-gray-900">{selectedItem.amount}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</p>
                                    <Badge className={`${getStatusBadgeClass(selectedItem.status)} border-none shadow-none`}>{selectedItem.status}</Badge>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                                    <p className="text-sm font-bold text-gray-900">{selectedItem.date}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</p>
                                    <p className="text-sm font-bold text-gray-900">{selectedItem.type || "Withdrawal"}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Details Section */}
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-700" />
                                            Parties & Entities
                                        </h4>
                                        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
                                            <div className="p-4 flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-500">Sender / User</span>
                                                <span className="text-sm font-bold text-gray-900">{selectedItem.user || selectedItem.sender}</span>
                                            </div>
                                            <div className="p-4 flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-500">Transporter</span>
                                                <span className="text-sm font-bold text-gray-900">{selectedItem.transporter || "Alex Nomad"}</span>
                                            </div>
                                            <div className="p-4 flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-500">Linked Entity</span>
                                                <span className="text-sm font-bold text-blue-700 hover:underline cursor-pointer">
                                                    {selectedItem.shipmentId || selectedItem.bookingId || "SHP-9921"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-700" />
                                            Payment Information
                                        </h4>
                                        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
                                            <div className="p-4 flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-500">Method</span>
                                                <span className="text-sm font-bold text-gray-900">{selectedItem.method}</span>
                                            </div>
                                            <div className="p-4 flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-500">Payout Target</span>
                                                <span className="text-sm font-bold text-gray-900">{selectedItem.payoutMethod || "Standard Bank"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Section */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-700" />
                                        Activity Timeline
                                    </h4>
                                    <div className="bg-gray-50/50 p-6 rounded-3xl relative">
                                        <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-blue-100">
                                            {(selectedItem.timeline || [{ status: "Entry Created", date: selectedItem.date }]).map((event: any, i: number) => (
                                                <div key={i} className="pl-8 relative">
                                                    <div className="absolute left-[-2px] top-[6px] w-3 h-3 rounded-full bg-blue-700 border-4 border-white shadow-sm" />
                                                    <p className="text-sm font-bold text-gray-900">{event.status}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{event.date}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-4">
                                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Admin Notes</Label>
                                        <Textarea 
                                            placeholder="Add internal notes..." 
                                            className="font-bold min-h-[100px] bg-amber-50/30 border-amber-100 rounded-2xl text-sm" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="p-6 border-t bg-gray-50/50 flex items-center justify-between">
                        <div className="flex gap-2">
                            {selectedItem?.status === "Pending" && (
                                <>
                                    <Button className="bg-green-700 hover:bg-green-700 text-white font-bold rounded-xl px-6 shadow-none hover:shadow-none transform-none transition-none select-none">Approve</Button>
                                    <Button variant="outline" className="border-red-200 hover:border-red-200 text-red-700 hover:text-red-700 hover:bg-transparent font-bold rounded-xl px-6 shadow-none hover:shadow-none transform-none transition-none select-none">Reject</Button>
                                </>
                            )}
                        </div>
                        <Button variant="ghost" onClick={() => setShowDetails(false)} className="font-bold rounded-xl">Close View</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Audit Logs Sheet */}
            <Sheet open={showAuditLogs} onOpenChange={setShowAuditLogs}>
                <SheetContent className="sm:max-w-md overflow-y-auto p-0 border-none shadow-2xl">
                    <div className="bg-gray-900 p-8 text-white">
                        <SheetHeader className="text-left space-y-2">
                            <Badge className="bg-blue-600 text-white border-none font-bold text-[10px] w-fit">SECURITY AUDIT</Badge>
                            <SheetTitle className="text-2xl font-bold text-white tracking-tight">System Audit Trail</SheetTitle>
                            <SheetDescription className="text-gray-400 font-bold text-sm">
                                Complete log of all administrative financial operations.
                            </SheetDescription>
                        </SheetHeader>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        {auditLogs.map((log) => (
                            <div key={log.id} className="p-5 rounded-3xl border border-gray-100 space-y-4 hover:shadow-md transition-all bg-white">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <History className="w-4 h-4 text-blue-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{log.action}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{log.date}</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-gray-100 text-gray-600 border-none font-bold text-[9px] uppercase">{log.id}</Badge>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                                        <div className="flex-1 space-y-1">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Administrator</p>
                                            <p className="text-sm font-bold text-gray-900">{log.admin}</p>
                                        </div>
                                        <div className="flex-1 space-y-1 text-right">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Entity</p>
                                            <p className="text-sm font-bold text-blue-700">{log.target}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-gray-900 rounded-2xl text-white">
                                        <span className="text-[11px] font-bold text-gray-400 line-through opacity-50">{log.oldValue}</span>
                                        <ArrowRight className="w-3 h-3 text-blue-500" />
                                        <span className="text-[11px] font-bold text-blue-400">{log.newValue}</span>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-gray-50">
                                    <p className="text-xs font-bold text-gray-600 italic leading-relaxed">
                                        <span className="text-gray-400 mr-2 not-italic font-bold text-[10px] uppercase">Reason:</span>
                                        {log.reason}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>

            {/* Filters Dialog */}
            <Dialog open={showFilters} onOpenChange={setShowFilters}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-bold text-xl">Filter Financial Data</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label className="font-bold text-gray-700">Transaction Type</Label>
                            <Select>
                                <SelectTrigger className="font-bold">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="payment" className="font-bold">Payment</SelectItem>
                                    <SelectItem value="refund" className="font-bold">Refund</SelectItem>
                                    <SelectItem value="withdrawal" className="font-bold">Withdrawal</SelectItem>
                                    <SelectItem value="commission" className="font-bold">Commission</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="font-bold text-gray-700">User</Label>
                                <Input placeholder="User name or ID" className="font-bold" />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-gray-700">Shipment / Booking ID</Label>
                                <Input placeholder="Enter ID" className="font-bold" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold text-gray-700">Status</Label>
                            <Select>
                                <SelectTrigger className="font-bold">
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="completed" className="font-bold text-green-700">Completed</SelectItem>
                                    <SelectItem value="pending" className="font-bold text-amber-700">Pending</SelectItem>
                                    <SelectItem value="failed" className="font-bold text-red-700">Failed</SelectItem>
                                    <SelectItem value="review" className="font-bold text-blue-700">Under Review</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold text-gray-700">Payment Method</Label>
                            <Select>
                                <SelectTrigger className="font-bold">
                                    <SelectValue placeholder="All Methods" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="wallet" className="font-bold">Wallet</SelectItem>
                                    <SelectItem value="card" className="font-bold">Credit/Debit Card</SelectItem>
                                    <SelectItem value="bank" className="font-bold">Bank Transfer</SelectItem>
                                    <SelectItem value="stripe" className="font-bold">Stripe</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                            <input type="checkbox" id="failed-only" className="rounded border-gray-300" />
                            <Label htmlFor="failed-only" className="font-bold text-gray-700 cursor-pointer">Show Failed / Under Review Only</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowFilters(false)} className="font-bold text-gray-500">Reset</Button>
                        <Button className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8">Apply Filters</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

