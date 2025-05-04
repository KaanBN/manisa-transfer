import { useMutation } from "@tanstack/react-query";
import {adminCreateNewUser} from "@/api/admin/adminCreateNewUser.ts";
import {toast} from "sonner";
import {AxiosError} from "axios";

export const useAdminCreateNewUser = () => {
    return useMutation({
        mutationFn: adminCreateNewUser,
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || "Kullanıcı oluştururken bir hata oldu.";
            toast.error(errorMessage);
        },
    });
};