import { DashboardNavbar } from "@components/layout/dashboard.navbar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen  ">
      <DashboardNavbar />
      <main className="bg-muted">{children}</main>
    </div>
  );
};

export default DashboardLayout;
