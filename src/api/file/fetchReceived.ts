import apiClient from "@/lib/axios.ts";

export const fetchReceived = async ({
                                        page,
                                        pageSize,
                                        username,
                                    }: {
    page: number;
    pageSize: number;
    username?: string;
}) => {
    const res = await apiClient.get("/files/list/received", {
        params: {
            page,
            pageSize,
            username,
        },
    });

    return res.data;
};
