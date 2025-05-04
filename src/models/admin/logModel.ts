export type LogModel = {
    id: number;
    user: {
        id: number;
        displayName: string;
    };
    action: string;
    createdAt: string;
    type: string;
    ipAddress: string;
}