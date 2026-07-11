import { toast } from "sonner";

export type ErrorType = {
    data?: {
        errorMessages?: { message: string }[];
        message?: string;
    };
};

export const useErrorToast = () => {
    const showError = (error: any, fallbackMessage: string = "Something went wrong. Please try again.") => {
        const errorMessage = error?.data?.errorMessages
            ? error.data.errorMessages.map((msg: { message: string }) => msg?.message).join("\n")
            : error?.data?.message || fallbackMessage;
        toast.error(errorMessage);
    };

    return showError;
};
