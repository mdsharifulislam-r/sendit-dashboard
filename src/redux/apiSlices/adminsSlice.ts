import { api } from "../api/baseApi";

const adminsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllAdmins: builder.query({
            query: () => {
                return {
                    url: "/admin",
                }
            },
            providesTags: ["admin"]
        }),

        createAdmin: builder.mutation({
            query: (data) => {
                return {
                    url: `/admin`,
                    method: "POST",
                    body: data,
                }
            },
            invalidatesTags: ["admin"]
        }),

        updateAdmin: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/admin/edit/${id}`,
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ["admin"]
        }), 

        deleteAdmin: builder.mutation({
            query: (id) => {
                return {
                    url: `/admin/edit/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["admin"]
        }),
    })
})
export const { useGetAllAdminsQuery, useCreateAdminMutation, useUpdateAdminMutation, useDeleteAdminMutation } = adminsSlice