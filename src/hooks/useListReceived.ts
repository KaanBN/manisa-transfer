import {useQuery} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {fetchReceived} from "@/api/file/fetchReceived.ts";
import {ReceivedFilesListResponse} from "@/models/response/receivedFilesListResponse.ts";

export const useListReceived = () => {
    return useQuery<ReceivedFilesListResponse, AxiosError>({
        queryKey: ['sharedWithMe'],
        queryFn: fetchReceived,
    });
};
