import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {adminDeleteSettings} from "@/api/admin/adminDeleteSettings.ts";
import {AxiosError} from "axios";

export const useAdminDeleteSetting = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adminDeleteSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["adminSettings"]
            })
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || "Silme sırasında hata oldu.";
            toast.error(errorMessage);
        },
    });
};