import "./globals.css";
import { Inter } from "next/font/google";
import JotaiProviders from "@/components/Providers";
import { MantineProvider, ColorSchemeScript, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My CMS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <MantineProvider>
          <JotaiProviders>
            <Notifications />
            {children}
          </JotaiProviders>
        </MantineProvider>
      </body>
    </html>
  );
}
