"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthenticatedGuardProps {
    children: React.ReactNode;
    redirectTo?: string;
}

const AuthenticatedGuard = ({ children, redirectTo = "/auth/login" }: AuthenticatedGuardProps) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push(redirectTo);
            } else {
                setIsAuthenticated(true);
                setIsChecking(false);
            }
        }
    }, [router, redirectTo]);

    // Show loading while checking
    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Render children only if user IS authenticated
    if (isAuthenticated) {
        return <>{children}</>;
    }

    return null;
};

export default AuthenticatedGuard;
