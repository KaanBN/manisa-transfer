import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {adminUpdateUser} from "@/api/admin/adminUpdateUser.ts";

export const useAdminUpdateUser = () => {
    return useMutation({
        mutationFn: adminUpdateUser,
        onError: () => {
            toast.error("Kullanıcı güncellenirken hata oldu.")
        }
    });
};