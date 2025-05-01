import apiClient from "@/lib/axios.ts";

export const fetchReceived = async () => {
    const res = await apiClient.get("/files/list/received");

    return res.data;
};