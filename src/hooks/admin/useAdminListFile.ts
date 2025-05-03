import {keepPreviousData, useQuery} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {adminFetchFiles} from "@/api/admin/adminFetchFiles.ts";
import {AdminFileListResponse} from "@/models/admin/adminFileListResponse.ts";

export const useAdminListFile = ({
                                pageIndex,
                                pageSize,
                                 senderUsername,
                                 receiverUsername,
                            }: {
    pageIndex: number;
    pageSize: number;
    senderUsername?: string;
    receiverUsername?: string;
}) => {
    return useQuery<AdminFileListResponse, AxiosError>({
        queryKey: ["adminFiles", pageIndex, pageSize, senderUsername, receiverUsername],
        queryFn: () =>
            adminFetchFiles({
                page: pageIndex + 1,
                pageSize,
                senderUsername,
                receiverUsername
            }),
        placeholderData: keepPreviousData
    });
};