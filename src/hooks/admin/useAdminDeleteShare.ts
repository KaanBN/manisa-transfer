import { useMutation } from "@tanstack/react-query";
import {adminDeleteShares} from "@/api/admin/adminDeleteShares.ts";
import {toast} from "sonner";

export const useAdminDeleteShare = () => {
    return useMutation({
        mutationFn: adminDeleteShares,
        onError: () => {
            toast.error("Silme sırasında hata oldu.")
        }
    });
};