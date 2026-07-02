import axios, { type AxiosError } from "axios";
import type { ApiResponse } from "@/types/banking";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/** Normalized error shape surfaced to the UI. */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    const backendMessage = error.response?.data?.message;
    const message =
      backendMessage ||
      (error.code === "ERR_NETWORK"
        ? "Can't reach the Prestige Banking API. Confirm the backend is running."
        : error.message || "Something went wrong. Please try again.");

    return Promise.reject(new ApiError(message, error.response?.status));
  },
);
