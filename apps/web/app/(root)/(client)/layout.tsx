import { ReactNode } from "react";
import { NavBar } from "../../../src/components/layout/NavBar";

const ClientSideLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full relative h-full">
      <NavBar />
      <main className="min-h-screen ">{children}</main>
    </div>
  );
};

export default ClientSideLayout;
