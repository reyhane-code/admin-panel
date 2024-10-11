import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import {
  interceptorRequest,
  interceptorResponse,
  interceptorResponseError,
} from "./axios-interceptor.helper";

interface setTokensType {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  key: string;
}

interface getTokensType {
  accessToken: string;
  refreshToken: string;
}

export class HttpRequest<T> {
  private static instance: AxiosInstance;

  private static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: "http://127.0.0.1:30003/api",
        timeout: 3000,
      });

      this.instance.interceptors.request.use(interceptorRequest);
      this.instance.interceptors.response.use(
        interceptorResponse,
        interceptorResponseError
      );
    }
    return this.instance;
  }

  public static set setTokens(items: setTokensType) {
    const { accessToken, refreshToken } = items.data;
    localStorage.setItem(
      items.key,
      JSON.stringify({ accessToken, refreshToken })
    );
  }

  public static deleteTokens() {
    localStorage.removeItem('tokens')
  }

  public static get getTokens(): getTokensType | undefined {
    const tokens = localStorage.getItem("tokens");
    return tokens ? JSON.parse(tokens) : undefined;
  }

  public static async get<R>(
    url: string,
    axiosConfig?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<R>> {
    return this.getInstance().get<R>(url, axiosConfig);
  }

  public static async post(
    url: string,
    data: Record<string, unknown>,
    axiosConfig?: AxiosRequestConfig | undefined
  ) {
    return this.getInstance().post(url, data, axiosConfig);
  }

  public static async put(
    url: string,
    data: Record<string, unknown>,
    axiosConfig?: AxiosRequestConfig | undefined
  ) {
    return this.getInstance().put(url, data, axiosConfig);
  }

  public static async delete(
    url: string,
    axiosConfig?: AxiosRequestConfig | undefined
  ) {
    return this.getInstance().delete(url, axiosConfig);
  }
}
