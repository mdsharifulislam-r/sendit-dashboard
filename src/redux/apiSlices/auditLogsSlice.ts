import { api } from "../api/baseApi";

const auditLogsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAuditLogs: builder.query({
            query: (params: { page: number; limit: number; searchTerm?: string }) => {
                return {
                    url: "/audit-logs",
                    params,
                }
            },
            providesTags: ["AuditLogs"]
        })
    })
});

export const { useGetAuditLogsQuery } = auditLogsSlice;
