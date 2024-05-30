import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Drawer from "@/components/drawer";

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
      </body>
    </html>
  );
}
