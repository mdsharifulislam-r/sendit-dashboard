"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
    CheckCircle2, 
    Circle, 
    MoreHorizontal, 
    MapPin, 
    Cloud, 
    ExternalLink,
    Send,
    Play
} from "lucide-react";
import Image from "next/image";

export default function ShipmentDetailsContent({ id }: { id: string }) {
    const [note, setNote] = useState("");

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-start">
                <div className="space-y-4">
                    <h1 className="text-6xl font-black text-gray-900 tracking-tighter">{id}</h1>
                    <div className="flex items-center gap-4">
                        <Badge className="bg-[#00FF85] text-[#006B48] hover:bg-[#00FF85] border-none px-4 py-1.5 rounded-full text-xs font-black uppercase">
                            IN TRANSIT
                        </Badge>
                        <span className="text-gray-500 font-medium flex items-center gap-2">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            Expedited Priority
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button className="bg-[#0052FF] hover:bg-[#0041CC] text-white rounded-lg px-8 font-bold h-12">
                        Correct Status
                    </Button>
                    <Button className="bg-[#FF5C00] hover:bg-[#E65300] text-white rounded-lg px-8 font-bold h-12">
                        Reopen Issue
                    </Button>
                    <Button variant="destructive" className="bg-[#FF0000] hover:bg-[#E60000] text-white rounded-lg px-8 font-bold h-12">
                        Cancel Shipment
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Left Side - Info Cards and Map */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    {/* Info Cards Grid */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">SENDER INFORMATION</p>
                            <h3 className="text-xl font-bold text-gray-900">Sarah Johnson</h3>
                            <p className="text-sm text-gray-600 mt-1">Certified Platinum Member</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">TRAVELER ASSIGNED</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#0052FF] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    UC
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Michael Chen</h3>
                                    <p className="text-sm text-gray-600 mt-1">Rating: 4.9/5.0</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">CARGO SPECIFICATIONS</p>
                            <h3 className="text-3xl font-bold text-gray-900">2.5 <span className="text-lg text-gray-600">kg</span></h3>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">DECLARED VALUATION</p>
                            <h3 className="text-3xl font-bold text-gray-900">$ 150.00 <span className="text-lg text-gray-600 uppercase">usd</span></h3>
                        </div>
                    </div>

                    {/* Map Visualization Container */}
                    <div className="bg-white p-2 rounded-[40px] shadow-sm border border-gray-100 relative h-[400px] overflow-hidden">
                        <div className="w-full h-full bg-[#E5E7EB] rounded-[36px] relative">
                            {/* SVG for the path */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400">
                                <path 
                                    d="M200 300 Q 400 100 600 150" 
                                    fill="none" 
                                    stroke="white" 
                                    strokeWidth="3" 
                                    strokeDasharray="8 8"
                                    className="opacity-100"
                                />
                                <circle cx="200" cy="300" r="6" fill="white" />
                                <circle cx="600" cy="150" r="6" fill="white" />
                            </svg>
                            
                            {/* Current Location Pin */}
                            <div className="absolute left-[180px] top-[260px] flex flex-col items-center">
                                <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 min-w-[200px]">
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">CURRENT LOCATION</p>
                                    <p className="text-sm font-bold text-gray-900">Chicago Logistics Hub - Terminal B</p>
                                </div>
                                <div className="w-1 h-8 bg-white/50"></div>
                                <div className="w-4 h-4 bg-white rounded-full border-4 border-[#0052FF]"></div>
                            </div>

                            {/* Estimated Delivery Pin */}
                            <div className="absolute right-[160px] top-[180px] text-right">
                                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/20 min-w-[150px]">
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">ESTIMATED DELIVERY</p>
                                    <p className="text-sm font-bold text-gray-900">Oct 24, 2023 - 14:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Timeline */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 h-full">
                        <h2 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-10">SHIPMENT TIMELINE</h2>
                        
                        <div className="space-y-12 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

                            {/* Timeline Steps */}
                            {[
                                { title: "Shipment Created", time: "Oct 20, 2023 • 09:15 AM", status: "completed" },
                                { title: "Pickup Scheduled", time: "Oct 21, 2023 • 02:30 PM", status: "completed" },
                                { title: "In Transit", time: "Oct 22, 2023", sub: "Current State", status: "current" },
                                { title: "Out for Delivery", sub: "Pending Arrival", status: "pending" },
                                { title: "Delivered", sub: "Final Destination", status: "pending" },
                            ].map((step, index) => (
                                <div key={index} className="flex gap-6 relative">
                                    <div className="relative z-10 flex items-center justify-center">
                                        {step.status === "completed" ? (
                                            <div className="w-6 h-6 bg-[#00FF85] rounded-full flex items-center justify-center">
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                        ) : step.status === "current" ? (
                                            <div className="w-6 h-6 bg-[#0052FF] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                        ) : (
                                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={step.status === "pending" ? "opacity-50" : ""}>
                                        <h4 className="text-base font-bold text-gray-900">{step.title}</h4>
                                        <p className="text-xs font-bold text-gray-600 mt-1">
                                            {step.sub && <span className="text-[#0052FF] mr-1">{step.sub} •</span>}
                                            {step.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Row - Media and Notes */}
                <div className="col-span-12 lg:col-span-6">
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 h-full">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">SHIPMENT MEDIA</h2>
                                <p className="text-xs text-gray-600 mt-1">Stored securely in external storage</p>
                            </div>
                            <Cloud className="text-gray-500 w-6 h-6" />
                        </div>

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4">
                                <div className="h-32 bg-gray-100 rounded-2xl overflow-hidden relative group cursor-pointer">
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                        <Play className="text-white opacity-0 group-hover:opacity-100 w-8 h-8" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="h-32 bg-gray-100 rounded-2xl overflow-hidden relative group cursor-pointer">
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="h-32 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center text-gray-600 text-sm font-bold">
                                    + 4 more
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-[#F8FAFF] p-6 rounded-3xl flex items-center justify-between border border-[#E0E7FF]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-[#E0E7FF] shadow-sm">
                                    <Cloud className="text-[#0052FF] w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Amazon S3 Repository</h4>
                                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tight">SHP-MEDIA-PROD-US-EAST-1</p>
                                </div>
                            </div>
                            <Button className="bg-[#0052FF] hover:bg-[#0041CC] text-white rounded-xl px-6 font-bold gap-2">
                                Open S3 Folder
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-6">
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">INTERNAL NAVIGATOR NOTES</h2>
                            <button className="text-[#0052FF] text-[10px] font-black uppercase tracking-widest hover:underline">ADD NOTE</button>
                        </div>

                        <div className="flex-1 space-y-8">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#FFB800] overflow-hidden shrink-0">
                                    {/* Placeholder for Avatar */}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="text-sm font-bold text-gray-900">Jane Doe</h4>
                                        <span className="text-[10px] font-bold text-gray-300 uppercase">2 hours ago</span>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Package verified at terminal hub. Content matches declaration. Weight discrepancy of 0.1kg noted but within tolerance.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#0052FF] overflow-hidden shrink-0">
                                    {/* Placeholder for Avatar */}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="text-sm font-bold text-gray-900">Alex Miller</h4>
                                        <span className="text-[10px] font-bold text-gray-300 uppercase">Oct 21 • 04:45 PM</span>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Confirmed pickup with Michael Chen. Vehicle inspection passed. Scheduled for Chicago Hub arrival tonight.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 relative">
                            <Input 
                                placeholder="Type a note for the team..." 
                                className="h-16 bg-[#F3F4F6] border-none rounded-2xl pl-6 pr-16 text-sm font-medium"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-300 hover:text-[#0052FF] transition-colors shadow-sm">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
