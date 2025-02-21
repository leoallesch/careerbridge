import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";
import { Toaster } from "@/components/ui/toaster";
import UrlMessagePopup from "@/components/url-message-popup";

export const metadata: Metadata = {
  title: "CareerBridge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <UrlMessagePopup/>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
