"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast"; // ✅ ADD THIS
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import WhatsAppFloat from "./Components/WhatsAppFloat";
import ScrollToTop from "./Components/ScrollToTop";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <WhatsAppFloat />}
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTop />}

      <Toaster position="top-right" />
    </>
  );
}