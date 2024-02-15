import axios from "axios";

import { AuthStorageUtils } from "./storage.utils";

export const getAccessToken = (type = "Bearer") => {
  const token = AuthStorageUtils.getAccessToken();
  return `${type} ${token}`;
};

export const getAuthorizationHeader = () => {
  return { Authorization: getAccessToken() };
};
const PRODUCTION_URL = "https://dv-mart-web.vercel.app/api";
const DEVELOPMENT_URL = "http://localhost:8000/api";
export const api_request_methods = ["get", "post", "put", "patch", "delete"];
export const serverBaseUrl =
  process.env.NODE_ENV !== "production" ? DEVELOPMENT_URL : PRODUCTION_URL;

export interface APIResponse<T> {
  errorMessage?: string;
  responseCode?: string;
  data?: T;
}

export class ApiService<TData> {
  protected endPoint: string;
  private headers: any = {
    "content-type": "application/json",
  };

  constructor(entitySlug: string, config?: { isLoggedIn?: boolean }) {
    this.endPoint = `${serverBaseUrl}/${entitySlug}`;

    this.headers.Authorization =
      config?.isLoggedIn !== false ? getAccessToken() : undefined;
  }

  async getOne(): Promise<APIResponse<TData>> {
    return await axios({
      url: this.endPoint,
      headers: this.headers,
      method: "get",
    });
  }
  async getAll(): Promise<APIResponse<TData[]>> {
    return await axios({
      url: this.endPoint,
      headers: this.headers,
      method: "get",
    });
  }
  async post(
    data: Omit<TData, "id" | "created_at" | "updated_at">
  ): Promise<APIResponse<TData>> {
    return await axios({
      url: this.endPoint,
      headers: this.headers,
      data,
      method: "post",
    });
  }
  async put(
    data: Omit<TData, "id" | "created_at" | "updated_at">
  ): Promise<APIResponse<TData>> {
    return await axios({
      url: this.endPoint,
      headers: this.headers,
      data,
      method: "put",
    });
  }
  async delete(id: string): Promise<void> {
    return await axios({
      url: `${this.endPoint}/${id}`,
      method: "delete",
      headers: this.headers,
    });
  }
}
