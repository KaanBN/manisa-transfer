import { useMutation, useQueryClient } from '@tanstack/react-query';
import {login} from "@/api/login.ts";
import {User} from "@/models/userModel.ts";

export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,
        onSuccess: (user: User) => {
            queryClient.setQueryData(['user'], user);
        },
    });
};

export const useUser = (): User | undefined => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData<User>(['user']);
};
