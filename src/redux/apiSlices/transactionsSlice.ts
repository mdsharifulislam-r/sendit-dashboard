import { api } from "../api/baseApi";

const transactionsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getTransactionsStats: builder.query({
            query: () => {
                return {
                    url: "/admin/transactions/statics",
                }
            },
        }),  

        getTransactionsList: builder.query({
            query: (params: { [key: string]: string | number | boolean }) => {
                return {
                    url: "/admin/transactions",
                    params,
                }
            },
            providesTags: ["Transactions"]
        }),   

    }) 
}) 
export const {useGetTransactionsStatsQuery, useGetTransactionsListQuery} = transactionsSlice