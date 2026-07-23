import { api } from "../api/baseApi";

export interface DisclaimerData {
    _id?: string;
    type: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface DisclaimerResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: DisclaimerData;
}

export interface CreateDisclaimerPayload {
    type: string;
    content: string;
}

const disclaimerSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getDisclaimer: builder.query<DisclaimerResponse, string>({
            query: (type) => ({
                url: `/disclaimer`,
                params: { type },
            }),
            providesTags: (_result, _error, type) => [{ type: "Disclaimer", id: type }],
        }),

        createDisclaimer: builder.mutation<DisclaimerResponse, CreateDisclaimerPayload>({
            query: (body) => ({
                url: `/disclaimer`,
                method: "POST",
                body,
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: "Disclaimer", id: arg.type }],
        }),
    }),
});

export const {
    useGetDisclaimerQuery,
    useCreateDisclaimerMutation,
} = disclaimerSlice;
