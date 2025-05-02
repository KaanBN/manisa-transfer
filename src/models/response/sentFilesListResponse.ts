import {ShareModel} from "@/models/shareModel.ts";

export type SentFilesListResponse = {
    totalRowCount: number;
    data: ShareModel[]
}