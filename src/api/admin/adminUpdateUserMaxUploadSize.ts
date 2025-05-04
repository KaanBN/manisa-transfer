import apiClient from "@/lib/axios.ts";

export const adminUpdateUserMaxUploadSize = async ({
                                                       userId,
                                                       maxUploadSize,
                                                   }: {
    userId: number;
    maxUploadSize: number;
}) => {
    const res = await apiClient.put("/admin/user/update-max-upload-size", {
        userId,
        maxUploadSize
    });

    return res.data;
};