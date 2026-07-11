"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/apiSlices/authSlice";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useErrorToast } from "@/hooks/useErrorToast";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password must be less than 50 characters"),
    rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [login] = useLoginMutation();
    const router = useRouter();
    const showError = useErrorToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });


    const handleLogin = async (data: LoginFormData) => {
        setIsLoading(true);
        const toastId = toast.loading("Logging in...");
        try {
            const response = await login({
                email: data.email,
                password: data.password,
            }).unwrap();
            console.log("login response", response)

            if (response.success && response.data?.accessToken) {
                if (typeof window !== "undefined") {
                    localStorage.setItem("token", response.data.accessToken);
                    localStorage.setItem("role", "SUPER_ADMIN");
                }
                toast.success("Login successful!");
                router.push("/");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                toast.error(response.message || "Login failed");
            }
        } catch (error: any) {
            console.error("Login failed:", error);
            showError(error);
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
                    Sign in to continue as Admin
                </p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Email
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

                {/* Password Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Lock className="w-5 h-5" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            placeholder="........"
                            className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-gray-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div className="flex items-center">
                    <Link href="/auth/forgot-password" title="Forgot Password ?" className="text-gray-700 text-sm font-semibold hover:underline transition-colors">
                        Forgot Password?
                    </Link>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
