import axios from "axios";

import { AuthStorageUtils } from "./storage.utils";

export const getAccessToken = (type = "Bearer") => {
  const token = AuthStorageUtils.getAccessToken();
  return `${type} ${token}`;
};

export const getAuthorizationHeader = () => {
  return { Authorization: getAccessToken() };
};
const PRODUCTION_URL = "https://dv-mart-web.vercel.app";
const DEVELOPMENT_URL = "http://localhost:8000";
export const api_request_methods = ["get", "post", "put", "patch", "delete"];
export const serverBaseUrl =
  process.env.NODE_ENV !== "production" ? DEVELOPMENT_URL : PRODUCTION_URL;

export interface APIResponse<T> {
  errorMessage?: string;
  responseCode?: string;
  data?: T;
}

export class ApiService<TData> {
  private endPoint: string;
  private headers: any = {
    "Content-Type": "application/json",
  };

  constructor(entitySlug: string, config?: { isLoggedIn?: boolean }) {
    this.endPoint = `${serverBaseUrl}/${entitySlug}`;
    this.headers.Authorization = config?.isLoggedIn
      ? getAccessToken()
      : undefined;
  }

  async getOne(id: string): Promise<APIResponse<TData>> {
    return await axios.get(`${this.endPoint}/${id}`, this.headers);
  }
  async getAll(): Promise<APIResponse<TData[]>> {
    return await axios.get(this.endPoint, this.headers);
  }
  async create(
    data: Omit<TData, "id" | "created_at" | "updated_at">
  ): Promise<APIResponse<TData>> {
    return await axios.post(this.endPoint, data, this.headers);
  }
  async update(
    data: Omit<TData, "id" | "created_at" | "updated_at">
  ): Promise<APIResponse<TData>> {
    return await axios.put(this.endPoint, data, this.headers);
  }
  async delete(id: string): Promise<void> {
    return await axios.delete(`${this.endPoint}/${id}`, this.headers);
  }
}
