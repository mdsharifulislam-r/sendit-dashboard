import type { Metadata } from "next";
import ContentModerationContent from "./ContentModerationContent";

export const metadata: Metadata = {
    title: "Content Moderation",
};

export default function ContentModerationPage() {
    return <ContentModerationContent />;
}
