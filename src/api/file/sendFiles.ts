import apiClient from "@/lib/axios.ts";

type SendFilesPayload = {
    title: string;
    message: string;
    receiverId?: number;
    files: File[];
};

export const sendFiles = async ({ title, message, receiverId, files }: SendFilesPayload) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("message", message);
    if (receiverId) {
        formData.append("shareWithId", receiverId.toString());
    }

    files.forEach((file) => {
        formData.append("files", file);
    });

    const res = await apiClient.post("/files/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};