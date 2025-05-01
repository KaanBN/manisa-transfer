import {ShareModel} from "@/models/shareModel.ts";

export type ReceivedFilesListResponse = {
    totalCount: number;
    data: ShareModel[]
}