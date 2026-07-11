import type { Metadata } from "next";
import ShipmentsContent from "./ShipmentsContent";

export const metadata: Metadata = {
    title: "Trips & Shipments",
};

export default function ShipmentsPage() {
    return <ShipmentsContent />;
}
