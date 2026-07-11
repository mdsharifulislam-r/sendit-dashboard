import TicketDetailsContent from "./TicketDetailsContent";

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
    return <TicketDetailsContent id={params.id} />;
}
