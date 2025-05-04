import {useQuery} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {adminFetchSettings} from "@/api/admin/adminFetchSettings.ts";
import {AdminListSettingsResponse} from "@/models/response/adminListSettingsResponse.ts";

export const useAdminFetchSettings = () => {
    return useQuery<AdminListSettingsResponse, AxiosError, AdminListSettingsResponse>({
        queryKey: ["adminSettings"],
        queryFn: () =>
            adminFetchSettings()
    });

};