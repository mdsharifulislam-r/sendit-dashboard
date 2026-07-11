"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface Message {
    id: string;
    name: string;
    initials: string;
    preview: string;
    timestamp: string;
    unread: boolean;
}

interface ChatMessage {
    id: string;
    sender: "user" | "attendee";
    text: string;
    timestamp: string;
}

const initialMessages: Message[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        initials: "SJ",
        preview: "Thank you! Looking forward to the event.",
        timestamp: "2 min ago",
        unread: true,
    },
    {
        id: "2",
        name: "Mike Chen",
        initials: "MC",
        preview: "Got it, thanks for the update!",
        timestamp: "30 min ago",
        unread: false,
    },
    {
        id: "3",
        name: "Emily Davis",
        initials: "ED",
        preview: "Is there parking available at the venue?",
        timestamp: "1 hour ago",
        unread: true,
    },
    {
        id: "4",
        name: "James Wilson",
        initials: "JW",
        preview: "See you there! Can't wait.",
        timestamp: "2 hours ago",
        unread: false,
    },
    {
        id: "5",
        name: "Alex Turner",
        initials: "AT",
        preview: "Do you have any vegan options?",
        timestamp: "5 hours ago",
        unread: false,
    },
];

const chatHistory: Record<string, ChatMessage[]> = {
    "1": [
        { id: "1", sender: "attendee", text: "Hi! I'm excited about the tech conference.", timestamp: "10:30 AM" },
        { id: "2", sender: "user", text: "Welcome Sarah! We're excited to have you.", timestamp: "10:32 AM" },
        { id: "3", sender: "attendee", text: "Thank you! Looking forward to the event.", timestamp: "10:35 AM" },
    ],
    "2": [
        { id: "1", sender: "attendee", text: "Got the ticket confirmation, thanks!", timestamp: "Yesterday" },
        { id: "2", sender: "user", text: "Great! Let us know if you need anything.", timestamp: "Yesterday" },
    ],
    "3": [{ id: "1", sender: "attendee", text: "Hi, is there parking available at the venue?", timestamp: "1 hour ago" }],
    "4": [
        { id: "1", sender: "attendee", text: "See you there! Can't wait.", timestamp: "2 hours ago" },
        { id: "2", sender: "user", text: "Looking forward to meeting you!", timestamp: "2 hours ago" },
    ],
    "5": [
        { id: "1", sender: "attendee", text: "Do you have any vegan options for lunch?", timestamp: "5 hours ago" },
        { id: "2", sender: "user", text: "Yes! We have several vegan options available.", timestamp: "4 hours ago" },
    ],
};

export default function MessagesPage() {
    const [selectedMessage, setSelectedMessage] = useState<string>("1");
    const [searchQuery, setSearchQuery] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [filter, setFilter] = useState<string>("all");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Use useMemo to fix the dependency warning
    const selectedAttendee = useMemo(() => messages.find((m) => m.id === selectedMessage), [messages, selectedMessage]);

    // Use useMemo to fix the dependency warning
    const currentChat = useMemo(() => chatHistory[selectedMessage] || [], [selectedMessage]);

    const unreadCount = messages.filter((m) => m.unread).length;

    const handleSendMessage = () => {
        if (!messageInput.trim() || !selectedMessage) return;

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            sender: "user",
            text: messageInput,
            timestamp: "Just now",
        };

        chatHistory[selectedMessage] = [...(chatHistory[selectedMessage] || []), newMessage];

        // Use functional update to avoid dependency on messages
        setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === selectedMessage ? { ...msg, preview: messageInput, timestamp: "Just now", unread: false } : msg)));

        setMessageInput("");
    };

    const handleSelectMessage = (id: string) => {
        setSelectedMessage(id);
        // Mark as read when selecting a message
        setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === id ? { ...msg, unread: false } : msg)));
    };

    const filteredMessages = useMemo(
        () =>
            messages
                .filter((message) => {
                    if (filter === "unread") return message.unread;
                    if (filter === "read") return !message.unread;
                    return true;
                })
                .filter((message) => message.name.toLowerCase().includes(searchQuery.toLowerCase()) || message.preview.toLowerCase().includes(searchQuery.toLowerCase())),
        [messages, filter, searchQuery],
    );

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentChat]);

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-background">
            {/* Left Panel - Messages List */}
            <div className="w-full lg:w-80 border-r border-border bg-card flex flex-col h-1/2 lg:h-full">
                {/* Header */}
                <div className="border-b border-border p-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="md:hidden block" />
                        <h1 className="text-xl font-bold text-gray-900">Messages</h1>
                    </div>
                    <p className="text-sm text-gray-700 mt-1 font-bold">Contact attendees</p>
                    <Badge className="mt-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border-none font-bold" variant="secondary">
                        {unreadCount} unread
                    </Badge>
                </div>

                {/* Search and Filter */}
                <div className="p-3 border-b border-border space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-gray-50 border-gray-200 font-bold placeholder:text-gray-500" />
                    </div>

                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-full bg-gray-50 border-gray-200 font-bold text-gray-700">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" className="font-bold">All Messages</SelectItem>
                            <SelectItem value="unread" className="font-bold">Unread</SelectItem>
                            <SelectItem value="read" className="font-bold">Read</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredMessages.length === 0 ? (
                        <div className="p-6 text-center">
                            <MessageCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600 font-bold">No messages found</p>
                        </div>
                    ) : (
                        filteredMessages.map((message) => (
                            <div key={message.id} onClick={() => handleSelectMessage(message.id)} className={`p-3 border-b border-border cursor-pointer transition-colors ${selectedMessage === message.id ? "bg-blue-50/50" : "hover:bg-gray-50"}`}>
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-gray-100 text-gray-700 font-bold">{message.initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className={`font-bold truncate ${message.unread ? "text-gray-900" : "text-gray-700"}`}>{message.name}</h3>
                                            <div className="flex items-center gap-2">
                                                {message.unread && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">{message.timestamp}</span>
                                            </div>
                                        </div>
                                        <p className={`text-xs truncate font-bold ${message.unread ? "text-gray-800" : "text-gray-600"}`}>{message.preview}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Panel - Chat */}
            <div className="flex-1 flex flex-col bg-white">
                {selectedAttendee ? (
                    <>
                        <div className="border-b border-border p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-gray-100 text-gray-700 font-bold">{selectedAttendee.initials}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="font-bold text-gray-900">{selectedAttendee.name}</h2>
                                        <p className="text-[10px] font-bold text-gray-600 uppercase">Last message: {selectedAttendee.timestamp}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {currentChat.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}`}>
                                        <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                                        <p className={`text-[10px] font-bold mt-1 uppercase ${msg.sender === "user" ? "text-blue-100" : "text-gray-600"}`}>{msg.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="border-t border-border p-4 bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <Input placeholder="Type a message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={handleKeyPress} className="flex-1 bg-white border-gray-200 h-11 font-bold placeholder:text-gray-500" />
                                <Button onClick={handleSendMessage} size="default" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 h-11 font-bold shadow-md" disabled={!messageInput.trim()}>
                                    <Send className="w-4 h-4" />
                                    Send
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50/30">
                        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                            <MessageCircle className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">Select a conversation</h2>
                        <p className="text-sm text-gray-600 font-bold text-center">Choose from the list to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}
