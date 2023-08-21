"use client";

import { SessionProvider } from "next-auth/react";

type providerProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: providerProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
