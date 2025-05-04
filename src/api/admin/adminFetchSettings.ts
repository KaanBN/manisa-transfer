import apiClient from "@/lib/axios.ts";

export const adminFetchSettings = async () => {
    const res = await apiClient.get("/admin/settings/list");

    return res.data;
};