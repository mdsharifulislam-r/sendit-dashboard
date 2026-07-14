import { api } from "../api/baseApi";

const tripsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAlltrips: builder.query({
            query: (params) => {
                return {
                    url: "/admin/trips",
                    params,
                }
            },
            providesTags: ["trips"]
        }),  

        getTripsById: builder.query({
            query: (id) => {
                return {
                    url: `/admin/trips/${id}`,
                }
            },
            providesTags: ["trips"]
        }),   

   

        deleteTripsById: builder.mutation({
            query: ({id , reason}) => {
                return {
                    url: `/admin/trips/${id}/cancel`,
                    method: "DELETE",
                    body: {reason}
                }
            },
            invalidatesTags: ["trips"]
        }),   

    }) 
}) 
export const { useGetAlltripsQuery, useGetTripsByIdQuery, useDeleteTripsByIdMutation } = tripsSlice;