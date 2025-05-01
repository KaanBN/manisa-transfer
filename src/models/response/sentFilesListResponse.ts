import {ShareModel} from "@/models/shareModel.ts";

export type SentFilesListResponse = {
    totalCount: number;
    data: ShareModel[]
}