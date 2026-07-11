"use client";

import ShipmentDetailsContent from "./ShipmentDetailsContent";

export default function ShipmentDetailsPage({ params }: { params: { id: string } }) {
    return <ShipmentDetailsContent id={params.id} />;
}
