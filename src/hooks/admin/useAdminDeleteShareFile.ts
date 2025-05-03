import { useMutation } from "@tanstack/react-query";
import {adminDeleteShareFile} from "@/api/admin/adminDeleteFiles.ts";

export const useAdminDeleteShareFile = () => {
    return useMutation({
        mutationFn: adminDeleteShareFile,
    });
};