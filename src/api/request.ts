import { GetAuthCookie } from "@/utils/token";
import axios, { AxiosError, AxiosResponse } from "axios";
import * as AxiosLogger from "axios-logger";

type APIReq = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface APIResponse<T = any> {
  error: boolean;
  message: string;
  data: T | null;
  err?: string;
}

type ErrorResponse = {
  error: boolean;
  message: string;
  err: string;
};

// Axios instance creation with logger interceptors
const instance = axios.create({
  baseURL: `https://emitrrkittenboomserver-production.up.railway.app/api/v1`,
  withCredentials: true
});

instance.interceptors.request.use(
  AxiosLogger.requestLogger,
  AxiosLogger.errorLogger
);

instance.interceptors.response.use(
  AxiosLogger.responseLogger,
  AxiosLogger.errorLogger
);

// Request Handler function with strong typing
export const RequestHandler = async (
  req: APIReq,
  url: string,
  payload?: any,
  headers?: any
): Promise<AxiosResponse> => {
  const token = GetAuthCookie();


  const defaultHeaders = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...headers
    },
  };

  switch (req) {
    case "GET":
      return instance.get(url, defaultHeaders);
    case "POST":
      return instance.post(url, payload, defaultHeaders);
    case "PUT":
      return instance.put(url, payload, defaultHeaders);
    case "DELETE":
      return instance.delete(url, defaultHeaders);
    case "PATCH":
      return instance.patch(url, payload, defaultHeaders);
    default:
      throw new Error("Invalid Request");
  }
};

const APIHandler = async <T>(
  req: APIReq,
  url: string,
  payload?: any,
  headers?: any
): Promise<APIResponse<T>> => {
  try {
    // Strong typing for Axios response
    const response: AxiosResponse = await RequestHandler(req, url, payload, headers);
    const { data, status } = response;

    if (status >= 200 && status < 300) {
      return {
        error: false,
        message: data?.message || "Success",
        data: data?.data as T,
      };
    }

    // Handle unexpected status codes
    return {
      error: true,
      message: data?.message || "Unexpected error occurred",
      data: null,
      err: data?.err || "",
    };
  } catch (e) {
    const error = e as AxiosError;
    const response = error.response;

    // Ensure graceful error handling for network errors or no response
    if (!response) {
      return {
        error: true,
        message: error.message || "Network Error",
        data: null,
        err: "No response received from server",
      };
    }

    const errorResponse = response?.data as ErrorResponse;

    return {
      error: true,
      message: errorResponse?.message || "Error occurred",
      err: errorResponse?.err || error.message,
      data: null,
    };
  }
};

export default APIHandler;