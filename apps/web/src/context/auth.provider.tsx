import { useQuery } from "@tanstack/react-query";
import { ApiService, UserSessionType, UserType, authSession } from "core";
import { redirect } from "next/dist/server/api-utils";

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
  handleLogin?: (data: UserSessionType) => void;
  handleLogout?: () => void;
};
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useLocalStorage<any>(authSession, {});

  useQuery({
    queryKey: ["refreshToken"],
    queryFn: async () => {
      const { success, response } = await ApiService.postRequest(
        "auth/refresh-token",
        {
          data: {
            token: session?.refresh_token,
          },
        }
      );
      if (success) handleLogin(response);
    },
    refetchInterval: 3 * 1000 * 60,
    enabled: !!session?.refresh_token,
  });
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

  const handleLogin = useCallback((data: UserSessionType) => {
    setSession(data);
  }, []);

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
