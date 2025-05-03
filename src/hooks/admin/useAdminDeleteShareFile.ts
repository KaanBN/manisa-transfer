import { useMutation } from "@tanstack/react-query";
import {adminDeleteShareFile} from "@/api/admin/adminDeleteFiles.ts";
import {toast} from "sonner";

export const useAdminDeleteShareFile = () => {
    return useMutation({
        mutationFn: adminDeleteShareFile,
        onError: () => {
            toast.error("Dosya silinirken hata oldu.");
        }
    });
};