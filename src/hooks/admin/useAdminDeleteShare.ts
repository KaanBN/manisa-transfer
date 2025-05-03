import { useMutation } from "@tanstack/react-query";
import {adminDeleteShares} from "@/api/admin/adminDeleteShares.ts";

export const useAdminDeleteShare = () => {
    return useMutation({
        mutationFn: adminDeleteShares,
    });
};