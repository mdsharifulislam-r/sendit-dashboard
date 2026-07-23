import { api } from "../api/baseApi";

export interface NotificationItem {
    _id: string;
    receiver: string[];
    title: string;
    message: string;
    isRead: boolean;
    readers: string[];
    filePath?: string;
    referenceId?: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface GetNotificationsQueryParams {
    page?: number;
    limit?: number;
}

export interface GetNotificationsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    pagination: {
        total: number;
        limit: number;
        page: number;
        totalPage: number;
    };
    data: {
        notifications: NotificationItem[];
        unreadCount: number;
    };
}

const notificationSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<GetNotificationsResponse, GetNotificationsQueryParams | void>({
            query: (params) => {
                return {
                    url: "/notification",
                    params: {
                        page: params?.page || 1,
                        limit: params?.limit || 10,
                    },
                };
            },
            providesTags: ["Notifications"],
        }),

        markAllNotificationsAsRead: builder.mutation<{ success: boolean; message: string }, void>({
            query: () => {
                return {
                    url: "/notification/mark-as-read",
                    method: "PATCH",
                };
            },
            invalidatesTags: ["Notifications"],
        }),

        markSingleNotificationAsRead: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => {
                return {
                    url: `/notification/mark-as-read/${id}`,
                    method: "PATCH",
                };
            },
            invalidatesTags: ["Notifications"],
        }),
    }),
});

export const {
    useGetNotificationsQuery,
    useMarkAllNotificationsAsReadMutation,
    useMarkSingleNotificationAsReadMutation,
} = notificationSlice;
