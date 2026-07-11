import type { Metadata } from "next";
import OTPVerifyForm from "@/components/forms/OTPVerifyForm";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Verify OTP",
};

const page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <OTPVerifyForm />
            </Suspense>
        </div>
    );
};

export default page;
