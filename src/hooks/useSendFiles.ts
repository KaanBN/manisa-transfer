import {useMutation} from "@tanstack/react-query";
import {sendFiles} from "@/api/file/sendFiles.ts";
import {toast} from "sonner";
import {AxiosError} from "axios";

export const useSendFiles = () => {
    return useMutation({
        mutationFn: sendFiles,
        onError: (error: unknown) => {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || "Dosya gönderilirken beklenmeyen bir hata oluştu.";

            toast.error(errorMessage);
        }
    });
};