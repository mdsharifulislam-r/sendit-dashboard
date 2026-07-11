export interface IUser {
    id: string;
    userId: string;
    name: string;
    email: string;
    joinDate: string;
    role: string;
    status: "Active" | "Pending" | "Suspended";
    verification: "Verified" | "Unverified" | "Pending";
    walletBalance: string;
    eventsCreated: number;
}

export const MOCK_USERS: IUser[] = [
    { 
        id: "1", 
        userId: "USR001",
        name: "Sarah Johnson", 
        email: "sarah.j@email.com",
        joinDate: "1/15/2024", 
        role: "Sender", 
        status: "Active", 
        verification: "Verified",
        walletBalance: "$145.00",
        eventsCreated: 12 
    },
    { 
        id: "2", 
        userId: "USR002",
        name: "Michael Chen", 
        email: "m.chen@email.com",
        joinDate: "1/15/2024", 
        role: "Traveler", 
        status: "Active", 
        verification: "Verified",
        walletBalance: "$892.50",
        eventsCreated: 0 
    },
    { 
        id: "3", 
        userId: "USR003",
        name: "Emma Williams", 
        email: "emma.w@email.com",
        joinDate: "1/15/2024", 
        role: "Sender", 
        status: "Suspended", 
        verification: "Unverified",
        walletBalance: "$0.00",
        eventsCreated: 0 
    },
    { 
        id: "4", 
        userId: "USR004",
        name: "James Martinez", 
        email: "james.m@email.com",
        joinDate: "1/15/2024", 
        role: "Traveler", 
        status: "Active", 
        verification: "Pending",
        walletBalance: "$234.75",
        eventsCreated: 0 
    },
    { 
        id: "5", 
        userId: "USR005",
        name: "Olivia Brown", 
        email: "olivia.b@email.com",
        joinDate: "1/15/2024", 
        role: "Sender", 
        status: "Active", 
        verification: "Verified",
        walletBalance: "$67.20",
        eventsCreated: 0 
    },
];
