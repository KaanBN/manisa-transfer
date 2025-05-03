import {DetailedShareModel} from "@/models/admin/detailedShareModel.ts";

export type AdminFileListResponse = {
    totalRowCount: number;
    pageCount: number;
    data: DetailedShareModel[]
}