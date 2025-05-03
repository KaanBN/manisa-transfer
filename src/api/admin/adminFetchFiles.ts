import apiClient from "@/lib/axios.ts";

export const adminFetchFiles = async ({
                                          page,
                                          pageSize,
                                          senderUsername,
                                          receiverUsername,
                                      }: {
    page: number;
    pageSize: number;
    senderUsername?: string;
    receiverUsername?: string;
}) => {
    const res = await apiClient.get("/admin/shares/list", {
        params: {
            page,
            pageSize,
            senderUsername,
            receiverUsername
        },
    });

    return res.data;
};