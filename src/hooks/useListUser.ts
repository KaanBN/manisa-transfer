import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {UserListResponse} from "@/models/response/userListResponse.ts";
import {fetchUsers} from "@/api/users/fetchUsers.ts";

export const useListUser = (name?: string) => {
    return useQuery<UserListResponse, AxiosError>({
        queryKey: ['listUser', name],
        queryFn: () => fetchUsers(name),
        staleTime: 5 * 60 * 1000,
        enabled: !!name,
    });
};