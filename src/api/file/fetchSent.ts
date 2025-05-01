import apiClient from "@/lib/axios.ts";

export const fetchSent = async () => {
    const res = await apiClient.get("/files/list/sent");

    return res.data;
};