import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {InitiateTwoFaResponse} from "@/models/response/initiateTwoFaResponse.ts";
import {initiateTwoFa} from "@/api/auth/two-fac/initiateTwoFa.ts";

export const useInitiateTwoFa = () => {
    return useMutation<InitiateTwoFaResponse, AxiosError>({
        mutationFn: () => initiateTwoFa(),
    });
};