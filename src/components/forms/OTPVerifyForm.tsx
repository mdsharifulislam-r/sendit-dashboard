"use client";

import React, { useState, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useOtpVerifyMutation, useForgetPasswordMutation } from "@/redux/apiSlices/authSlice";
import { toast } from "sonner";
import { useErrorToast } from "@/hooks/useErrorToast";

const otpSchema = z.object({
    otp1: z.string().length(1, "Required"),
    otp2: z.string().length(1, "Required"),
    otp3: z.string().length(1, "Required"),
    otp4: z.string().length(1, "Required"),
});

type OTPFormData = z.infer<typeof otpSchema>;

export default function OTPVerifyForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const [isLoading, setIsLoading] = useState(false);

    const [otpVerify] = useOtpVerifyMutation();
    const [forgetPassword, { isLoading: isResending }] = useForgetPasswordMutation();
    const showError = useErrorToast();

    const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<OTPFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
        },
    });

    const handleSubmitOTP = async (data: OTPFormData) => {
        setIsLoading(true);
        const otp = Object.values(data).join("");
        const toastId = toast.loading("Verifying code...");
        try {
            const response = await otpVerify({
                email,
                oneTimeCode: Number(otp),
            }).unwrap();
            console.log("otp verify response", response)
            if (response.success) {
                toast.success(response.message || "Code verified successfully!");
                if (typeof window !== "undefined") {
                    localStorage.removeItem("forgetEmail");
                    localStorage.setItem("resetToken", response?.data?.token);
                    localStorage.setItem("resetPasswordToken", response?.data?.token);
                }
                router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
            } else {
                toast.error(response.message || "Invalid verification code");
            }
        } catch (error: any) {
            console.error("Verification error:", error);
            showError(error);
        } finally {
            setIsLoading(false);
            toast.dismiss(toastId);
        }
    };

    const handleResendOtp = async () => {

        try {
            const response = await forgetPassword({ email }).unwrap();

            if (response.success) {
                toast.success("Verification code resent successfully!");
            } else {
                toast.error(response.message || "Failed to resend code");
            }
        } catch (error: any) {
            console.error("Resend OTP error:", error);
            showError(error, "Failed to resend code");
        } 
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        const fieldName = `otp${index + 1}` as keyof OTPFormData;

        // If user pastes 4 digits
        if (value.length === 4 && /^\d+$/.test(value)) {
            const digits = value.split("");
            digits.forEach((digit, i) => {
                const digitFieldName = `otp${i + 1}` as keyof OTPFormData;
                setValue(digitFieldName, digit, { shouldValidate: true });
                if (inputRefs[i] && inputRefs[i].current) {
                    inputRefs[i].current!.value = digit;
                }
            });
            inputRefs[3].current?.focus();
            return;
        }

        // Handle single digit input
        if (value.length === 1 && /^\d$/.test(value)) {
            setValue(fieldName, value, { shouldValidate: true });

            // Move to next input
            if (index < 3 && value) {
                setTimeout(() => {
                    inputRefs[index + 1].current?.focus();
                }, 0);
            }
        } else if (value.length === 0) {
            // Handle backspace
            setValue(fieldName, "", { shouldValidate: true });
        } else {
            // Clear if invalid input
            setValue(fieldName, "", { shouldValidate: true });
            e.target.value = "";
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    return (
        <div className="w-full max-w-[500px] p-6">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold text-[#2563EB] mb-8">
                    Sendit Admin
                </h1>
                <p className="text-gray-600 text-sm">
                    Enter the 4-digit verification code sent to <span className="font-semibold text-gray-800">{email || "your email"}</span>
                </p>
            </div>

            <form onSubmit={handleSubmit(handleSubmitOTP)} className="space-y-6">
                {/* OTP Inputs */}
                <div className="flex justify-center gap-4">
                    {[0, 1, 2, 3].map((index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            ref={inputRefs[index]}
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-14 h-16 border border-gray-200 rounded-lg text-center text-2xl font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                        />
                    ))}
                </div>

                {/* Verify Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                >
                    {isLoading ? "Verifying..." : "Verify Code"}
                </button>

                {/* Resend Timer & Controls */}
                <div className="pt-2 text-center text-sm font-semibold">
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            className="text-blue-600 hover:underline"
                        >
                            Resend Code
                        </button>
                </div>

                {/* Back Link */}
                <div className="text-center">
                    <Link href="/auth/forgot-password" className="text-blue-600 text-sm font-semibold hover:underline">
                        Back to Forgot Password
                    </Link>
                </div>

                {/* Help Section */}
                <div className="bg-blue-50/50 rounded-lg p-4 mt-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-sm text-gray-800">Didn't receive the code?</span>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside pl-1">
                        <li>Check your spam or junk folder</li>
                        <li>Wait a few moments and check again</li>
                        <li>Click Resend after timer expires</li>
                    </ul>
                </div>
            </form>
        </div>
    );
}
