import { api } from "../api/baseApi";

export const pricingRulesSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getPricingRules: builder.query({
            query: () => {
                return {
                    url: "/pricing-rules",
                };
            },
            providesTags: ["PricingRules"],
        }),

        createPricingRules: builder.mutation({
            query: (body) => {
                return {
                    url: "/pricing-rules",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ["PricingRules"],
        }),
    }),
});

export const {
    useGetPricingRulesQuery,
    useCreatePricingRulesMutation,
} = pricingRulesSlice;
