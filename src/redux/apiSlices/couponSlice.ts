import { api } from "../api/baseApi";

export interface CouponItem {
    _id: string;
    code: string;
    name: string;
    stripe_coupon_code?: string;
    coupon_type?: string;
    discount_percentage?: number;
    discount_amount?: number;
    expiry_date?: string;
    startDate?: string;
    max_usage?: number;
    used_count?: number;
    refferar_amount?: number;
    reffree_amount?: number;
    type?: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface GetCouponsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    pagination: {
        total: number;
        limit: number;
        page: number;
        totalPage: number;
    };
    data: CouponItem[];
}

export interface GetCouponsParams {
    page?: number;
    limit?: number;
    type?: string;
}

export interface CreateCouponPayload {
    code: string;
    name: string;
    coupon_type: string;
    discount_percentage?: number;
    discount_amount?: number;
    startDate?: string;
    expiry_date?: string;
    max_usage?: number;
    type: string;
    refferar_amount?: number;
    reffree_amount?: number;
}

const couponSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCoupons: builder.query<GetCouponsResponse, GetCouponsParams | void>({
            query: (params) => {
                return {
                    url: "/coupon",
                    params: {
                        page: params?.page || 1,
                        limit: params?.limit || 10,
                        ...(params?.type && params.type !== "ALL" ? { type: params.type } : {}),
                    },
                };
            },
            providesTags: ["Coupon"],
        }),

        getSingleCoupon: builder.query<{ success: boolean; data: CouponItem }, string>({
            query: (id) => ({
                url: `/coupon/${id}`,
            }),
            providesTags: ["Coupon"],
        }),

        createCoupon: builder.mutation<
            { success: boolean; message: string; data: CouponItem },
            CreateCouponPayload
        >({
            query: (body) => {
                return {
                    url: "/coupon",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ["Coupon"],
        }),

        updateCoupon: builder.mutation<
            { success: boolean; message: string; data: CouponItem },
            { id: string; body: Partial<CreateCouponPayload> }
        >({
            query: ({ id, body }) => {
                return {
                    url: `/coupon/${id}`,
                    method: "PATCH",
                    body,
                };
            },
            invalidatesTags: ["Coupon"],
        }),

        deleteCoupon: builder.mutation<
            { success: boolean; message: string },
            string
        >({
            query: (id) => {
                return {
                    url: `/coupon/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["Coupon"],
        }),
    }),
});

export const {
    useGetCouponsQuery,
    useGetSingleCouponQuery,
    useCreateCouponMutation,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
} = couponSlice;
