"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { AuthProvider } from "../../../src/context/auth.provider";

export function ClientProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
