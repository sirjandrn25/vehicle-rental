import { DictionaryType } from "../types/common.types";

export default class LocalStorageUtils {
  static setLocalState(key: string, data: DictionaryType) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getLocalState(key: string) {
    const data: any = localStorage.getItem(key);
    return JSON.parse(data);
  }

  static removeLocalState(key: string) {
    localStorage.removeItem(key);
  }

  static clearAllLocalStorage() {
    localStorage.clear();
  }
}

export const auth_local_state_key = "auth_local_state";
export type UserType = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  email_verified: boolean;
};
export type UserSessionType = {
  user: UserType;
  access_token: string;
  refresh_token: string;
};
export class AuthStorageUtils {
  static getAccessToken() {
    const data = LocalStorageUtils.getLocalState(auth_local_state_key);
    return data?.access_token;
  }
  static getRefreshToken() {
    const data = LocalStorageUtils.getLocalState(auth_local_state_key);
    return data?.refresh_token;
  }
  static getUser() {
    const data = LocalStorageUtils.getLocalState(auth_local_state_key);
    return data?.user;
  }

  static logout() {
    localStorage.removeItem(auth_local_state_key);
  }

  static setInfo(data: DictionaryType) {
    LocalStorageUtils.setLocalState(auth_local_state_key, data);
  }
}
