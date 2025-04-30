import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth/login";

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            const token = data.data.token;
            console.log("Token before saving: ", token);

            localStorage.setItem("accessToken", token);
            window.dispatchEvent(new Event("tokenChanged"));
        },
    });
};