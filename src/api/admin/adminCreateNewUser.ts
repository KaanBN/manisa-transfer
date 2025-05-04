import apiClient from "@/lib/axios.ts";

type Payload = {
    userName: string;
    displayName: string;
    password: string;
    maxUploadSize?: number | null;
    role: number;
};

export const adminCreateNewUser = async ({userName, displayName, password, maxUploadSize, role}: Payload) => {
    const res = await apiClient.post("/admin/user/create", {
        userName,
        displayName,
        password,
        maxUploadSize,
        role
    });

    return res.data;
};