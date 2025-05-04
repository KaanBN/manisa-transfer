import {LogModel} from "@/models/admin/logModel.ts";

export type AdminListLogsResponse = {
    data: LogModel[];
    totalRowCount: number;
    pageCount: number;
}