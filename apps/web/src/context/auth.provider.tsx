"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "core";
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
import { z } from "zod";

enum UserRole {
  USER,
  ADMIN,
}
export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  role: z.nativeEnum(UserRole),
  name: z.string().nullish(),
  avatar_url: z.string().nullish(),
  github_username: z.string().nullish(),
  password: z.string().nullish(),
});
export type UserModelType = z.infer<typeof UserModel>;
export const authSession = "auth_session";
export type UserSessionType = {
  user: UserModelType;
  access_token: string;
  refresh_token: string;
};
type AuthContextType = {
  user?: UserModelType;
  isLoggedIn: boolean;
  isLoading: boolean;
  handleLogin: (data: UserSessionType) => void;
  handleLogout?: () => void;
};
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: false,
  handleLogin: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useLocalStorage<any>(authSession, {});
  const [localSession, setLocalSession] = useState(session);
  const router = useRouter();

  useQuery({
    queryKey: ["refreshToken"],
    queryFn: async () => {
      const service = new ApiService("auth/refresh-token");
      const response = await service.create({
        token: session?.refresh_token,
      });

      if (!response?.errorMessage) handleLogin(response?.data as any);
      else handleLogout();
      return {};
    },
    refetchInterval: 3 * 1000 * 60,
    enabled: !!localSession?.refresh_token,
  });
  const { data: user, isPending: isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const service = new ApiService("auth");
        const response = await service.getOne();
        return response.data as any;
      } catch (error) {
        return {};
      }
    },
    enabled: !!localSession?.access_token,
  });

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
