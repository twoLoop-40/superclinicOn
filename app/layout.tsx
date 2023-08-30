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
      <body className='min-h-screen bg-background'>
        <div className='flex flex-col relative min-h-screen'>{children}</div>
      </body>
    </html>
  );
}
