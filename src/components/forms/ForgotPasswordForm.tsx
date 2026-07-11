"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForgetPasswordMutation } from "@/redux/apiSlices/authSlice";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";
import { useErrorToast } from "@/hooks/useErrorToast";
import Link from "next/link";

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [forgetPassword] = useForgetPasswordMutation();
    const showError = useErrorToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const handleSubmitEmail = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        const toastId = toast.loading("Sending verification code...");
        try {
            const response = await forgetPassword({ email: data.email }).unwrap();

            if (response.success) {
                toast.success(response.message || "Verification code sent successfully!");
                if (typeof window !== "undefined") {
                    localStorage.setItem("forgetEmail", data.email);
                }
                router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}`);
            } else {
                toast.error(response.message || "Something went wrong");
            }
        } catch (error: any) {
            console.error("Forgot password error:", error);
            showError(error, "Failed to send reset link");
        } finally {
            setIsLoading(false);
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="w-full max-w-[500px] p-6">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold text-[#2563EB] mb-8">
                    Sendit Admin
                </h1>
                <p className="text-gray-600 text-sm">
                    Enter your email to receive a verification code
                </p>
            </div>

            <form onSubmit={handleSubmit(handleSubmitEmail)} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Mail className="w-5 h-5" />
                        </div>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="your@email.com"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-gray-300"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                >
                    {isLoading ? "Sending..." : "Send Verification Code"}
                </button>

                {/* Back to Login Button */}
                <div className="pt-2 text-center">
                    <Link href="/auth/login" className="text-blue-600 text-sm font-semibold hover:underline">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    );
}
