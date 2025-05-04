import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {adminUpdateSettings} from "@/api/admin/adminUpdateSettings.ts";
import {AxiosError} from "axios";

export const useAdminUpdateSetting = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adminUpdateSettings,
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || "Güncelleme sırasında hata oldu.";
            toast.error(errorMessage);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["adminSettings"]
            })
        },
    });
};