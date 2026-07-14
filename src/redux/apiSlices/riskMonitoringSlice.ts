import { api } from "../api/baseApi";

const riskMonitoringSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllriskMonitoringItems: builder.query({
            query: (params) => {
                return {
                    url: "/risk-settings/risky-items",
                    params,
                }
            },
            providesTags: ["RiskyItems"]
        }),

        getRiskMonitoringSetting: builder.query({
            query: () => {
                return {
                    url: `/risk-settings`,
                }
            },
            providesTags: ["RiskSettings"]
        }),    

        createRiskMonitoringSetting: builder.mutation({
            query: (body) => {
                return {
                    url: `/risk-settings`,
                    method: "POST",
                    body,
                }
            },
            invalidatesTags: ["RiskSettings"]
        }),

        updateRiskMonitoringStatus: builder.mutation({
            query: ({id , status}) => {
                return {
                    url: `/risk-settings/risky-items/${id}/change-status`,
                    method: "PATCH",
                    body: {status}
                }
            },
            invalidatesTags: ["RiskyItems"]
         }),   

    }) 
}) 
export const { useGetAllriskMonitoringItemsQuery, useGetRiskMonitoringSettingQuery, useCreateRiskMonitoringSettingMutation, useUpdateRiskMonitoringStatusMutation } = riskMonitoringSlice;