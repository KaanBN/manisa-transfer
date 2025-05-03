import apiClient from "@/lib/axios.ts";

export const adminDeleteShares = async ({
                                          shareId,
                                      }: {
    shareId: number;
}) => {
    const res = await apiClient.delete(`/admin/shares/delete/${shareId}`);

    return res.data;
};