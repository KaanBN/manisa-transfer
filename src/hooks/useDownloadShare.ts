import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { downloadShare } from "@/api/file/downloadShare.ts";

export const useDownloadShare = () => {
    return useMutation<void, AxiosError, { shareId: number }>({
        mutationFn: ({ shareId }) => downloadShare({ shareId }),
    });
};