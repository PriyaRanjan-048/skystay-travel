"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PromoBar } from "@/components/layout/PromoBar";
import FloatingCallButton from "@/components/layout/FloatingCallButton";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>SkyStay Travel — Book Flights & Hotels | Call 1-800-123-4567</title>
        <meta name="description" content="Book cheap flights, hotels, and vacation packages. Call our travel experts at 1-800-123-4567 for exclusive deals not available online. 24/7 bilingual support." />
        <meta name="theme-color" content="#0369a1" />
        <meta name="keywords" content="cheap flights, book flights, travel agency, flight deals, hotel booking, vacation packages" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <PromoBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  );
}
