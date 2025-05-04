import apiClient from "@/lib/axios.ts";

interface UpdateUserParams {
    id: number;
    userName?: string;
    displayName?: string;
    password?: string;
    maxUploadSize?: number | null;
    role?: number;
}

export const adminUpdateUser = async ({ id, userName, displayName, password, maxUploadSize, role }: UpdateUserParams) => {
    const res = await apiClient.put(`/admin/user/update/${id}`, {
        userName,
        displayName,
        password,
        maxUploadSize,
        role
    });

    return res.data;
};