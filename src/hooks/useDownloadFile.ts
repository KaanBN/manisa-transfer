import { useMutation } from "@tanstack/react-query";
import { downloadFiles } from "@/api/file/downloadFiles";

export const useDownloadFile = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: downloadFiles,
        onSuccess: () => {
            if (onSuccess) onSuccess();
        },
    });
};