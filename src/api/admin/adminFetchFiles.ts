import apiClient from "@/lib/axios.ts";

export const adminFetchFiles = async ({
                                          page,
                                          pageSize,
                                          fromTime,
                                          toTime,
                                          title,
                                          senderUsername,
                                          receiverUsername,
                                      }: {
    page: number;
    pageSize: number;
    fromTime?: string;
    toTime?: string;
    title?: string;
    senderUsername?: string;
    receiverUsername?: string;
}) => {
    const res = await apiClient.get("/admin/shares/list", {
        params: {
            page,
            pageSize,
            fromTime,
            toTime,
            title,
            senderUsername,
            receiverUsername
        },
    });

    return res.data;
};