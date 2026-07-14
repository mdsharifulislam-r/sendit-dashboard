import UserDetailsContent from "./UserDetailsContent";

export default async function UserDetailsPage({ params }: { params: any }) {
    const resolvedParams = params && typeof params.then === "function" ? await params : params;
    const id = resolvedParams?.id;
    return <UserDetailsContent id={id} />;
}
