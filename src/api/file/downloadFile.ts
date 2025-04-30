import apiClient from "@/lib/axios.ts";

export const downloadFile = async (shareIdList: string[]) => {
    const params = new URLSearchParams();
    shareIdList.forEach(id => params.append("shareIdList", id));

    const response = await apiClient.get("/files/download", {
        params,
        responseType: "blob",
    });

    const href = URL.createObjectURL(response.data);
};