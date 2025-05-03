import { useMutation } from "@tanstack/react-query";
import {adminCreateNewUser} from "@/api/admin/adminCreateNewUser.ts";
import {toast} from "sonner";

export const useAdminCreateNewUser = () => {
    return useMutation({
        mutationFn: adminCreateNewUser,
        onError: () => {
            toast.error("Kullanıcı oluştururken bir hata oldu.");
        }
    });
};