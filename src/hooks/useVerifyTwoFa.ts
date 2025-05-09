import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {verifyTwoFa} from "@/api/auth/two-fac/verifyTwoFa.ts";
import {VerifyTwoFaResponse} from "@/models/response/verifyTwoFaResponse.ts";

export const useVerifyTwoFa = (): UseMutationResult<VerifyTwoFaResponse, unknown, { code: string }, unknown> => {
    return useMutation({
        mutationFn: verifyTwoFa,
    });
};