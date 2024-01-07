"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import ApiClientProvider from "../../../src/context/api.client.provider";
import { AuthProvider } from "../../../src/context/auth.provider";

export function ClientProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class">
      <ApiClientProvider>
        <AuthProvider>{children}</AuthProvider>
      </ApiClientProvider>
    </ThemeProvider>
  );
}
