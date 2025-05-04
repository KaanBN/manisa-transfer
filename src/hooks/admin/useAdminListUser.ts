import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {adminFetchUsers} from "@/api/admin/adminFetchUsers.ts";
import {AdminUserListResponse} from "@/models/admin/adminUserListResponse.ts";

export const useAdminListUser = ({
                                     pageIndex,
                                     pageSize,
                                     username,
                                 }: {
    pageIndex: number;
    pageSize: number;
    username?: string;
}) => {
    return useQuery<AdminUserListResponse, AxiosError>({
        queryKey: ["adminUsers", pageIndex, pageSize, username],
        queryFn: () =>
            adminFetchUsers({
                page: pageIndex + 1,
                pageSize,
                username,
            }),
        placeholderData: keepPreviousData
    });
};