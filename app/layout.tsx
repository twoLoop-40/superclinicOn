import { Providers } from "@providers";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Main Page",
  description: "Main page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
