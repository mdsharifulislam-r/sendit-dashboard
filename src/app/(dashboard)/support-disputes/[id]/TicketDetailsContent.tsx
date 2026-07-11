"use client";

import { useState } from "react";
import { 
    Paperclip, 
    Image as ImageIcon, 
    Smile, 
    Send, 
    Share2, 
    CheckCircle2,
    Lock,
    FileText,
    MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function TicketDetailsContent({ id }: { id: string }) {
    const [note, setNote] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-none text-[10px] font-bold uppercase px-3 py-1 rounded-full">
                            Damaged Item
                        </Badge>
                        <Badge variant="secondary" className="bg-red-50 text-red-700 border-none text-[10px] font-bold uppercase px-3 py-1 rounded-full">
                            High Priority
                        </Badge>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">Shipment Damaged - {id}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-none text-[14px] font-bold px-6 py-2 rounded-lg">
                        ● Pending
                    </Badge>
                    <Button variant="outline" className="bg-white border-gray-200 text-gray-700 font-bold px-6 h-12 rounded-xl flex gap-2">
                        <Share2 className="w-5 h-5" />
                        Share
                    </Button>
                    <Button className="bg-[#0052FF] hover:bg-[#0041CC] text-white font-bold px-8 h-12 rounded-xl flex gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Resolve Ticket
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Content - Communication History */}
                <div className="col-span-8 space-y-6">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8 min-h-[800px] flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <MessageCircleIcon className="w-6 h-6 text-[#0052FF]" />
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Communication History</h2>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 space-y-12">
                            {/* Sarah's Message */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-2 max-w-[80%]">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-gray-900">Sarah Johnson</span>
                                        <span className="text-xs text-gray-600 font-bold tracking-tight">10:42 AM</span>
                                    </div>
                                    <div className="bg-gray-100/80 p-6 rounded-2xl rounded-tl-none text-gray-700 text-sm leading-relaxed font-bold">
                                        Hello, I just received my package (Order #SN-9921) and the outer box is completely crushed. I opened it and the glass vase inside is shattered. This was meant to be a gift for this weekend. What can we do?
                                    </div>
                                </div>
                            </div>

                            {/* Agent A's Reply */}
                            <div className="flex gap-4 flex-row-reverse">
                                <div className="w-12 h-12 rounded-full bg-[#0052FF] flex items-center justify-center shrink-0 text-white font-bold text-sm">
                                    AA
                                </div>
                                <div className="space-y-2 max-w-[80%] flex flex-col items-end">
                                    <div className="flex items-center gap-3 flex-row-reverse">
                                        <span className="font-bold text-gray-900">Agent A</span>
                                        <span className="text-xs text-gray-600 font-bold tracking-tight">10:55 AM</span>
                                    </div>
                                    <div className="bg-[#0052FF] p-6 rounded-2xl rounded-tr-none text-white text-sm leading-relaxed font-bold">
                                        I am so sorry to hear that, Sarah. Thats definitely not the experience we want for our customers. Ive flagged this as a high-priority damage claim. Could you please upload a few photos of the box and the damaged item so I can process the insurance claim and get a replacement sent out immediately?
                                    </div>
                                </div>
                            </div>

                            {/* Sarah's Reply with Photos */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-4 max-w-[80%]">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-gray-900">Sarah Johnson</span>
                                        <span className="text-xs text-gray-600 font-bold tracking-tight">11:15 AM</span>
                                    </div>
                                    <div className="bg-gray-100/80 p-6 rounded-2xl rounded-tl-none text-gray-700 text-sm leading-relaxed font-bold">
                                        Sure, here are the photos. You can clearly see the side of the box was impacted during transit.
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-40 h-40 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                                            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" alt="Damaged Box" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="w-40 h-40 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                                            <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?w=400&h=400&fit=crop" alt="Broken Vase" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="bg-[#F8FAFC] rounded-3xl p-6 mt-8 space-y-4">
                            <Textarea 
                                placeholder={`Type your message to Sarah Johnson...`}
                                className="bg-transparent border-none focus-visible:ring-0 min-h-[100px] text-sm font-bold resize-none placeholder:text-gray-500"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4 text-gray-500">
                                    <button className="hover:text-gray-700 transition-colors">
                                        <Paperclip className="w-5 h-5" />
                                    </button>
                                    <button className="hover:text-gray-700 transition-colors">
                                        <ImageIcon className="w-5 h-5" />
                                    </button>
                                    <button className="hover:text-gray-700 transition-colors">
                                        <Smile className="w-5 h-5" />
                                    </button>
                                </div>
                                <Button className="bg-[#0052FF] hover:bg-[#0041CC] text-white font-bold px-8 h-12 rounded-xl flex gap-2">
                                    Send Reply
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-8">
                    {/* Ticket Metadata */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Ticket Metadata</h2>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 font-bold">Ticket ID</span>
                                <span className="text-sm font-bold text-gray-900">#TKT1245-A</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 font-bold">Created</span>
                                <span className="text-sm font-bold text-gray-900">Oct 24, 2023 · 10:40 AM</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 font-bold">Assigned Agent</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#0052FF] flex items-center justify-center text-[10px] text-white font-bold">AA</div>
                                    <span className="text-sm font-bold text-gray-900">Agent A</span>
                                </div>
                            </div>
                            <div className="space-y-3 pt-4 border-t border-gray-50">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">SLA Timer</span>
                                    <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest">Urgent</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-600 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <p className="text-[10px] text-gray-600 font-bold text-center uppercase tracking-tight">Resolution expected in: 42 minutes</p>
                            </div>
                        </div>
                    </div>

                    {/* Evidence Vault */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Evidence Vault</h2>
                            <Badge className="bg-gray-100 text-gray-700 border-none px-2 py-0.5 text-[10px] font-bold">4 Files</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=150&fit=crop" alt="Doc 1" className="w-full h-full object-cover opacity-90" />
                            </div>
                            <div className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?w=200&h=150&fit=crop" alt="Doc 2" className="w-full h-full object-cover opacity-90" />
                            </div>
                            <div className="aspect-video bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-2 border border-gray-100">
                                <FileText className="w-6 h-6 text-gray-600" />
                                <span className="text-[8px] font-bold text-gray-700 uppercase tracking-tighter">invoice.pdf</span>
                            </div>
                            <div className="aspect-video bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-2 border border-gray-100">
                                <ImageIcon className="w-6 h-6 text-gray-600" />
                                <span className="text-[8px] font-bold text-gray-700 uppercase tracking-tighter">ID_Proof.jpg</span>
                            </div>
                        </div>
                    </div>

                    {/* Internal Agent Notes */}
                    <div className="bg-[#EDF2F7] rounded-3xl p-8 space-y-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Lock className="w-4 h-4 text-gray-900" />
                            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Internal Agent Notes</h2>
                        </div>
                        <div className="space-y-4">
                            <Textarea 
                                placeholder="Add a private note only visible to team members..."
                                className="bg-white border-none rounded-xl min-h-[120px] p-4 text-sm font-bold placeholder:text-gray-500 shadow-sm focus-visible:ring-1 focus-visible:ring-gray-200"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            
                            {/* Existing Note */}
                            <div className="bg-white p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-gray-900 uppercase tracking-tight">Lead Supervisor</span>
                                    <span className="text-[8px] font-bold text-gray-600 uppercase">11:02 AM</span>
                                </div>
                                <p className="text-[11px] text-gray-700 font-bold leading-relaxed">
                                    Order #SN-9921 was shipped from Warehouse C. Checking surveillance footage for packing errors.
                                </p>
                            </div>

                            <Button className="w-full bg-[#1A202C] hover:bg-black text-white font-bold h-12 rounded-xl transition-all">
                                Save Note
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MessageCircleIcon({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    );
}
