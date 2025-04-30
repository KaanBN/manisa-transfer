import {useQuery} from "@tanstack/react-query";
import {SharedFileResponse} from "@/models/sharedFileResponse.ts";
import { AxiosError } from "axios";
import {fetchReceived} from "@/api/file/fetchReceived.ts";

export const useListReceived = () => {
    return useQuery<SharedFileResponse, AxiosError>({
        queryKey: ['sharedWithMe'],
        queryFn: fetchReceived,
    });
};
