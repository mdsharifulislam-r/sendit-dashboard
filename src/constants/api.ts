export const TAG_TYPES = {
    AUTH: "Auth",
    USER: "User",
    CONTACT: "Contact",
    DASHBOARD: "Dashboard",
    EVENT: "Event",
    SUPPORT: "Support",
    USER_PROFILE: "UserProfile",
    MY_EVENT: "MyEvent",
    PROMOTION: "Promotion",
    PROMOTION_STATS: "PromotionStats",
    ORGANIZER_DASHBOARD: "OrganizerDashboard",
    ADMIN_STATS: "AdminStats",
    NOTIFICATIONS: "Notifications",
    LIVESTREAM: "Livestream",
    CHAT_MESSAGES: "ChatMessages",
    CHAT_PARTICIPANTS: "ChatParticipants",
    CHAT: "Chat",
    MESSAGE: "Message",
} as const;

export const TAG_TYPES_LIST = Object.values(TAG_TYPES);
