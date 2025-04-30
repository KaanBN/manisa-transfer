import apiClient from "@/lib/axios.ts";

export const downloadFile = async (shareIdList: string[]): Promise<void> => {
    const params = new URLSearchParams();
    shareIdList.forEach(id => params.append("shareIdList", id));

    const response = await apiClient.get("/files/download", {
        params,
        responseType: "blob",
    });


    const disposition = response.headers['content-disposition'];
    let filename = "dess.zip";

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

    /*// Content-type'ı al
    const contentType = response.headers['content-type'];

    // Dosya adını al
    let filename = "files.zip";
    const disposition = response.headers['content-disposition'];
    if (disposition && disposition.includes('filename=')) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
        }
    }

    // Blob oluştur - burada content type'ı API'den alınan ile kullanıyoruz
    const blob = new Blob([response.data], {
        type: contentType || 'application/octet-stream'
    });

    // Download URL oluştur
    const url = window.URL.createObjectURL(blob);

    // İndirme işlemini başlat
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    // Temizlik
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);*/
};