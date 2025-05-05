import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {adminFetchFiles} from "@/api/admin/adminFetchFiles.ts";
import {AdminFileListResponse} from "@/models/admin/adminFileListResponse.ts";

export const useAdminListFile = ({
                                     pageIndex,
                                     pageSize,
                                     fromTime,
                                     toTime,
                                     title,
                                     senderUsername,
                                     receiverUsername,
                                     sortOrder,
                                     sortBy,
                                 }: {
    pageIndex: number;
    pageSize: number;
    fromTime?: string;
    toTime?: string;
    title?: string;
    senderUsername?: string;
    receiverUsername?: string;
    sortOrder?: string;
    sortBy?: string;
}) => {
    return useQuery<AdminFileListResponse, AxiosError, AdminFileListResponse>({
        queryKey: ["adminFiles", pageIndex, pageSize, fromTime, toTime, title, senderUsername, receiverUsername, sortOrder, sortBy],
        queryFn: () =>
            adminFetchFiles({
                page: pageIndex + 1,
                pageSize: pageSize,
                fromTime: fromTime,
                toTime: toTime,
                title: title,
                senderUsername: senderUsername,
                receiverUsername: receiverUsername,
                sortOrder: sortOrder,
                sortBy: sortBy
            }),
        placeholderData: keepPreviousData,
    });

};