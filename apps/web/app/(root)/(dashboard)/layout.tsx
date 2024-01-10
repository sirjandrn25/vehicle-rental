"use client";
import { DashboardNavbar } from "@components/layout/dashboard.navbar";
import RestrictedPage from "@components/layout/restricted.page.component";
import { useAuthContext } from "@context/auth.provider";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProtected>
      <div className="min-h-screen  ">
        <DashboardNavbar />
        <main className="bg-muted">{children}</main>
      </div>
    </AuthProtected>
  );
};

const AuthProtected = ({ children }: { children: ReactNode }) => {
  const { isLoading, isLoggedIn } = useAuthContext();
  if (!isLoggedIn)
    return (
      <RestrictedPage message="Please login first your own credentials..." />
    );
  return <>{children}</>;
};

export default DashboardLayout;
