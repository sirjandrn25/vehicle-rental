import { ReactNode } from "react";
import { NavBar } from "../../../src/components/layout/NavBar";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full">
      <NavBar />
      <main className="min-h-screen pt-40">{children}</main>
    </div>
  );
};

export default HomeLayout;
