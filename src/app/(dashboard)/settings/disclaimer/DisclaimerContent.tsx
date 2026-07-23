"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    ArrowLeft,
    Save,
    FileText,
    Shield,
    Truck,
    Info,
    HelpCircle,
    RotateCcw,
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Code,
    Eye,
    Edit3,
    Quote,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Sparkles,
    CheckCircle2
} from "lucide-react";
import {
    useGetDisclaimerQuery,
    useCreateDisclaimerMutation,
} from "@/redux/apiSlices/disclaimerSlice";
import { toast } from "sonner";
import { useErrorToast } from "@/hooks/useErrorToast";

type DisclaimerType = "terms" | "privacy" | "transport" | "about" | "faq";

interface PolicyTab {
    id: DisclaimerType;
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const POLICY_TABS: PolicyTab[] = [
    {
        id: "terms",
        label: "Terms & Conditions",
        description: "User agreement and platform rules",
        icon: <FileText className="w-4 h-4" />,
        color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
        id: "privacy",
        label: "Privacy Policy",
        description: "Data collection and privacy terms",
        icon: <Shield className="w-4 h-4" />,
        color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
        id: "transport",
        label: "Transport Disclaimer",
        description: "Shipment, carrier and transit policy",
        icon: <Truck className="w-4 h-4" />,
        color: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
        id: "about",
        label: "About Us",
        description: "Company overview & mission statement",
        icon: <Info className="w-4 h-4" />,
        color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
        id: "faq",
        label: "FAQ & Help Content",
        description: "Frequently asked questions and guides",
        icon: <HelpCircle className="w-4 h-4" />,
        color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
];

export default function DisclaimerContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const typeFromUrl = (searchParams.get("type") as DisclaimerType) || "transport";

    const [activeTab, setActiveTab] = useState<DisclaimerType>(typeFromUrl);
    const [content, setContent] = useState<string>("");
    const [editorMode, setEditorMode] = useState<"visual" | "code" | "preview">("visual");

    const editorRef = useRef<HTMLDivElement>(null);
    const showError = useErrorToast();

    // Fetch disclaimer by type
    const {
        data: disclaimerResponse,
        isLoading,
        isFetching,
        refetch,
    } = useGetDisclaimerQuery(activeTab);

    const [createDisclaimer, { isLoading: isSaving }] = useCreateDisclaimerMutation();

    // Update content state when data loads or tab switches
    useEffect(() => {
        if (disclaimerResponse?.data?.content !== undefined) {
            setContent(disclaimerResponse.data.content || "");
            if (editorRef.current && editorMode === "visual") {
                editorRef.current.innerHTML = disclaimerResponse.data.content || "";
            }
        }
    }, [disclaimerResponse, activeTab]);

    // Handle Tab Switch
    const handleTabChange = (tabId: DisclaimerType) => {
        setActiveTab(tabId);
        router.replace(`/settings/disclaimer?type=${tabId}`);
    };

    // Rich Text Editor Command Executor
    const execCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
        }
    };

    // Handle Save Disclaimer
    const handleSave = async () => {
        let finalContent = content;
        if (editorMode === "visual" && editorRef.current) {
            finalContent = editorRef.current.innerHTML;
        }

        if (!finalContent.trim()) {
            toast.error("Please enter policy content before saving.");
            return;
        }

        try {
            const res = await createDisclaimer({
                type: activeTab,
                content: finalContent,
            }).unwrap();

            toast.success(res?.message || `${currentTabInfo?.label} updated successfully!`);
            refetch();
        } catch (error) {
            showError(error);
        }
    };

    const currentTabInfo = POLICY_TABS.find((t) => t.id === activeTab);

    // Calculate word & character counts
    const plainText = content.replace(/<[^>]+>/g, "").trim();
    const wordCount = plainText ? plainText.split(/\s+/).length : 0;
    const charCount = plainText.length;

    return (
        <div className="p-6 md:p-8 space-y-8 bg-[#F8FAFC] min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <SidebarTrigger className="md:hidden block" />
                    <button
                        onClick={() => router.push("/settings")}
                        className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                        title="Back to Settings"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                Content & Policy Disclaimer
                            </h1>
                        </div>
                        <p className="text-xs text-gray-600 font-medium mt-0.5">
                            Manage official legal policies, terms, privacy guidelines, and transport disclaimers.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="h-10 px-4 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-semibold"
                    >
                        <RotateCcw className={`w-4 h-4 ${isFetching ? "animate-spin text-blue-600" : ""}`} />
                        <span>Reload</span>
                    </Button>

                    <Button
                        onClick={handleSave}
                        disabled={isSaving || isLoading}
                        className="h-10 px-6 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold shadow-sm flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        <span>{isSaving ? "Saving..." : "Save Policy"}</span>
                    </Button>
                </div>
            </div>

            {/* Policy Category Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {POLICY_TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                                isActive
                                    ? "bg-white border-blue-600 shadow-md ring-2 ring-blue-500/10"
                                    : "bg-white/80 border-gray-100 hover:bg-white hover:border-gray-200"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className={`p-2.5 rounded-xl border ${tab.color}`}>
                                    {tab.icon}
                                </div>
                                {isActive && (
                                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                )}
                            </div>
                            <div>
                                <h3 className={`text-xs font-bold ${isActive ? "text-blue-600" : "text-gray-900"}`}>
                                    {tab.label}
                                </h3>
                                <p className="text-[10px] text-gray-600 line-clamp-1 font-medium mt-0.5">
                                    {tab.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Main Editor Box */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Editor Header & View Controls */}
                <div className="p-4 bg-gray-50/70 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className={`p-2 rounded-xl border ${currentTabInfo?.color}`}>
                            {currentTabInfo?.icon}
                        </span>
                        <div>
                            <h2 className="text-sm font-bold text-gray-900">
                                Editing: {currentTabInfo?.label}
                            </h2>
                            <p className="text-[11px] text-gray-600 font-medium">
                                API Type: <code className="font-mono text-blue-600 font-bold">"{activeTab}"</code>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-200/60 p-1 rounded-xl">
                        <button
                            onClick={() => {
                                setEditorMode("visual");
                                if (editorRef.current) {
                                    editorRef.current.innerHTML = content;
                                }
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                editorMode === "visual"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Edit3 className="w-3.5 h-3.5" /> Visual Editor
                        </button>

                        <button
                            onClick={() => setEditorMode("code")}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                editorMode === "code"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Code className="w-3.5 h-3.5" /> HTML Code
                        </button>

                        <button
                            onClick={() => setEditorMode("preview")}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                editorMode === "preview"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Eye className="w-3.5 h-3.5" /> Live Preview
                        </button>
                    </div>
                </div>

                {/* Rich Formatting Toolbar (Visible in Visual Mode) */}
                {editorMode === "visual" && (
                    <div className="p-2.5 bg-white border-b border-gray-100 flex flex-wrap items-center gap-1 text-gray-700">
                        <button
                            type="button"
                            onClick={() => execCommand("bold")}
                            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Bold"
                        >
                            <Bold className="w-4 h-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() => execCommand("italic")}
                            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Italic"
                        >
                            <Italic className="w-4 h-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() => execCommand("underline")}
                            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Underline"
                        >
                            <Underline className="w-4 h-4" />
                        </button>

                        <div className="h-5 w-px bg-gray-200 mx-1" />

                        <button
                            type="button"
                            onClick={() => execCommand("formatBlock", "<h1>")}
                            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Heading 1"
                        >
                            <Heading1 className="w-4 h-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() => execCommand("formatBlock", "<h2>")}
                            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Heading 2"
                        >
                            <Heading2 className="w-4 h-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() => execCommand("formatBlock", "<h3>")}
                            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Heading 3"
                        >
                            <Heading3 className="w-4 h-4" />
                        </button>

                        <div className="h-5 w-px bg-gray-200 mx-1" />

                        <button
                            type="button"
                            onClick={() => execCommand("insertUnorderedList")}
                            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Bullet List"
                        >
                            <List className="w-4 h-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() => execCommand("insertOrderedList")}
                            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Numbered List"
                        >
                            <ListOrdered className="w-4 h-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() => execCommand("formatBlock", "<blockquote>")}
                            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Quote"
                        >
                            <Quote className="w-4 h-4" />
                        </button>

                        <div className="h-5 w-px bg-gray-200 mx-1" />

                        <button
                            type="button"
                            onClick={() => execCommand("justifyLeft")}
                            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Align Left"
                        >
                            <AlignLeft className="w-4 h-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() => execCommand("justifyCenter")}
                            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Align Center"
                        >
                            <AlignCenter className="w-4 h-4" />
                        </button>

                        <button
                            type="button"
                            onClick={() => execCommand("justifyRight")}
                            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Align Right"
                        >
                            <AlignRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Editor Content Area */}
                <div className="p-6 min-h-[450px]">
                    {isLoading ? (
                        <div className="h-96 flex flex-col items-center justify-center text-center text-gray-600">
                            <RotateCcw className="w-8 h-8 animate-spin text-blue-600 mb-3" />
                            <p className="text-sm font-semibold">Loading policy content...</p>
                        </div>
                    ) : editorMode === "visual" ? (
                        <div
                            ref={editorRef}
                            contentEditable
                            onInput={(e) => setContent((e.target as HTMLDivElement).innerHTML)}
                            className="w-full min-h-[420px] outline-none text-gray-800 text-sm leading-relaxed prose max-w-none focus:ring-0 p-2"
                        />
                    ) : editorMode === "code" ? (
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter raw HTML content here..."
                            className="w-full min-h-[420px] p-4 font-mono text-xs text-gray-800 bg-gray-900 text-emerald-400 rounded-xl outline-none border border-gray-800 focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{ __html: content || "<p className='text-gray-400 italic'>No content written yet.</p>" }}
                            className="w-full min-h-[420px] prose max-w-none text-gray-800 text-sm leading-relaxed p-2"
                        />
                    )}
                </div>

                {/* Footer Bar with Stats */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 font-medium">
                    <div className="flex items-center gap-4">
                        <span>Words: <strong className="text-gray-900">{wordCount}</strong></span>
                        <span>Characters: <strong className="text-gray-900">{charCount}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Auto-saved to draft</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
