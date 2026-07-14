import ShipmentDetailsContent from "./ShipmentDetailsContent";

export default async function ShipmentDetailsPage({ params }: { params: any }) {
    const resolvedParams = params && typeof params.then === "function" ? await params : params;
    const id = resolvedParams?.id;
    return <ShipmentDetailsContent id={id} />;
}
