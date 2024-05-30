import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Drawer from "@/components/drawer";
import { LoaderContainer } from "react18-loaders/dist/client/loader-container";
import { Bars2 } from "react18-loaders/dist/server/bars/bars2";
import "react18-loaders/dist/client/index.css";
import "react18-loaders/dist/server/bars/bars2/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Generative AI Demo",
  description: "A simple Generative AI Demo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Drawer />
        <main>{children}</main>
        <LoaderContainer>
          <Bars2 color="red" />
        </LoaderContainer>
      </body>
    </html>
  );
}
