"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiService, UserSessionType, UserType, authSession } from "core";
import { useRouter } from "next/navigation";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

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
  const [accessToken, setAccessToken] = useState(session?.access_token);
  const [refreshToken, setRefreshToken] = useState(session?.refresh_token);
  const router = useRouter();

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
      else router.push("/auth/login");
    },
    refetchInterval: 3 * 1000 * 60,
    enabled: !!refreshToken,
  });
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { success, response } = await ApiService.getRequest("auth", true);
      if (success) return response;
      return {};
    },
    enabled: !!accessToken,
  });

  // AuthStorageUtils.getRefreshToken()

  const handleLogin = useCallback((data: UserSessionType) => {
    setSession(data);
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);
  }, []);

  const handleLogout = useCallback(() => {
    setSession(null);
    setAccessToken(null);
    setRefreshToken(null);
  }, []);

  const value = useMemo(() => {
    return {
      handleLogin,
      handleLogout,
      user,
      isLoggedIn: !!accessToken,
      isLoading,
    };
  }, [handleLogin, user, isLoading, accessToken, handleLogout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
