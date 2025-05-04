import apiClient from "@/lib/axios.ts";

export const adminUpdateSettings = async ({
                                              id,
                                              key,
                                              value,
                                          }: {
    id: number;
    key: string;
    value: string;
}) => {
    const res = await apiClient.put(`/admin/settings/update/${id}`, {
        key,
        value
    });

    return res.data;
};