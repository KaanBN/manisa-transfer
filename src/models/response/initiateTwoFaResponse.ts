export type InitiateTwoFaResponse = {
    message: string;
    data?: {
        qrCodeBase64: string;
    }
}