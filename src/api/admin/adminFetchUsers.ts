import apiClient from "@/lib/axios.ts";

export const adminFetchUsers = async ({
                                           page,
                                           pageSize,
                                           username,
}: {
    page: number;
    pageSize: number;
    username?: string;
}) => {
    const res = await apiClient.get("/admin/users/list", {
        params: {
            page,
            pageSize,
            name:  username,
        },
    });

    return res.data;
};