import apiClient from "@/lib/axios.ts";

type SendFilesPayload = {
    title: string;
    message: string;
    receiverId?: number;
    files: File[];
    onProgress: (progress: number) => void;
    expireOption?:  string;
};

export const sendFiles = async ({title, message, receiverId, files, onProgress, expireOption}: SendFilesPayload) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("message", message);
    if (receiverId) {
        formData.append("receiverId", receiverId.toString());
    }
    if (expireOption) {
        formData.append("expireOption", expireOption);
    }

    files.forEach((file) => {
        formData.append("files", file);
    });

    const res = await apiClient.post("/files/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
            if (onProgress && event.total) {
                const percent = Math.round((event.loaded * 100) / event.total);
                onProgress(percent);
            }
        }
    });

    return res.data;
};