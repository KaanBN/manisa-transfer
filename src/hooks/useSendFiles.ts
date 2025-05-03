import { useMutation } from "@tanstack/react-query";
import {sendFiles} from "@/api/file/sendFiles.ts";
import {toast} from "sonner";

export const useSendFiles = () => {
    return useMutation({
        mutationFn: sendFiles,
        onError: () => {
            toast.error("Dosya gönderilirken hata.");
        }
    });
};