import apiClient from "@/lib/axios.ts";

type LoginPayload = {
    username: string;
    password: string;
};

export const login = async (data: LoginPayload) => {
    const res = await apiClient.post("/auth/login", data);

    return res.data;
};