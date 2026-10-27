import axios, { AxiosError, AxiosRequestConfig } from "axios";

export class APIError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Runs BEFORE every request (later: add the login token here, once, for every call)
apiClient.interceptors.request.use((config) => {
  if (!config.baseURL) {
    throw new APIError("NEXT_PUBLIC_API_URL is not set in .env.local");
  }
  return config;
});

// Runs AFTER every response: turns any failure into one clear APIError
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error instanceof APIError) return Promise.reject(error);

    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || "Something went wrong";

    console.error(`[API] ${error.config?.method?.toUpperCase()} ${error.config?.url} failed (${status ?? "no response"}):`, message);

    return Promise.reject(new APIError(message, status));
  },
);

// Short helpers that return only the data (no need to write `.data` everywhere)
export const api = {
  get: <TResponse>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig) =>
    apiClient.get<TResponse>(url, { ...config, params }).then((res) => res.data),

  post: <TResponse, TPayload = unknown>(url: string, payload?: TPayload, config?: AxiosRequestConfig) =>
    apiClient.post<TResponse>(url, payload, config).then((res) => res.data),

  put: <TResponse, TPayload = unknown>(url: string, payload?: TPayload, config?: AxiosRequestConfig) =>
    apiClient.put<TResponse>(url, payload, config).then((res) => res.data),

  delete: <TResponse>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<TResponse>(url, config).then((res) => res.data),
};
