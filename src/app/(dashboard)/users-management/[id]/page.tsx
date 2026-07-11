"use client";

import UserDetailsContent from "./UserDetailsContent";


export default function UserDetailsPage({ params }: { params: { id: string } }) {
    return <UserDetailsContent id={params.id} />;
}
