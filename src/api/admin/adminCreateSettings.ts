import apiClient from "@/lib/axios.ts";

export const adminCreateSettings = async ({
                                              key,
                                              value
                                          }: {
    key: string;
    value: string;
}) => {
    const res = await apiClient.put(`/admin/settings/create`, {
        key,
        value
    });

    return res.data;
};