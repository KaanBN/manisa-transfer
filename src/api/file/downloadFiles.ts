import apiClient from "@/lib/axios.ts";

type DownloadFileProps = {
    shareFileIdList: string[];
    onDownloadProgress?: (progress: number) => void;
    twoFaCode: string;
};

export const downloadFiles = async ({ shareFileIdList, onDownloadProgress, twoFaCode }: DownloadFileProps) => {
    const response = await apiClient.post(
        "/files/download",
        shareFileIdList,
        {
            responseType: "blob",
            headers: {
                "X-2FA-Code": twoFaCode,
            },
            onDownloadProgress: (event) => {
                if (onDownloadProgress && event.total) {
                    const percent = Math.round((event.loaded * 100) / event.total);
                    onDownloadProgress(percent);
                }
            },
        }
    );

    const contentType = response.headers['content-type'];
    console.log("DOWNLOAD_FİLES_!");
    console.log(contentType);

    if (contentType && contentType.includes('application/json')) {
        const errorText = await new Response(response.data).text();
        console.log("DOWNLOAD_FİLES");
        console.log(errorText);

        const json = JSON.parse(errorText);
        const error = new Error(json.message || "Download failed.");
        (error as any).response = json;
        throw error;
    }

    const disposition = response.headers['content-disposition'];
    let filename = "download.zip";

    if (disposition) {
        const utf8Match = disposition.match(/filename\*\=UTF-8''([^;]+)/i);
        if (utf8Match && utf8Match[1]) {
            filename = decodeURIComponent(utf8Match[1]);
        } else {
            const asciiMatch = disposition.match(/filename="([^"]+)"/i);
            if (asciiMatch && asciiMatch[1]) {
                filename = asciiMatch[1];
            }
        }
    }

    const blob = new Blob([response.data], {
        type: contentType || 'application/octet-stream',
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
};