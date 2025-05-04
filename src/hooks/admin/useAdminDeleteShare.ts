import { useMutation } from "@tanstack/react-query";
import {adminDeleteShares} from "@/api/admin/adminDeleteShares.ts";
import {toast} from "sonner";
import {AxiosError} from "axios";

export const useAdminDeleteShare = () => {
    return useMutation({
        mutationFn: adminDeleteShares,

        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || "Silme sırasında hata oldu.";
            toast.error(errorMessage);
        },
    });
};