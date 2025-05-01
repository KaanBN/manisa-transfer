import {keepPreviousData, useQuery} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchSent } from "@/api/file/fetchSent.ts";
import { SentFilesListResponse } from "@/models/response/sentFilesListResponse.ts";

export const useListSent = ({
                                pageIndex,
                                pageSize,
                                username,
                            }: {
    pageIndex: number;
    pageSize: number;
    username?: string;
}) => {
    return useQuery<SentFilesListResponse, AxiosError>({
        queryKey: ["sentFiles", pageIndex, pageSize, username],
        queryFn: () =>
            fetchSent({
                page: pageIndex + 1,
                pageSize,
                username,
            }),
        placeholderData: keepPreviousData
    });
};