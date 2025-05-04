import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {adminUpdateSettings} from "@/api/admin/adminUpdateSettings.ts";

export const useAdminUpdateSetting = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adminUpdateSettings,
        onError: () => {
            toast.error("Güncelleme sırasında hata oldu.")
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["adminSettings"]
            })
        },
    });
};