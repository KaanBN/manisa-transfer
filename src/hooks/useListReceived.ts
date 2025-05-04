import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {fetchReceived} from "@/api/file/fetchReceived.ts";
import {ReceivedFilesListResponse} from "@/models/response/receivedFilesListResponse.ts";

export const useListReceived = ({
                                    pageIndex,
                                    pageSize,
                                    username,
                                }: {
    pageIndex: number;
    pageSize: number;
    username?: string;
}) => {
    return useQuery<ReceivedFilesListResponse, AxiosError>({
        queryKey: ["receivedFiles", pageIndex, pageSize, username],
        queryFn: () =>
            fetchReceived({
                page: pageIndex + 1,
                pageSize,
                username,
            }),
        placeholderData: keepPreviousData
    });
};