"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  const phoneNumber = "919870547500";

  const message =
    "Hi Agnihotri & Associates, I would like to enquire about your services.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[9999]"
    >
      {/* Shining / Ripple Effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping [animation-duration:1.5s]"></span>

      {/* Main Button */}
      <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition">
        <FaWhatsapp size={30} />
      </span>
    </Link>
  );
}
