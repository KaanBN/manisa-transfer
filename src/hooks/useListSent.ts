import {useQuery} from "@tanstack/react-query";
import {SharedFileResponse} from "@/models/sharedFileResponse.ts";
import { AxiosError } from "axios";
import {fetchSent} from "@/api/file/fetchSent.ts";

export const useListSent = () => {
    return useQuery<SharedFileResponse, AxiosError>({
        queryKey: ['sentFiles'],
        queryFn: fetchSent,
    });
};
