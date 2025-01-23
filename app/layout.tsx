import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { FavouritesProvider } from "@/context/favourites-context";
import { ToastProvider } from "@radix-ui/react-toast";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={cn(inter.className, "h-[100vh] bg-white")}>
        <FavouritesProvider>
          {children}
          <Toaster />
        </FavouritesProvider>
      </body>
    </html>
  );
}
