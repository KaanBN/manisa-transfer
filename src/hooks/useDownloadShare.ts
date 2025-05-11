import { useMutation } from "@tanstack/react-query";
import { downloadShare } from "@/api/file/downloadShare.ts";

export const useDownloadShare = () => {
    return useMutation({
        mutationFn: downloadShare,
    });
};