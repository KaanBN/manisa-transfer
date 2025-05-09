import apiClient from "@/lib/axios.ts";

export const verifyTwoFa = async ({code} : {code: string}) => {
    const res = await apiClient.post("/auth/verifyTwoFa",
        {
            code: code
        });

    return res.data;
};