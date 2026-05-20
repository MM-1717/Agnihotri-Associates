import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import LayoutWrapper from "./LayoutWrapper";

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
    <html lang="en">
      <body className="antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
