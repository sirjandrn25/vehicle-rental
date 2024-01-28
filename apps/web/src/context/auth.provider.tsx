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
  const [localSession, setLocalSession] = useState(session);
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
      else handleLogout();
      return {};
    },
    refetchInterval: 3 * 1000 * 60,
    enabled: !!localSession?.refresh_token,
  });
  const { data: user, isPending: isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { success, response } = await ApiService.getRequest("auth", true);
      if (success) return response;
      return {};
    },
    enabled: !!localSession?.access_token,
  });

  // AuthStorageUtils.getRefreshToken()

  const handleLogin = useCallback((data: UserSessionType) => {
    setSession(data);
    setLocalSession(data);
  }, []);

  const handleLogout = useCallback(() => {
    setSession(null);
    setLocalSession(null);
    router.push("/auth/login");
  }, []);

  const value = useMemo(() => {
    return {
      handleLogin,
      handleLogout,
      user,
      isLoggedIn: !!localSession?.access_token,
      isLoading,
    };
  }, [handleLogin, user, localSession?.access_token, isLoading, handleLogout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
