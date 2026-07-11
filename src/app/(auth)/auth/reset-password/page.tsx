import type { Metadata } from "next";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Reset Password",
};

const page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
};

export default page;
