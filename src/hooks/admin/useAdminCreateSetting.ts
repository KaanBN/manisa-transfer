import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {adminCreateSettings} from "@/api/admin/adminCreateSettings.ts";

export const useAdminCreateSetting = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adminCreateSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["adminSettings"]
            })
        },
        onError: () => {
            toast.error("Ekleme sırasında hata oldu.")
        }
    });
};