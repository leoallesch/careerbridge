import type {Metadata} from "next";
import "./globals.css";
import Navbar from "../components/layout/navbar";
import Footer from "@/components/layout/footer";
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata={
  title: "CareerBridge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
