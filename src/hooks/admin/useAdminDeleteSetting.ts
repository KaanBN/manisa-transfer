import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {adminDeleteSettings} from "@/api/admin/adminDeleteSettings.ts";

export const useAdminDeleteSetting = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adminDeleteSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["adminSettings"]
            })
        },
        onError: () => {
            toast.error("Silme sırasında hata oldu.")
        }
    });
};