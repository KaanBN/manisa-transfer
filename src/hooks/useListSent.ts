import {useQuery} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {fetchSent} from "@/api/file/fetchSent.ts";
import {SentFilesListResponse} from "@/models/response/sentFilesListResponse.ts";

export const useListSent = () => {
    return useQuery<SentFilesListResponse, AxiosError>({
        queryKey: ['sentFiles'],
        queryFn: fetchSent,
    });
};
