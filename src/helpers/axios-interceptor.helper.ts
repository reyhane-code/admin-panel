import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import { HttpRequest } from "./http-request-class.helper";

export function interceptorResponse(response: AxiosResponse) {
  // console.log(response);
  return response;
}

let isRefreshing: boolean = false;
const requestList: Array<InternalAxiosRequestConfig> = [];
function processQueue(requests: Array<InternalAxiosRequestConfig>) {
  requests.forEach((request: InternalAxiosRequestConfig) => {
    const tokens = HttpRequest.getTokens;
    request.headers.Authorization = `Bearer ${tokens?.accessToken}`;

    return new Promise((resolve) => {
      resolve(axios(request));
    });
  });
}

export async function interceptorResponseError(error: AxiosError) {
  const status = error?.response?.status;
  const originalRequest = error.config!;
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3500/api",
    timeout: 3000,
  });

  if (status == 401) {
    const tokens = HttpRequest.getTokens;
    if (!tokens?.refreshToken) {
      window.location.href = "/login";
      return;
    }

    if (isRefreshing) {
      requestList.push(error.config!);
      return;
    }

    isRefreshing = true;
    try {
      const responseRefreshToken = await axiosInstance.post(
        "/v1/auth/refresh-token",
        {
          refreshToken: tokens?.refreshToken,
        }
      );

      if (
        !responseRefreshToken?.data?.accessToken ||
        !responseRefreshToken?.data?.refreshToken
      ) {
        localStorage.removeItem("tokens");
        window.location.href = "/login";
      } else {
        HttpRequest.setTokens = {
          key: "tokens",
          data: responseRefreshToken.data,
        };
        originalRequest.headers.Authorization = `Bearer ${responseRefreshToken.data.accessToken}`;

        return new Promise((resolve) => {
          isRefreshing = false;
          resolve(axios(originalRequest));
          processQueue(requestList);
        });
      }
    } catch (error) {
      console.log("Error refreshing token:", error);
      localStorage.removeItem("tokens");
      window.location.href = "/login";
      return;
    }
  }

  throw error;
}

export function interceptorRequest(config: InternalAxiosRequestConfig) {
  const tokens = HttpRequest.getTokens;
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
}
