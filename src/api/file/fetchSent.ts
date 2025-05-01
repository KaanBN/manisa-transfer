import apiClient from "@/lib/axios.ts";

export const fetchSent = async ({
                                    page,
                                    pageSize,
                                    username,
                                }: {
    page: number;
    pageSize: number;
    username?: string;
}) => {
    const res = await apiClient.get("/files/list/sent", {
        params: {
            page,
            pageSize,
            username,
        },
    });

    return res.data;
};