"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export function ClientProviders({ children }: PropsWithChildren) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
