import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
// import { ThirdwebProvider } from "@app/thirdweb";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DProject Login/Register",
  description:
    "Login using Phone Number and Buy NFT for KK DApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
