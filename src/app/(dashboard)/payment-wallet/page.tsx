import type { Metadata } from "next";
import PromotionsContent from "./PaymentWalletContent";

export const metadata: Metadata = {
    title: "Promotions",
};

export default function PromotionsPage() {
    return <PromotionsContent />;
}
