"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";
import { Pagination } from "antd";

import { useGetAlltripsQuery } from "@/redux/apiSlices/tripsSlice";

export default function ShipmentsContent() {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    
    const { data: tripsResponse, isLoading } = useGetAlltripsQuery({ searchTerm, page, limit: 10 });
    const tripsList = tripsResponse?.data || [];
    const meta = tripsResponse?.meta;

    const getRiskBadgeClass = (risk: string) => {
        return risk.toLowerCase() === 'flagged' 
            ? 'bg-red-50 text-red-700 border-none px-4 py-1 rounded-full text-[10px] font-bold' 
            : 'bg-green-50 text-green-700 border-none px-4 py-1 rounded-full text-[10px] font-bold';
    };

    return (
        <div className="p-8 space-y-6 bg-[#F9F9F9] min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Trips & Shipments</h1>
            </div>

            {/* Filters Row */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input 
                        placeholder="Search shipments..." 
                        className="pl-10 bg-transparent border border-gray-200 rounded-lg h-11 focus-visible:ring-blue-600 placeholder:text-gray-500 w-full" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">TRIP ID</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">TRAVELER</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">DEPARTURE ADDRESS</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">RETURN ADDRESS</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">CARRY TYPE</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">PRICING DETAILS</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">DATE</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider">RISK FLAG</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                                    <td className="px-6 py-4"><div className="h-5 bg-gray-200 rounded-full w-14"></div></td>
                                    <td className="px-6 py-4 text-right"><div className="h-4 bg-gray-200 rounded w-10 ml-auto"></div></td>
                                </tr>
                            ))
                        ) : tripsList.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="px-6 py-8 text-center text-sm font-semibold text-gray-500">
                                    No trips found
                                </td>
                            </tr>
                        ) : (
                            tripsList.map((trip: any) => {
                                const tripDate = trip.departure_date ? new Date(trip.departure_date).toLocaleDateString() : "N/A";
                                const travelerName = trip.user?.name || "N/A";
                                const departureAddress = trip.departure_address || "N/A";
                                const returnAddress = trip.return_address || "N/A";
                                const carryType = trip.carry_type || "N/A";
                                
                                const currency = trip.pricing_details?.currency || "BDT";
                                const priceKg = trip.pricing_details?.price_per_kg ?? "N/A";
                                const priceDoc = trip.pricing_details?.price_per_document ?? "N/A";
                                const pricingText = `${priceKg} ${currency}/kg, ${priceDoc} ${currency}/Doc`;
                                const riskText = trip.status || "Normal";

                                return (
                                    <tr key={trip._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono font-bold text-xs text-gray-900">
                                            {trip.id || trip._id}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                            {travelerName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {departureAddress}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {returnAddress}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-800 capitalize bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                                                {carryType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 font-mono">
                                            {pricingText}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {tripDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={getRiskBadgeClass(riskText)}>
                                                {riskText}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link 
                                                href={`/shipments/${trip._id}`}
                                                className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
                {meta?.total && meta.total > 0 ? (
                    <div className="flex justify-end p-4 border-t border-gray-100 bg-white">
                        <Pagination
                            current={page}
                            pageSize={meta.limit || 10}
                            total={meta.total}
                            onChange={(newPage) => setPage(newPage)}
                            showSizeChanger={false}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
