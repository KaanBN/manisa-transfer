import { useMutation } from "@tanstack/react-query";
import { adminUpdateUserMaxUploadSize } from "@/api/admin/adminUpdateUserMaxUploadSize.ts";
import {toast} from "sonner";
import {AxiosError} from "axios";

export const useAdminUpdateUserUploadSize = () => {
    return useMutation({
        mutationFn: adminUpdateUserMaxUploadSize,
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || "Kullanıcı bilgisi güncellenirken hata oldu.";
            toast.error(errorMessage);
        }
    });
};