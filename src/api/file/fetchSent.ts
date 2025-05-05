import apiClient from "@/lib/axios.ts";

export const fetchSent = async ({
                                    page,
                                    pageSize,
                                    username,
                                    title,
                                    fromTime,
                                    toTime,
                                    sortBy,
                                    sortOrder
                                }: {
    page: number;
    pageSize: number;
    username?: string;
    title?: string;
    fromTime?: string;
    toTime?: string;
    sortBy?: string;
    sortOrder?: string;
}) => {
    const res = await apiClient.get("/files/list/sent", {
        params: {
            page,
            pageSize,
            username,
            title,
            fromTime,
            toTime,
            sortBy,
            sortOrder
        },
    });

    return res.data;
};