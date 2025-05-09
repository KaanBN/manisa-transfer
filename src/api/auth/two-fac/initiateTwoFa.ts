import apiClient from "@/lib/axios.ts";

export const initiateTwoFa = async () => {
    const res = await apiClient.post("/auth/initiateTwoFa");

    return res.data;
};