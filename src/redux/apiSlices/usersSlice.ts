import { api } from "../api/baseApi";

const usersSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: (params) => {
                const query = new URLSearchParams();
                if (params?.page) query.append("page", params.page.toString());
                if (params?.limit) query.append("limit", params.limit.toString());
                return {
                    url: `/admin/users?${query.toString()}`,
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

        createUser: builder.mutation({
            query: (data) => {
                return {
                    url: `/admin/users/add-user`,
                    method: "POST",
                    body: data,
                }
            },
            invalidatesTags: ["Users"]
        }),

        searchUserInfo: builder.query({
            query: (searchTerm: string) => ({
                url: `/user/user-info?searchTerm=${searchTerm}`,
            })
        }),

    }) 
}) 
export const {useGetAllUsersQuery, useGetUserByIdQuery, useUpdateApproveByIdMutation, useUpdateSuspendByIdMutation, useCreateUserMutation, useSearchUserInfoQuery} = usersSlice