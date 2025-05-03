import axios from "axios";
import {getLogoutFunction} from "@/context/authContext.tsx";

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
        return Promise.reject(error);
    }
);

export default apiClient;
