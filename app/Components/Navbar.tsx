"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (open) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, open]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Team", path: "/team" },
    { name: "Services", path: "/services" },
    { name: "Clientele", path: "/clientele" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="bg-white text-gray-700 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
          {/* Logo (Left) */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/favicon.png"
              alt="Agnihotri & Associates Logo"
              width={45}
              height={45}
              priority
              className="object-contain"
            />

            {/* Responsive Logo Text */}
            <div className="leading-tight">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#062645]">
                Agnihotri
              </h1>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-[#062645]">
                & Associates
              </p>
            </div>
          </Link>

          {/* Desktop Links (Center) - ONLY on lg+ */}
          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-6 font-semibold text-base">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`nav-link ${
                      pathname === item.path ? "active-link" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right CTA Button (Desktop) - ONLY on lg+ */}
          <div className="hidden lg:flex shrink-0">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-[#0B5D4C] text-white font-semibold hover:opacity-90 transition whitespace-nowrap"
            >
              Book Consultation
            </Link>
          </div>

          {/* Hamburger (Mobile + Tablet) */}
          <button
            className="lg:hidden ml-auto"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="w-7 h-7 text-[#062645]" />
            ) : (
              <Menu className="w-7 h-7 text-[#062645]" />
            )}
          </button>
        </div>

        {/* Mobile / Tablet Menu */}
        {open && (
          <div className="lg:hidden bg-white border-t px-6 py-6">
            <ul className="flex flex-col gap-4 text-lg font-semibold text-gray-900">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`block w-full px-5 py-3 rounded-xl transition ${
                      pathname === item.path
                        ? "bg-green-100 text-green-700"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="mt-6 block w-full text-center px-6 py-3 rounded-xl bg-[#0B5D4C] text-white font-semibold hover:opacity-90 transition"
              onClick={() => setOpen(false)}
            >
              Book Consultation
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
