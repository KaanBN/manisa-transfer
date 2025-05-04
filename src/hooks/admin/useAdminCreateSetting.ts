import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {adminCreateSettings} from "@/api/admin/adminCreateSettings.ts";
import {AxiosError} from "axios";

export const useAdminCreateSetting = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: adminCreateSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["adminSettings"]
            })
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || "Ekleme sırasında hata oldu.";
            toast.error(errorMessage);
        },
    });
};