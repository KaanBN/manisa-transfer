import { useMutation } from "@tanstack/react-query";
import { downloadFiles } from "@/api/file/downloadFiles";
import {toast} from "sonner";

export const useDownloadFile = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: downloadFiles,
        onSuccess: () => {
            if (onSuccess) onSuccess();
        },
        onError: () => {
            toast.error("Dosya indirilirken hata oluştu.");
        }
    });
};