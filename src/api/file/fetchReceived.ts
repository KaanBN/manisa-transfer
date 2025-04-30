import apiClient from "@/lib/axios.ts";

type FetchReceivedProps = {};

export const fetchReceived = async () => {
    const res = await apiClient.get("/files/list/received");

    return res.data;
};