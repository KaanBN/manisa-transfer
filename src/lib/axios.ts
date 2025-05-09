import axios from "axios";
import {getCheckTwoFaDialogFunction, getLogoutFunction} from "@/context/authContext.tsx";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const logout = getLogoutFunction();
            logout();
        }
        else if (error.response?.status === 403) {
            if (error.response.data?.error === "TWO_FA_REQUIRED") {
                const checkTwoFaDialog = getCheckTwoFaDialogFunction();
                checkTwoFaDialog();
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
