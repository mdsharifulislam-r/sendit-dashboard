import type { Metadata } from "next";
import MessagesContent from "./MessagesContent";

export const metadata: Metadata = {
    title: "Messages",
};

export default function MessagesPage() {
    return <MessagesContent />;
}
