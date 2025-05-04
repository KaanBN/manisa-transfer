import {useMutation} from "@tanstack/react-query";
import {downloadFiles} from "@/api/file/downloadFiles";
import {toast} from "sonner";
import {AxiosError} from "axios";

export const useDownloadFile = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: downloadFiles,
        onSuccess: () => {
            if (onSuccess) onSuccess();
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || "Dosya indirilirken bir hata oluştu.";
            toast.error(errorMessage);
        }
    });
};