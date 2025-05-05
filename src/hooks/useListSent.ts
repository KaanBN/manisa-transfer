import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {fetchSent} from "@/api/file/fetchSent.ts";
import {SentFilesListResponse} from "@/models/response/sentFilesListResponse.ts";

export const useListSent = ({
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
    return useQuery<SentFilesListResponse, AxiosError>({
        queryKey: ["sentFiles", pageIndex, pageSize, username, title, fromTime, toTime, sortBy, sortOrder],
        queryFn: () =>
            fetchSent({
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