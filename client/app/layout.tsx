import "./globals.css";
import { Inter } from "next/font/google";
import JotaiProviders from "@/components/Providers";
import RootLayoutContainer from "@/components/RootLayoutContainer";

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
        <JotaiProviders>
          <RootLayoutContainer>{children}</RootLayoutContainer>
        </JotaiProviders>
      </body>
    </html>
  );
}
