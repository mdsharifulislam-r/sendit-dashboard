"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    CheckCircle2, 
    XCircle, 
    Clock, 
    MapPin,
    ArrowRight,
    Car,
    FileText,
    Coins,
    Sparkles,
    User,
    Calendar,
    Weight,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useGetTripsByIdQuery, useDeleteTripsByIdMutation } from "@/redux/apiSlices/tripsSlice";
import { toast } from "sonner";

export default function ShipmentDetailsContent({ id }: { id: string }) {
    const { data: tripResponse, isLoading, refetch } = useGetTripsByIdQuery(id);
    const trip = tripResponse?.data;
    const [deleteTrip, { isLoading: isCancelling }] = useDeleteTripsByIdMutation();

    const handleCancelTrip = async () => {
        const reason = prompt("Enter a reason for cancelling this trip:");
        if (reason === null) return;
        if (!reason.trim()) {
            toast.error("Cancellation reason is required");
            return;
        }

        try {
            await deleteTrip({ id, reason }).unwrap();
            toast.success("Trip cancelled successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to cancel trip");
        }
    };

    if (isLoading) {
        return (
            <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen animate-pulse">
                {/* Header Skeleton */}
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <div className="h-8 bg-gray-200 rounded w-48"></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded w-36"></div>
                </div>
                {/* Content Grid Skeleton */}
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-8 h-96 bg-white rounded-3xl p-8 border border-gray-100">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 h-96 bg-white rounded-3xl p-8 border border-gray-100">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-gray-700">Trip not found</p>
                <Link href="/shipments" className="text-blue-700 font-bold hover:underline">
                    Back to Trips & Shipments List
                </Link>
            </div>
        );
    }

    const isCancelled = trip.status?.toLowerCase() === "cancelled" || trip.status?.toLowerCase() === "failed";
    const depAddress = trip.departure_address || "N/A";
    const retAddress = trip.return_address || "N/A";
    const departureDate = trip.departure_date ? new Date(trip.departure_date).toLocaleString() : "N/A";
    const returnDate = trip.return_date ? new Date(trip.return_date).toLocaleString() : "N/A";
    const travelerName = trip.user?.name || "N/A";
    const travelerEmail = trip.user?.email || "N/A";
    
    // Avatar Initials
    const initials = travelerName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "UC";

    const getStatusBadge = (status: string) => {
        switch (status?.toLowerCase()) {
            case "published":
                return <Badge className="bg-emerald-50 text-emerald-700 border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase">PUBLISHED</Badge>;
            case "active":
                return <Badge className="bg-green-50 text-green-700 border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase">ACTIVE</Badge>;
            case "completed":
                return <Badge className="bg-blue-50 text-blue-700 border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase">COMPLETED</Badge>;
            case "pending":
                return <Badge className="bg-yellow-50 text-yellow-700 border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase">PENDING</Badge>;
            case "cancelled":
            case "failed":
                return <Badge className="bg-rose-50 text-rose-700 border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase">CANCELLED</Badge>;
            default:
                return <Badge className="bg-gray-50 text-gray-700 border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase">{status || "ACTIVE"}</Badge>;
        }
    };

    return (
        <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-start">
                <div className="space-y-4">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">{trip.id || `Trip Detail`}</h1>
                    <div className="flex items-center gap-4">
                        {getStatusBadge(trip.status)}
                        <span className="text-gray-500 font-medium flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            System ID: <span className="font-mono font-bold text-gray-700">{trip._id}</span>
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button 
                        disabled={isCancelled || isCancelling}
                        onClick={handleCancelTrip}
                        className={`rounded-lg px-8 font-bold h-12 transition-colors ${
                            (isCancelled || isCancelling)
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed border-none hover:bg-gray-200" 
                                : "bg-[#FF0000] hover:bg-[#E60000] text-white cursor-pointer"
                        }`}
                    >
                        {isCancelling ? "Cancelling..." : isCancelled ? "Trip Cancelled" : "Cancel Trip"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Left Side: Route, Vehicle, Description, Rules */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    {/* Route & Schedule Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Route & Schedule</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                            {/* Connector line for large screens */}
                            <div className="hidden md:block absolute left-1/2 top-8 w-px h-16 bg-gray-100 transform -translate-x-1/2"></div>
                            
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Departure Point</p>
                                        <p className="text-lg font-bold text-gray-900">{depAddress}</p>
                                    </div>
                                </div>
                                <div className="pl-10">
                                    <p className="text-xs text-gray-500">Departure Date & Time</p>
                                    <p className="text-sm font-semibold text-gray-700 mt-0.5">{departureDate}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Return Destination</p>
                                        <p className="text-lg font-bold text-gray-900">{retAddress}</p>
                                    </div>
                                </div>
                                <div className="pl-10">
                                    <p className="text-xs text-gray-500">Return Date & Time</p>
                                    <p className="text-sm font-semibold text-gray-700 mt-0.5">{returnDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transport & Vehicle Details */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Transport & Vehicle Details</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Transport Type</p>
                                <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900 capitalize">
                                    <Car className="w-4 h-4 text-blue-600" />
                                    {trip.transport_type || "N/A"}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Vehicle Name</p>
                                <p className="text-sm font-bold text-gray-900">{trip.vehicle_details?.name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Vehicle Type</p>
                                <p className="text-sm font-bold text-gray-900">{trip.vehicle_details?.type || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Plate Number</p>
                                <p className="text-sm font-mono font-bold text-gray-700">{trip.vehicle_details?.number || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {trip.trip_description && (
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Trip Description</h2>
                            <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                {trip.trip_description}
                            </p>
                        </div>
                    )}

                    {/* Rules & Guidelines */}
                    {trip.trip_rules && trip.trip_rules.length > 0 && (
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Trip Rules & Guidelines</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {trip.trip_rules.map((rule: any) => (
                                    <div key={rule._id} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                            {rule.title}
                                        </h4>
                                        <p className="text-xs text-gray-600 leading-normal font-medium">{rule.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Traveler, Pricing, Space */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    {/* Traveler Info */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Traveler Assigned</h2>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-sm shadow-inner">
                                {initials}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{travelerName}</h3>
                                <p className="text-xs text-gray-500 font-medium">Traveler Account</p>
                            </div>
                        </div>
                        <div className="space-y-4 pt-4 border-t border-gray-50">
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</p>
                                <p className="text-sm font-bold text-gray-900 break-all">{travelerEmail}</p>
                            </div>
                        </div>
                    </div>

                    {/* Cargo Space & Pricing */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                        <div>
                            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Pricing & Space</h2>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Available Luggage Space</p>
                            <div className="flex items-center gap-2 text-2xl font-black text-gray-900">
                                <Weight className="w-6 h-6 text-blue-600" />
                                <span>{trip.available_space_kg} <span className="text-sm font-bold text-gray-500">kg</span></span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-50 space-y-4">
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Pricing Details</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Per KG</p>
                                        <p className="text-lg font-black text-blue-600 mt-1 font-mono">
                                            {trip.pricing_details?.price_per_kg ?? 0} <span className="text-xs font-bold">{trip.pricing_details?.currency || "BDT"}</span>
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Per Document</p>
                                        <p className="text-lg font-black text-blue-600 mt-1 font-mono">
                                            {trip.pricing_details?.price_per_document ?? 0} <span className="text-xs font-bold">{trip.pricing_details?.currency || "BDT"}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Carry Type Allowed</p>
                                <span className="inline-block text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full capitalize">
                                    {trip.carry_type || "Package"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Status details & timestamps */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Metadata</h2>
                        <div className="space-y-3 text-xs font-medium">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Created:</span>
                                <span className="text-gray-900 font-semibold">{trip.createdAt ? new Date(trip.createdAt).toLocaleString() : "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Last Updated:</span>
                                <span className="text-gray-900 font-semibold">{trip.updatedAt ? new Date(trip.updatedAt).toLocaleString() : "N/A"}</span>
                            </div>
                            
                            {trip.cancellation_reason && (
                                <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        Cancellation Reason
                                    </p>
                                    <p className="text-xs font-semibold leading-relaxed">{trip.cancellation_reason}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
