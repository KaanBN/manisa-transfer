import {useMutation} from "@tanstack/react-query";
import {adminDeleteShareFile} from "@/api/admin/adminDeleteFiles.ts";
import {toast} from "sonner";
import {AxiosError} from "axios";

export const useAdminDeleteShareFile = () => {
    return useMutation({
        mutationFn: adminDeleteShareFile,
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || "Dosya silinirken hata oldu.";
            toast.error(errorMessage);
        },
    });
};