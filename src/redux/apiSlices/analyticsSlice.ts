import { api } from "../api/baseApi";

const analyticsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnalytics: builder.query({
            query: () => {
                return {
                    url: "/admin/analytics",
                }
            },
        })
    }) 
}) 

export const { useGetAnalyticsQuery } = analyticsSlice;
