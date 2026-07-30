"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
    Paperclip,
    Image as ImageIcon,
    Smile,
    Send,
    Share2,
    CheckCircle2,
    Lock,
    FileText,
    RefreshCw,
    ArrowLeft,
    User,
    Plus,
    Tag,
    ChevronDown,
    ChevronUp,
    DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
    useGetSingleReportQuery,
    useUpdateReportStatusMutation,
    useGetMessagesQuery,
    useSendMessageMutation,
    useGetTicketsByReportQuery,
    useCreateTicketMutation,
    TicketItem
} from "@/redux/apiSlices/supportSlice";
import { useProfileQuery } from "@/redux/apiSlices/authSlice";
import { toast } from "sonner";
import { useErrorToast } from "@/hooks/useErrorToast";
import { io } from "socket.io-client";
import { imageUrl } from "@/redux/api/baseApi";

interface LocalMessage {
    _id: string;
    sender: {
        _id: string;
        name: string;
        email: string;
        image: string | null;
    };
    message: string;
    type: string;
    images?: string[];
    documents?: string[];
    createdAt: string;
}

export default function TicketDetailsContent({ id }: { id: string }) {
    const showError = useErrorToast();
    const [note, setNote] = useState("");
    const [messageInput, setMessageInput] = useState("");

    // Refund state
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
    const [refundAmount, setRefundAmount] = useState("");
    const [isRefunding, setIsRefunding] = useState(false);

    // File upload states
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const docInputRef = useRef<HTMLInputElement>(null);

    const chatEndRef = useRef<HTMLDivElement>(null);

    // Fetch current admin profile to verify message sender
    const { data: profileResponse } = useProfileQuery(undefined);
    const currentUserId = profileResponse?.data?._id;

    // Fetch report details
    const { data: reportResponse, isLoading: isLoadingReport, refetch: refetchReport } = useGetSingleReportQuery(id, { skip: !id });
    const report = reportResponse?.data;
    const [page, setPage] = useState(1);

    // Fetch messages based on chatId and reportId
    const {
        data: messagesResponse,
        isLoading: isLoadingMessages,
        refetch: refetchMessages
    } = useGetMessagesQuery(
        { chatId: report?.chat!, reportId: report?._id!, page, limit: 10 },
        { skip: !report?.chat || !report?._id }
    );
    console.log(messagesResponse, "messages Response")
    const [updateReportStatus, { isLoading: isUpdating }] = useUpdateReportStatusMutation();
    const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

    // Pagination state
    const [allMessages, setAllMessages] = useState<LocalMessage[]>([]);

    useEffect(() => {
        if (messagesResponse?.data) {
            setAllMessages(prev => {
                const map = new Map(prev.map(msg => [msg._id, msg]));
                (messagesResponse.data as LocalMessage[]).forEach(msg => {
                    map.set(msg._id, msg);
                });
                return Array.from(map.values()).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            });
        }
    }, [messagesResponse?.data]);

    // Combine messages list with fallback to ticket description as the initial message
    const messagesList = useMemo(() => {
        if (allMessages.length === 0 && report) {
            return [
                {
                    _id: "initial-description",
                    sender: {
                        _id: report.user?._id || "user",
                        name: report.user?.name || "User",
                        email: report.user?.email || "",
                        image: report.user?.image || null
                    },
                    message: report.description || "No description provided.",
                    type: "text",
                    images: report.attachments || [],
                    documents: [],
                    createdAt: report.createdAt
                }
            ];
        }
        // Sort chronologically: oldest first (top), newest last (bottom near input box)
        return [...allMessages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }, [allMessages, report]);

    // Listen for real-time messages via Socket.IO
    useEffect(() => {
        if (!report?.chat) return;

        const socket = io(imageUrl, {
            transports: ["websocket"],
            query: {
                service: "communication",
            },
        });

        // Listen for new messages in the specific chat room
        const eventName = `message::${report.chat}`;

        socket.on(eventName, (data: any) => {
            console.log("Realtime message received:", data);
            refetchMessages();
        });

        // Fallback for general message channel
        socket.on("message", (data: any) => {
            if (data?.chat === report.chat) {
                console.log("General message matched current chat:", data);
                refetchMessages();
            }
        });

        return () => {
            socket.off(eventName);
            socket.off("message");
            socket.disconnect();
        };
    }, [report?.chat, refetchMessages]);

    // Auto scroll to bottom when messages update
    useEffect(() => {
        // Only scroll to bottom if we are on page 1, otherwise it will snap down when loading older messages
        if (page === 1) {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messagesList, page]);
    // Handle Refund Action
    const handleRefundSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!refundAmount) return;
        setIsRefunding(true);
        try {
            // Wait for backend integration, for now just simulate
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success(`Refund of $${refundAmount} processed successfully.`);
            setIsRefundModalOpen(false);
            setRefundAmount("");
        } catch (error) {
            toast.error("Failed to process refund.");
        } finally {
            setIsRefunding(false);
        }
    };

    // Handle Resolution Action
    const handleResolve = async () => {
        try {
            const res = await updateReportStatus({ id, status: "closed" }).unwrap();
            toast.success(res?.message || "Ticket resolved successfully!");
            refetchReport();
        } catch (err) {
            showError(err);
        }
    };

    // Send chat reply to backend using form-data
    const handleSendReply = async () => {
        if (!messageInput.trim() && selectedImages.length === 0 && selectedDocs.length === 0) return;
        if (!report?.chat) {
            toast.error("No active chat channel found for this ticket.");
            return;
        }

        const formData = new FormData();
        formData.append("chat", report.chat);
        if (report._id) {
            formData.append("report", report._id);
        }

        if (messageInput.trim()) {
            formData.append("message", messageInput.trim());
        }

        // Set correct type according to attachments
        let type = "text";
        if (selectedImages.length > 0) {
            type = "image";
        } else if (selectedDocs.length > 0) {
            type = "document";
        }
        formData.append("type", type);

        // Append files under images/documents keys matching API format
        selectedImages.forEach((file) => {
            formData.append("images", file);
        });
        selectedDocs.forEach((file) => {
            formData.append("documents", file);
        });
        Object.entries(formData).forEach(([key, value]) => {
            console.log(key, value)
        })
        try {
            const res = await sendMessage(formData).unwrap();
            console.log(res, "message send  ress")
            setMessageInput("");
            setSelectedImages([]);
            setSelectedDocs([]);
            refetchMessages();
        } catch (err) {
            showError(err);
        }
    };

    // Add private note simulated
    const handleSaveNote = () => {
        if (!note.trim()) return;
        toast.success("Internal note saved successfully!");
        setNote("");
    };

    const isLoading = isLoadingReport || (report?.chat && isLoadingMessages);

    if (isLoading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-center bg-[#F8FAFC] space-y-3">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-sm font-bold text-gray-800">Loading dispute details...</p>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-center bg-[#F8FAFC] p-8 space-y-3">
                <p className="text-lg font-bold text-gray-800">Ticket not found</p>
                <Link href="/support-disputes" className="text-sm font-bold text-blue-600 hover:underline">
                    Back to Support & Disputes
                </Link>
            </div>
        );
    }

    const isClosed = report.status?.toLowerCase() === "closed";
    const isPayment = report.report_type?.toLowerCase().includes("payment");

    return (
        <div className="p-6 md:p-8 space-y-8 bg-[#F8FAFC] min-h-screen">
            {/* Hidden Input Selectors */}
            <input
                type="file"
                ref={imageInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={(e) => {
                    if (e.target.files) {
                        setSelectedImages((prev) => [...prev, ...Array.from(e.target.files!)]);
                    }
                }}
            />
            <input
                type="file"
                ref={docInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                multiple
                onChange={(e) => {
                    if (e.target.files) {
                        setSelectedDocs((prev) => [...prev, ...Array.from(e.target.files!)]);
                    }
                }}
            />

            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Link
                            href="/support-disputes"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 mr-1"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <Badge className={`${isPayment ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'} border text-[10px] font-bold uppercase px-3 py-1 rounded-full`}>
                            {report.report_type}
                        </Badge>
                        <Badge className="bg-slate-100 text-slate-700 border-none text-[10px] font-bold uppercase px-3 py-1 rounded-full">
                            {isPayment ? "High Priority" : "Medium Priority"}
                        </Badge>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                        Dispute Ticket - {report.report_id}
                    </h1>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Badge className={`${isClosed ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'} border text-[13px] font-bold px-4 py-1.5 rounded-lg capitalize`}>
                        ● {report.status || "open"}
                    </Badge>
                    {!isClosed && (
                        <Button
                            onClick={() => setIsRefundModalOpen(true)}
                            variant="outline"
                            className="text-white border-red-200 bg-red-600 hover:bg-red-700 hover:text-white font-bold px-4 h-11 rounded-xl flex gap-2"
                        >
                            <DollarSign className="w-4.5 h-4.5" />
                            <span>Refund</span>
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        onClick={() => toast.success("Shared ticket parameters copied to clipboard.")}
                        className="bg-white border-gray-200 text-gray-700 font-bold px-4 h-11 rounded-xl flex gap-2"
                    >
                        <Share2 className="w-4.5 h-4.5" />
                        <span>Share</span>
                    </Button>
                    {!isClosed && (
                        <Button
                            onClick={handleResolve}
                            disabled={isUpdating}
                            className="bg-[#0052FF] hover:bg-[#0041CC] text-white font-bold px-6 h-11 rounded-xl flex gap-2"
                        >
                            <CheckCircle2 className="w-4.5 h-4.5" />
                            <span>Resolve Ticket</span>
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Main Content - Communication History with Fixed Height */}
                <div className="xl:col-span-8 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-4 h-[680px] flex flex-col">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 shrink-0">
                            <MessageCircleIcon className="w-6 h-6 text-[#0052FF]" />
                            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Communication History</h2>
                        </div>

                        {/* Scrollable Chat Messages Container */}
                        <div className="flex-1 space-y-8 overflow-y-auto pr-2 scrollbar-thin">
                            {messagesResponse?.pagination && messagesResponse.pagination.page < messagesResponse.pagination.totalPage && (
                                <div className="flex justify-center mb-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(p => p + 1)}
                                        disabled={isLoadingMessages}
                                        className="text-xs text-[#0052FF] border-[#0052FF] hover:bg-blue-50"
                                    >
                                        {isLoadingMessages ? (
                                            <>
                                                <RefreshCw className="w-3 h-3 mr-2 animate-spin" /> Loading...
                                            </>
                                        ) : (
                                            "Load Older Messages"
                                        )}
                                    </Button>
                                </div>
                            )}
                            {messagesList.map((msg) => {
                                // Decide alignment: admin/agent messages go to right side
                                const isAgentMsg = msg.sender?._id === currentUserId || msg.sender?._id !== report.user?._id;
                                const formattedTime = new Date(msg.createdAt).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                });

                                return (
                                    <div key={msg._id} className={`flex gap-4 ${isAgentMsg ? "flex-row-reverse" : ""}`}>
                                        {isAgentMsg ? (
                                            <div className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center shrink-0 text-white font-bold text-xs uppercase shadow-sm">
                                                AG
                                            </div>
                                        ) : msg.sender?.image ? (
                                            <img
                                                src={msg.sender.image}
                                                alt={msg.sender.name}
                                                className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-150"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 border border-gray-200">
                                                <User className="w-4 h-4" />
                                            </div>
                                        )}
                                        <div className={`space-y-1.5 max-w-[80%] ${isAgentMsg ? "flex flex-col items-end" : ""}`}>
                                            <div className={`flex items-center gap-3 ${isAgentMsg ? "flex-row-reverse" : ""}`}>
                                                <span className="font-bold text-gray-900 text-xs">{msg.sender?.name || "User"}</span>
                                                <span className="text-[10px] text-gray-400 font-semibold">{formattedTime}</span>
                                            </div>
                                            {msg.message && (
                                                <div className={`p-4 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm ${isAgentMsg
                                                    ? "bg-[#0052FF] text-white rounded-tr-none"
                                                    : "bg-gray-50 text-gray-700 rounded-tl-none border border-gray-100"
                                                    }`}>
                                                    {msg.message}
                                                </div>
                                            )}

                                            {/* Render images attached to this message */}
                                            {msg.images && msg.images.length > 0 && (
                                                <div className="flex flex-wrap gap-3 mt-2">
                                                    {msg.images.map((imgUrl, imgIdx) => (
                                                        <div key={imgIdx} className="w-32 h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm relative group cursor-pointer">
                                                            <img
                                                                src={imgUrl}
                                                                alt={`Attachment-${imgIdx}`}
                                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Render documents attached to this message */}
                                            {msg.documents && msg.documents.length > 0 && (
                                                <div className="flex flex-col gap-2 mt-2">
                                                    {msg.documents.map((docUrl, docIdx) => {
                                                        const docName = docUrl.split("/").pop() || "document";
                                                        return (
                                                            <a
                                                                key={docIdx}
                                                                href={docUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 p-2.5 rounded-xl text-xs font-semibold text-slate-700 w-fit"
                                                            >
                                                                <FileText className="w-4 h-4 text-blue-500" />
                                                                <span className="truncate max-w-[200px]">{docName}</span>
                                                            </a>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Status banner if closed */}
                        {isClosed && (
                            <div className="p-3 bg-green-50/50 rounded-xl border border-green-100 text-center text-xs font-bold text-green-800 shrink-0">
                                ✅ This dispute ticket has been resolved and closed.
                            </div>
                        )}

                        {/* Input Area (Pinned to bottom of the card - always visible) */}
                        <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 shrink-0">
                            {/* Attachment Previews */}
                            {(selectedImages.length > 0 || selectedDocs.length > 0) && (
                                <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b border-gray-200 shrink-0">
                                    {selectedImages.map((file, idx) => (
                                        <div key={`img-${idx}`} className="relative w-16 h-16 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                                            <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setSelectedImages((prev) => prev.filter((_, i) => i !== idx))}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] hover:bg-red-650 font-bold"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    {selectedDocs.map((file, idx) => (
                                        <div key={`doc-${idx}`} className="relative flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-gray-700">
                                            <FileText className="w-3.5 h-3.5 text-blue-500" />
                                            <span className="max-w-[120px] truncate">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedDocs((prev) => prev.filter((_, i) => i !== idx))}
                                                className="bg-gray-150 text-gray-500 hover:text-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold transition-colors"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Textarea
                                placeholder={`Type your reply to ${report.user?.name || "User"}...`}
                                className="bg-transparent border-none focus-visible:ring-0 min-h-[80px] text-xs font-bold resize-none placeholder:text-gray-500"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                            />
                            <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-2">
                                <div className="flex items-center gap-4 text-gray-400">
                                    <button
                                        type="button"
                                        onClick={() => docInputRef.current?.click()}
                                        className="hover:text-gray-600 transition-colors"
                                        title="Attach file"
                                    >
                                        <Paperclip className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => imageInputRef.current?.click()}
                                        className="hover:text-gray-600 transition-colors"
                                        title="Attach image"
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        className="hover:text-gray-600 transition-colors"
                                        title="Emojis"
                                    >
                                        <Smile className="w-4 h-4" />
                                    </button>
                                </div>
                                <Button
                                    onClick={handleSendReply}
                                    disabled={isSending}
                                    className="bg-[#0052FF] hover:bg-[#0041CC] text-white font-bold px-6 h-9 rounded-xl flex gap-1.5 text-xs disabled:opacity-50"
                                >
                                    {isSending ? (
                                        <>
                                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Reply</span>
                                            <Send className="w-3.5 h-3.5" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="xl:col-span-4 space-y-6">

                    {/* Ticket Metadata */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-3">
                            Ticket Metadata
                        </h2>
                        <div className="space-y-4 text-xs font-medium text-gray-600">
                            <div className="flex justify-between items-center">
                                <span>Ticket ID</span>
                                <span className="font-bold text-gray-900">{report.report_id}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Created Date</span>
                                <span className="font-bold text-gray-900">
                                    {new Date(report.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Assigned Agent</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-[#0052FF] flex items-center justify-center text-[8px] text-white font-bold uppercase">
                                        AG
                                    </div>
                                    <span className="font-bold text-gray-900">
                                        {isPayment ? "Billing Agent" : "App Support Agent"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Evidence Vault */}
                    {report.attachments && report.attachments.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                                    Evidence Vault
                                </h2>
                                <Badge className="bg-gray-100 text-gray-700 border-none px-2 py-0.5 text-[9px] font-bold">
                                    {report.attachments.length} {report.attachments.length === 1 ? "File" : "Files"}
                                </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {report.attachments.map((url, index) => (
                                    <div key={index} className="aspect-video bg-gray-50 rounded-lg overflow-hidden border border-gray-150 relative">
                                        <img src={url} alt={`Evidence-${index}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Internal Agent Notes */}
                    <div className="bg-slate-100/60 rounded-2xl p-6 space-y-4 border border-slate-200/50">
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-slate-800" />
                            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Internal Agent Notes</h2>
                        </div>
                        <div className="space-y-3">
                            <Textarea
                                placeholder="Add a private note only visible to team members..."
                                className="bg-white border-gray-200 rounded-xl min-h-[90px] p-3 text-xs font-bold placeholder:text-gray-500 shadow-sm"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <Button
                                onClick={handleSaveNote}
                                className="w-full bg-[#1A202C] hover:bg-black text-white font-bold h-10 rounded-xl transition-all text-xs"
                            >
                                Save Note
                            </Button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Refund Modal */}
            <Dialog open={isRefundModalOpen} onOpenChange={setIsRefundModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Issue Refund</DialogTitle>
                        <DialogDescription>
                            Enter the amount you wish to refund for this dispute.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRefundSubmit} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label className="font-bold text-gray-700">Refund Amount</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <Input
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    value={refundAmount}
                                    onChange={(e) => setRefundAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="pl-10 font-bold"
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => setIsRefundModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isRefunding} className="bg-red-600 hover:bg-red-700 text-white font-bold">
                                {isRefunding ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <DollarSign className="w-4 h-4 mr-2" />}
                                Process Refund
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
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
