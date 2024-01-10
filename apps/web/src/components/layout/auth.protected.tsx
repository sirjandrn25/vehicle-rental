"use client";
import { useAuthContext } from "@context/auth.provider";
import { ReactNode } from "react";
import PageLoader from "./page.loader";
import RestrictedPage from "./restricted.page.component";

const AuthProtected = ({ children }: { children: ReactNode }) => {
  const { isLoading, isLoggedIn } = useAuthContext();
  if (isLoading) return <PageLoader />;
  if (!isLoggedIn)
    return (
      <RestrictedPage message="Please login first your own credentials..." />
    );
  return <>{children}</>;
};

export default AuthProtected;
