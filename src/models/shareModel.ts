import {ShareFileModel} from "@/models/shareFileModel.ts";

export type ShareModel = {
    id: string;
    userName: string;
    title: string;
    message: string;
    uploadTime: string;
    expireTime: string;
    files: ShareFileModel[];
    status: number;
};