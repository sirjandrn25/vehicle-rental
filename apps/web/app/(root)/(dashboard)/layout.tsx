"use client";
import { DashboardNavbar } from "@components/layout/dashboard.navbar";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const AuthProtected = dynamic(
  () => import("@components/layout/auth.protected")
);
const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProtected>
      <div className="min-h-screen bg-muted  ">
        <DashboardNavbar />
        <main className="flex-1 max-w-6xl py-8 container">{children}</main>
      </div>
    </AuthProtected>
  );
};

export default DashboardLayout;
