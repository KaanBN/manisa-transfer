import {ShareFileModel} from "@/models/shareFileModel.ts";
import {UserModel} from "@/models/userModel.ts";

export type DetailedShareModel = {
    id: number;
    recipient: UserModel;
    sender: UserModel;
    title: string;
    message: string;
    status: number;
    uploadTime: string;
    expireTime: string;
    files: ShareFileModel[];
};