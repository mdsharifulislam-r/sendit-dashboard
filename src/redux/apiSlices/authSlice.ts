import { getFromLocalStorage } from "../../utils/local-storage";
import { api } from "../api/baseApi";

const resetToken = typeof window !== "undefined" ? getFromLocalStorage("resetToken") : null;

const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({

        otpVerify: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/auth/verify-otp",
                    body: data,
                }
            }
        }),

        login: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/auth/login",
                    body: data
                }
            },
        }),

        forgetPassword: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/auth/forgot-password",
                    body: data
                }
            }
        }),

        resetPassword: builder.mutation({
            query: (value) => {
                const token = typeof window !== "undefined"
                    ? (localStorage.getItem("resetToken") || localStorage.getItem("resetPasswordToken"))
                    : null;
                return {
                    url: "/auth/reset-password",
                    headers: token ? { Authorization: token } : undefined,
                    method: "POST",
                    body: value
                };
            }
        }),

        changePassword: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/auth/change-password",
                    body: data,
                }
            }
        }),

        updateProfile: builder.mutation({
            query: (data) => {
                return {
                    method: "PATCH",
                    url: "/user/me",
                    body: data,
                }
            }
        }),

        profile: builder.query({
            query: () => {
                return {
                    url: "/user/me",
                }
            },
        }),
    })
});

export const {
    useOtpVerifyMutation,
    useLoginMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useProfileQuery,
} = authSlice;
