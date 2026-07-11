"use client";

import NonAuthenticatedGuard from "@/providers/NonAuthenticatedGuard";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <NonAuthenticatedGuard>{children}</NonAuthenticatedGuard>;
}
