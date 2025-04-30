import { useMutation } from "@tanstack/react-query";
import {sendFiles} from "@/api/file/sendFiles.ts";

export const useSendFiles = () => {
    return useMutation({
        mutationFn: sendFiles,
    });
};