'use client'

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyCMS",
  description: "Simple headless Content Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <body className={inter.className}>{children}</body>
      </MantineProvider>
    </html>
  );
}
