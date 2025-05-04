import apiClient from "@/lib/axios.ts";

export const adminDeleteSettings = async ({
                                              id,
                                          }: {
    id: number;
}) => {
    const res = await apiClient.delete(`/admin/settings/delete/${id}`);

    return res.data;
};