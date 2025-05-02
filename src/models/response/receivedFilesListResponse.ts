import {ShareModel} from "@/models/shareModel.ts";

export type ReceivedFilesListResponse = {
    totalRowCount: number;
    data: ShareModel[]
}