import { api } from "../api/baseApi";

export interface ReportUser {
    _id: string;
    name: string;
    contact: string;
    email: string;
    image: string | null;
}

export interface ReportItem {
    _id: string;
    user: ReportUser;
    report_type: string;
    description: string;
    attachments: string[] | null;
    status: "open" | "closed" | string;
    createdAt: string;
    updatedAt: string;
    report_id: string;
    __v?: number;
    chat?: string;
}

export interface GetReportsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    pagination: {
        total: number;
        limit: number;
        page: number;
        totalPage: number;
    };
    data: ReportItem[];
}

export interface GetReportsParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    status?: string;
}

export interface MessageSender {
    _id: string;
    name: string;
    email: string;
    image: string | null;
}

export interface MessageItem {
    _id: string;
    sender: MessageSender;
    receiver: any;
    chat: string;
    message: string;
    type: string;
    images?: string[];
    documents?: string[];
    report: string;
    readBy?: string[];
    createdAt: string;
    updatedAt: string;
    isRead?: boolean;
}

export interface GetMessagesResponse {
    success: boolean;
    statusCode: number;
    message: string;
    pagination: {
        total: number;
        limit: number;
        page: number;
        totalPage: number;
    };
    data: MessageItem[];
}

export interface TicketBooking {
    _id: string;
    id: string;
    pickup_address?: string;
    dropoff_address?: string;
    status?: string;
}

export interface TicketItem {
    _id: string;
    ticket_id: string;
    title: string;
    description: string;
    booking: TicketBooking | string;
    report: string;
    status: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTicketPayload {
    title: string;
    description: string;
    booking: string;
    report: string;
    priority: string;
}

export const supportSlice = api.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getReports: builder.query<GetReportsResponse, GetReportsParams | void>({
            query: (params) => {
                return {
                    url: "/report",
                    params: {
                        page: params?.page || 1,
                        limit: params?.limit || 10,
                        ...(params?.searchTerm ? { searchTerm: params.searchTerm } : {}),
                        ...(params?.status && params.status !== "ALL" ? { status: params.status } : {}),
                    },
                };
            },
            providesTags: ["Support"],
        }),

        getSingleReport: builder.query<{ success: boolean; data: ReportItem }, string>({
            query: (id) => ({
                url: `/report/${id}`,
            }),
            providesTags: (_result, _error, id) => [{ type: "Support", id }],
        }),

        updateReportStatus: builder.mutation<
            { success: boolean; message: string; data: ReportItem },
            { id: string; status: string }
        >({
            query: ({ id, status }) => ({
                url: `/report/${id}`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (_result, _error, arg) => ["Support", { type: "Support", id: arg.id }],
        }),

        deleteReport: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/report/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Support"],
        }),

        getMessages: builder.query<GetMessagesResponse, { chatId: string; reportId: string }>({
            query: ({ chatId, reportId }) => ({
                url: `/message/${chatId}`,
                params: { report: reportId },
            }),
            providesTags: (_result, _error, arg) => [{ type: "Support", id: `chat-${arg.chatId}` }],
        }),

        sendMessage: builder.mutation<{ success: boolean; message: string; data: MessageItem }, FormData>({
            query: (formData) => ({
                url: "/message",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: (_result, _error, arg) => {
                const chatId = arg.get("chat") as string;
                return [{ type: "Support", id: `chat-${chatId}` }];
            },
        }),

        getTicketsByReport: builder.query<{ success: boolean; data: TicketItem[] }, string>({
            query: (reportId) => ({
                url: `/ticket`,
                params: { report: reportId },
            }),
            providesTags: (_result, _error, arg) => [{ type: "Support", id: `tickets-${arg}` }],
        }),

        createTicket: builder.mutation<{ success: boolean; message: string; data: TicketItem }, CreateTicketPayload>({
            query: (payload) => ({
                url: "/ticket/create",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: "Support", id: `tickets-${arg.report}` }],
        }),
    }),
});

export const {
    useGetReportsQuery,
    useGetSingleReportQuery,
    useUpdateReportStatusMutation,
    useDeleteReportMutation,
    useGetMessagesQuery,
    useSendMessageMutation,
    useGetTicketsByReportQuery,
    useCreateTicketMutation,
} = supportSlice;
