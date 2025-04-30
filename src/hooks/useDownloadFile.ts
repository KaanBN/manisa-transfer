import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { downloadFile } from "@/api/file/downloadFile";

export const useDownloadFile = () => {
    return useMutation<void, AxiosError, string[]>({
        mutationFn: downloadFile,
    });
};