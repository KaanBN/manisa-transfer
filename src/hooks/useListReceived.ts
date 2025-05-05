import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {fetchReceived} from "@/api/file/fetchReceived.ts";
import {ReceivedFilesListResponse} from "@/models/response/receivedFilesListResponse.ts";

export const useListReceived = ({
                                    pageIndex,
                                    pageSize,
                                    username,
                                    title,
                                    fromTime,
                                    toTime,
                                    sortBy,
                                    sortOrder
                                }: {
    pageIndex: number;
    pageSize: number;
    username?: string;
    title?: string;
    fromTime?: string;
    toTime?: string;
    sortBy?: string;
    sortOrder?: string;
}) => {
    return useQuery<ReceivedFilesListResponse, AxiosError>({
        queryKey: ["receivedFiles", pageIndex, pageSize, username, title, fromTime, toTime, sortBy, sortOrder],
        queryFn: () =>
            fetchReceived({
                page: pageIndex + 1,
                pageSize,
                username,
                title,
                fromTime,
                toTime,
                sortBy,
                sortOrder
            }),
        placeholderData: keepPreviousData
    });
};