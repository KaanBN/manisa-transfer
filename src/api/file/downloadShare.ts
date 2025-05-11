import apiClient from "@/lib/axios.ts";

type DownloadFileProps = {
    shareId: number;
    twoFaCode: string;
};

export const downloadShare = async ({shareId, twoFaCode}: DownloadFileProps) => {
    const response = await apiClient.get(
        `/files/download/${shareId}`,
        {
            responseType: "blob",
            headers: {
                "X-2FA-Code": twoFaCode,
            },
        }
    );


    const disposition = response.headers['content-disposition'];
    let filename = "spil.zip";

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

    const contentType = response.headers['content-type'];

    const blob = new Blob([response.data], {
        type: contentType || 'application/octet-stream'
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
};