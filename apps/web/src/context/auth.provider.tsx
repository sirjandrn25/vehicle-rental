import { useQuery } from "@tanstack/react-query";
import { ApiService, DictionaryType, UserType } from "core";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useLocalStorage } from "usehooks-ts";

type LoginInfoType = {
  email: string;
  password: string;
};
type AuthContextType = {
  user?: UserType;
  isLoggedIn: boolean;
  isLoading: boolean;
  handleLogin?: ({ email, password }: LoginInfoType) => void;
  handleLogout?: () => void;
};
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: false,
});
const authSession = "auth_session";
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useLocalStorage<any>(authSession, {});

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { success, response } = await ApiService.getRequest("auth", true);
      if (success) return response;
      return {};
    },
    enabled: !!session?.access_token,
  });

  // AuthStorageUtils.getRefreshToken()
  useQuery({
    queryKey: ["refreshToken"],
    queryFn: async () => {
      const { success, response } = await ApiService.postRequest(
        "auth/refresh",
        {
          data: {
            token: session?.refresh_token,
          },
        }
      );
      if (success) handleLogin(response);
    },
    refetchInterval: 3 * 1000,
    enabled: !!session?.refresh_token,
  });
  const handleLogin = useCallback(
    async (
      data: LoginInfoType,
      callback?: (response?: DictionaryType) => void
    ) => {
      const { success, response } = await ApiService.postRequest("auth/login", {
        data,
      });
      if (success) return setSession(response);
      callback?.(response);
    },
    []
  );

  const handleLogout = useCallback(() => {
    setSession(null);
  }, []);

  const value = useMemo(() => {
    return {
      handleLogin,
      handleLogout,
      user,
      isLoggedIn: !!session?.access_token,
      isLoading,
    };
  }, [handleLogin, handleLogout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
