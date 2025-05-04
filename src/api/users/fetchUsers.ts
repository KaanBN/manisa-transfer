import apiClient from "@/lib/axios.ts";

export const fetchUsers = async (name?: string) => {
    const res = await apiClient.get("/user/list", {
        params: name ? {name} : undefined,
    });

    return res.data;
};