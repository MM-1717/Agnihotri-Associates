import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { Poppins, Montserrat } from "next/font/google";
import LayoutWrapper from "./LayoutWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Agnihotri & Associates - Chartered Accountants",
  description: "Chartered Accountants Firm Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}