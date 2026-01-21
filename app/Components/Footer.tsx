"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#062645] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* FOOTER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-16 lg:gap-x-28">
          {/* ABOUT */}
          <div className="max-w-md">
            {/* Logo + Name */}
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.png" // change path if needed
                alt="Agnihotri & Associates"
                width={55}
                height={75}
                className="object-contain"
              />

              <div className="leading-tight">
                <h1 className="text-2xl font-bold text-white">Agnihotri</h1>
                <p className="text-xl font-bold text-white">& Associates</p>
              </div>
            </div>

            <p className="mt-6 text-md leading-relaxed text-gray-300">
              Agnihotri & Associates is a peer-reviewed Chartered Accountancy
              firm providing audit, taxation, compliance, and advisory services
              to individuals, SMEs, and growing businesses across India.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:mt-1 flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                <Link href="/team">Team</Link>
              </li>
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                <Link href="/services">Services</Link>
              </li>
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                <Link href="/clientele">Clientele</Link>
              </li>
              <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>

            <ul className="space-y-4 text-gray-300 text-sm">
              {/* Address */}
              <li className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                <p>
                  46/2254, Ground Floor, Suprabhat CHS, Next to MHADA Office,
                  Gandhi Nagar, Bandra (East), Mumbai – 400 051
                </p>
              </li>

              {/* Phone */}
              <li className="group flex items-center gap-4">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0 transition-colors group-hover:text-yellow-300" />
                <p className="transition-colors group-hover:text-yellow-300">
                  98705 47500 / 70453 37500
                </p>
              </li>

              {/* Email */}
              <li className="group flex items-center gap-4">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0 transition-colors group-hover:text-yellow-300" />
                <a
                  href="mailto:agnihotriandassociates@gmail.com"
                  className="transition-colors group-hover:text-yellow-300"
                >
                  agnihotriandassociates@gmail.com
                </a>
              </li>

              {/* Office Hours */}
              <li className="flex items-center gap-4">
                <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Mon – Fri: 9:30 am – 06:30 pm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 text-center text-sm text-gray-400 py-4">
        © {new Date().getFullYear()} Agnihotri & Associates. All rights
        reserved.
      </div>
    </footer>
  );
}
