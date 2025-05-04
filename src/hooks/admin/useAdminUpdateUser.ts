import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {adminUpdateUser} from "@/api/admin/adminUpdateUser.ts";
import {AxiosError} from "axios";

export const useAdminUpdateUser = () => {
    return useMutation({
        mutationFn: adminUpdateUser,
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || "Kullanıcı güncellenirken hata oldu.";
            toast.error(errorMessage);
        }
    });
};