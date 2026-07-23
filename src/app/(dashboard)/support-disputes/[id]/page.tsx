import TicketDetailsContent from "./TicketDetailsContent";

export default async function TicketDetailsPage({ params }: { params: any }) {
    const resolvedParams = params && typeof params.then === "function" ? await params : params;
    const id = resolvedParams?.id;
    return <TicketDetailsContent id={id} />;
}
