import axios from "axios";

import { AuthStorageUtils } from "./storage.utils";
import { DictionaryType } from "../types/common.types";

const getAccessToken = (type = "Bearer") => {
  const token = AuthStorageUtils.getAccessToken();
  return `${type} ${token}`;
};
const PRODUCTION_URL = "https://dv-mart-web.vercel.app";
const DEVELOPMENT_URL = "http://localhost:3000";
export const api_request_methods = ["get", "post", "put", "patch", "delete"];
const base_url =
  process.env.NODE_ENV !== "production" ? DEVELOPMENT_URL : PRODUCTION_URL;

const apiRequestHandle = async (
  end_point: string,
  method: (typeof api_request_methods)[number],
  options: {
    detail_id?: string;
    data?: DictionaryType;
    isLoggedIn?: boolean;
  }
) => {
  const { detail_id, data = {}, isLoggedIn = true } = options || {};
  let full_url = `${base_url}/api/${end_point}`;

  const params: DictionaryType = {};

  if (detail_id) {
    full_url = `${full_url}/${detail_id}`;
  }

  if (isLoggedIn) {
    params["headers"] = { Authorization: getAccessToken() };
  }
  if (!["get", "delete"].includes(method as any)) {
    params["data"] = data;
  }
  params["url"] = full_url;
  params["method"] = method;

  try {
    const response = await axios({ ...params });
    return {
      success: true,
      response: response.data,
    };
  } catch (error: any) {
    // if (error?.code == "ERR_NETWORK")
    //     Toast.error({
    //         message: "Network error",
    //     });
    return {
      success: false,
      response: error?.response?.data || error?.message,
    };
  }
};
type apiPostOptionsServiceType = {
  data?: DictionaryType;
  method?: "post" | "put" | "patch" | "delete";
  isLoggedIn?: boolean;
  methodParams?: string;
};
export default class ApiService {
  static async postRequest(
    end_point: string,
    options: apiPostOptionsServiceType
  ) {
    const { method = "post", data = {}, isLoggedIn, methodParams } = options;

    return await apiRequestHandle(end_point, method, {
      isLoggedIn,
      data,
      detail_id: methodParams,
    });
  }
  static async getRequest(end_point: string, isLoggedIn: boolean = false) {
    return await apiRequestHandle(end_point, "get", {
      isLoggedIn,
    });
  }
}
