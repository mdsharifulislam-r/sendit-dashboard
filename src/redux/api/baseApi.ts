import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://10.10.26.164:3010/api/v1",
        prepareHeaders: (headers) => {
            const currentToken = typeof window !== "undefined" ? localStorage.getItem("token") : token;
            if (currentToken) {
                headers.set("Authorization", `Bearer ${currentToken}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Users", "admin","trips","Transactions", "RiskSettings", "RiskyItems", "AuditLogs", "PricingRules"],
    endpoints: () => ({})
});

// export const imageUrl = "http://206.189.231.81:5000";
// export const imageUrl = "http://10.10.7.72:5000";
export const imageUrl = "http://10.10.26.164:3010";
