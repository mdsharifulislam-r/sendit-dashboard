"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

interface NotificationItem {
    _id: string;
    title: string;
    content: string;
    type: string;
    channel: string;
    status: string;
    isRead: boolean;
    createdAt: string;
    analytics: {
        openRate: number;
        engagement: number;
    };
    userId?: {
        name: string;
        email: string;
    };
}

interface ProcessedNotification {
    id: string;
    title: string;
    content: string;
    type: string;
    audience: string;
    sentDate: string;
    openRate: number;
    engagement: string;
    status: string;
    isRead: boolean;
}

interface NotificationHistoryProps {
    pageSize?: number;
}

// Move LoadingSkeleton component outside the main component
const LoadingSkeleton = ({ pageSize }: { pageSize: number }) => (
    <>
        {Array.from({ length: pageSize }).map((_, index) => (
            <TableRow key={index}>
                <TableCell>
                    <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-16" />
                </TableCell>
            </TableRow>
        ))}
    </>
);

export default function NotificationHistory({ pageSize = 5 }: NotificationHistoryProps) {
    const [currentPage, setCurrentPage] = useState(1);

    // Mock notifications data
    const mockNotifications = [
        {
            _id: "1",
            title: "Event Reminder",
            content: "Don't forget the upcoming tech conference tomorrow!",
            type: "EVENT_REMINDER",
            channel: "IN_APP",
            status: "sent",
            isRead: true,
            createdAt: "2024-01-15T10:00:00.000Z",
            analytics: { openRate: 75, engagement: 12 },
            userId: { name: "All Users", email: "all@example.com" }
        },
        {
            _id: "2",
            title: "New Feature Announcement",
            content: "Check out our new dashboard features!",
            type: "SYSTEM_ALERT",
            channel: "IN_APP",
            status: "sent",
            isRead: false,
            createdAt: "2024-01-10T14:30:00.000Z",
            analytics: { openRate: 60, engagement: 8 },
            userId: { name: "Active Users", email: "active@example.com" }
        },
        {
            _id: "3",
            title: "Community Update",
            content: "Monthly community update is now available.",
            type: "SYSTEM_ALERT",
            channel: "IN_APP",
            status: "sent",
            isRead: true,
            createdAt: "2023-12-20T09:15:00.000Z",
            analytics: { openRate: 80, engagement: 15 },
            userId: { name: "All Users", email: "all@example.com" }
        },
        {
            _id: "4",
            title: "Holiday Greetings",
            content: "Happy Holidays from our team!",
            type: "PROMOTIONAL",
            channel: "IN_APP",
            status: "sent",
            isRead: true,
            createdAt: "2023-12-15T08:00:00.000Z",
            analytics: { openRate: 90, engagement: 20 },
            userId: { name: "All Users", email: "all@example.com" }
        },
        {
            _id: "5",
            title: "Survey Invitation",
            content: "We'd love to hear your feedback.",
            type: "PROMOTIONAL",
            channel: "IN_APP",
            status: "sent",
            isRead: false,
            createdAt: "2023-12-01T11:45:00.000Z",
            analytics: { openRate: 50, engagement: 5 },
            userId: { name: "Selected Users", email: "selected@example.com" }
        }
    ];

    const isLoading = false;
    const isError = false;
    const refetch = () => {};

    // Process notifications for display
    const { processedNotifications, totalNotifications, totalPages } = useMemo(() => {
        const notifications = mockNotifications;
        const total = mockNotifications.length;
        const pages = 1;

        const processed: ProcessedNotification[] = notifications.map((notification: any) => ({
            id: notification._id,
            title: notification.title,
            content: notification.content,
            type: notification.type,
            audience: notification.userId?.name || "User",
            sentDate: new Date(notification.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }),
            openRate: notification.analytics?.openRate || 0,
            engagement: `${notification.analytics?.engagement || 0}%`,
            status: notification.status,
            isRead: notification.isRead,
        }));

        return {
            processedNotifications: processed,
            totalNotifications: total,
            totalPages: pages,
        };
    }, []);

    // Handle page change
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Generate pagination numbers (optimized for large datasets)
    const pageNumbers = useMemo(() => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Show all pages if total pages is less than maxVisible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're near the beginning
            if (currentPage <= 3) {
                endPage = 4;
            }
            // Adjust if we're near the end
            else if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                pages.push("...");
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                pages.push("...");
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    }, [currentPage, totalPages]);

    // Calculate showing range
    const showingStart = (currentPage - 1) * pageSize + 1;
    const showingEnd = Math.min(currentPage * pageSize, totalNotifications);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Notification History</h2>
                <Button variant="outline" size="sm" onClick={() => refetch()} className="flex items-center gap-2" disabled={isLoading}>
                    <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    Refresh
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="font-semibold">Title</TableHead>
                            <TableHead className="font-semibold">Audience</TableHead>
                            <TableHead className="font-semibold">Sent Date</TableHead>
                            <TableHead className="font-semibold">Open Rate</TableHead>
                            <TableHead className="font-semibold">Engagement</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <LoadingSkeleton pageSize={pageSize} />
                        ) : isError ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    Failed to load notifications. Please try again.
                                </TableCell>
                            </TableRow>
                        ) : processedNotifications.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No notifications found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            processedNotifications.map((notification: ProcessedNotification) => (
                                <TableRow key={notification.id} className={notification.isRead ? "" : "bg-blue-50"}>
                                    <TableCell className="font-medium">
                                        <div>
                                            <p>{notification.title}</p>
                                            <p className="text-xs text-muted-foreground truncate max-w-xs">{notification.content}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{notification.audience}</span>
                                            <span className="text-xs text-muted-foreground capitalize">{notification.type.replace("_", " ").toLowerCase()}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{notification.sentDate}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1 flex items-center gap-2">
                                            <Progress value={notification.openRate} className="h-2 bg-[#CFD4E8] [&>div]:bg-[#1238ED]" />
                                            <span className="text-sm text-muted-foreground min-w-10">{notification.openRate}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{notification.engagement}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination - Only show if we have data */}
            {!isLoading && processedNotifications.length > 0 && totalPages > 1 && (
                <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing {showingStart} to {showingEnd} of {totalNotifications} notifications
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || isLoading} className="w-10 h-10">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {pageNumbers.map((page, index) =>
                            page === "..." ? (
                                <div key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center">
                                    <span className="text-muted-foreground">...</span>
                                </div>
                            ) : (
                                <Button key={page} variant={currentPage === page ? "default" : "outline"} onClick={() => handlePageChange(page as number)} className={`w-10 h-10 ${currentPage === page ? "bg-[#5C22BF] text-white border-[#5C22BF] hover:bg-[#5C22BF]/90" : ""}`} disabled={isLoading}>
                                    {page}
                                </Button>
                            ),
                        )}

                        <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || isLoading} className="w-10 h-10">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
