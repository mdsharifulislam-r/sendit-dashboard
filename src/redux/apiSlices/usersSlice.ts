import { api } from "../api/baseApi";

const usersSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => {
                return {
                    url: "/admin/users",
                }
            },
            providesTags: ["Users"]
        }),  

        getUserById: builder.query({
            query: (id) => {
                return {
                    url: `/admin/users/${id}`,
                }
            },
            providesTags: ["Users"]
        }),   

        updateApproveById: builder.mutation({
            query: (id) => {
                return {
                    url: `/admin/users/${id}/approve-kyc`,
                    method: "PATCH",
                }
            },
            invalidatesTags: ["Users"]
        }),    

        updateSuspendById: builder.mutation({
            query: (id) => {
                return {
                    url: `/admin/users/${id}/suspend`,
                    method: "PATCH",
                }
            },
            invalidatesTags: ["Users"]
        }),   

    }) 
}) 
export const {useGetAllUsersQuery, useGetUserByIdQuery, useUpdateApproveByIdMutation, useUpdateSuspendByIdMutation} = usersSlice