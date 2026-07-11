import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";

const lora = Lora({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-cinzel",
});

export const metadata: Metadata = {
    title: {
        template: "%s | Dashboard",
        default: "Sendit Dashboard",
    },
    description: "Sendit Dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${lora.className} ${lora.variable} antialiased`}>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
