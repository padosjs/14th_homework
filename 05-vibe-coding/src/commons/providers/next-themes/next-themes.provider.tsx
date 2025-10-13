"use client";

import { ThemeProvider } from "next-themes";

interface INextThemesProviderProps {
  children: React.ReactNode;
}

export default function NextThemesProvider({
  children,
}: INextThemesProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

