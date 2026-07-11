"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NonAuthenticatedGuardProps {
    children: React.ReactNode;
    redirectTo?: string;
}

const NonAuthenticatedGuard = ({ children, redirectTo = "/" }: NonAuthenticatedGuardProps) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                setIsAuthenticated(true);
                router.push(redirectTo);
            } else {
                setIsChecking(false);
            }
        }
    }, [router, redirectTo]);

    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <>{children}</>;
    }

    return null;
};

export default NonAuthenticatedGuard;
