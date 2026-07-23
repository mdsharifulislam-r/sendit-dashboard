import type { Metadata } from "next";
import DisclaimerContent from "./DisclaimerContent";

export const metadata: Metadata = {
    title: "Disclaimer & Content Management",
};

export default function DisclaimerPage() {
    return <DisclaimerContent />;
}
