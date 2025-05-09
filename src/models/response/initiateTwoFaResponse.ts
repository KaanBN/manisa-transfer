export type InitiateTwoFaResponse = {
    message: string;
    data: {
        jwtToken: string;
        qrCodeBase64: string;
    }
}