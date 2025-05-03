import apiClient from "@/lib/axios.ts";

type ShareDeleteFileProps = {
    shareFileIdList: string[];
};

export const adminDeleteShareFile = async ({ shareFileIdList }: ShareDeleteFileProps) => {
    const response = await apiClient.delete("/admin/share-files/delete",
        {
            data: shareFileIdList
        }
    );

    return response.data;
};