import "./globals.css";
import { Inter } from "next/font/google";
import AppShell from "@/components/AppShell";
import JotaiProviders from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>MyCMS</title>
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <JotaiProviders>{children}</JotaiProviders>
      </body>
    </html>
  );
}
