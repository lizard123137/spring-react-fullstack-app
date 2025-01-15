import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosIntercepter {
    isRefreshing: Boolean;
    refreshSubscribers: Array<any>

    axiosInstance: AxiosInstance;

    get: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => Promise<R>;
    post: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
    put: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
    patch: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
    delete: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => Promise<R>;

    constructor(instanceConfig = {}) {
        this.isRefreshing = false;
        this.refreshSubscribers = [];

        this.axiosInstance = axios.create({
            ...instanceConfig,
        });

        this.axiosInstance.interceptors.request.use(
            (config) => {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (
                    error.response &&
                    error.response.status === 401 &&
                    error.response.data.message === "TokenExpiredError" &&
                    !originalRequest._retry
                ) {
                    if (!this.isRefreshing) {
                        this.isRefreshing = true;

                        try {
                            const newTokens = await this.refreshTokens();
                            localStorage.setItem("accessToken", newTokens.accessToken);
                            localStorage.setItem("refreshToken", newTokens.refreshToken);

                            this.refreshSubscribers.forEach((callback) => {
                                callback(newTokens.accessToken);
                            });
                        } catch (error) {
                            this.refreshSubscribers = [];
                            localStorage.removeItem("accessToken");
                            localStorage.removeItem("refreshToken");
                            return Promise.reject(error);
                        } finally {
                            this.isRefreshing = false;
                        }
                    }

                    return new Promise((resolve) => {
                        this.refreshSubscribers.push((newAccessToken: String) => {
                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                            originalRequest._retry = true;
                            resolve(this.axiosInstance(originalRequest));
                        });
                    });
                }
                return Promise.reject(error);
            }
        )

        this.get = this.axiosInstance.get.bind(this.axiosInstance);
        this.post = this.axiosInstance.post.bind(this.axiosInstance);
        this.put = this.axiosInstance.put.bind(this.axiosInstance);
        this.patch = this.axiosInstance.patch.bind(this.axiosInstance);
        this.delete = this.axiosInstance.delete.bind(this.axiosInstance);
    }

    async refreshTokens() {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }

        const response = await this.axiosInstance.post("/auth/refreshToken", {
            refreshToken,
        });
        return response.data; // Expected { accessToken: String, refreshToken: String }
    }
}

export const client = new AxiosIntercepter({
    baseURL: "http://localhost:8080/api",
})