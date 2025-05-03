import {DetailedUserModel} from "@/models/admin/detailedUserModel.ts";

export type AdminUserListResponse = {
    totalRowCount: number;
    pageCount: number;
    data: DetailedUserModel[]
}