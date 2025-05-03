import { useMutation } from "@tanstack/react-query";
import { adminUpdateUserMaxUploadSize } from "@/api/admin/adminUpdateUserMaxUploadSize.ts";

export const useAdminUpdateUserUploadSize = () => {
    return useMutation({
        mutationFn: adminUpdateUserMaxUploadSize,
    });
};