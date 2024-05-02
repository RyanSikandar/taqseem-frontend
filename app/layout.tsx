import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taqseem",
  description: "A Donations Application for the people",
  openGraph: {
    type: "website",
    url: "",
    title: "Taqseem",
    description: "",
    siteName: "Taqseem",
    locale: "en_US.utf-8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-[100vh] bg-[#EEEEEE]")}>{children}</body>
    </html>
  );
}
