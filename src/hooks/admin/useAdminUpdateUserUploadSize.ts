import { useMutation } from "@tanstack/react-query";
import { adminUpdateUserMaxUploadSize } from "@/api/admin/adminUpdateUserMaxUploadSize.ts";
import {toast} from "sonner";

export const useAdminUpdateUserUploadSize = () => {
    return useMutation({
        mutationFn: adminUpdateUserMaxUploadSize,
        onError: () => {
            toast.error("Kullanıcı bilgisi güncellenirken hata oldu.")
        }
    });
};