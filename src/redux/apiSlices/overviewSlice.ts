import { api } from "../api/baseApi";

const overviewSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => {
                return {
                    url: "/admin/overview",
                }
            },
        })

    }) 
}) 
export const {useGetDashboardStatsQuery} = overviewSlice