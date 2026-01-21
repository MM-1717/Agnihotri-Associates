"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  FileCheck,
  Calculator,
  Landmark,
  Scale,
  LineChart,
  Building2,
  Globe,
} from "lucide-react";

const services = [
  {
    title: "Accounting & Outsourcing",
    desc: "Accurate bookkeeping, MIS reporting, budgeting, and outsourcing solutions tailored for your business.",
    image: "/services/accounting.jpg",
    icon: Calculator,
  },
  {
    title: "Audits",
    desc: "Internal, statutory, tax, GST and specialized audit services with complete compliance support.",
    image: "/services/audit.jpg",
    icon: FileCheck,
  },
  {
    title: "Direct Tax – Income Tax",
    desc: "Income tax filing, assessments, advisory, TDS compliance, and representation before authorities.",
    image: "/services/direct-tax.jpg",
    icon: LineChart,
  },
  {
    title: "Goods & Services Tax (GST)",
    desc: "GST registration, returns, compliance, consulting, and handling assessments efficiently.",
    image: "/services/gst.jpg",
    icon: Landmark,
  },
  {
    title: "Company Law Matters",
    desc: "ROC compliances, incorporation, statutory records, DIN/DSC and corporate advisory services.",
    image: "/services/company-law.jpg",
    icon: Scale,
  },
  {
    title: "Societies and Trust",
    desc: "Trust formation, 12AA/80G registration, compliance, audit, and advisory support.",
    image: "/services/society.jpg",
    icon: Building2,
  },
  {
    title: "Financial Services",
    desc: "Project finance, valuation, restructuring, and end-to-end support for business funding needs.",
    image: "/services/financial.jpg",
    icon: Briefcase,
  },
  {
    title: "International Taxation",
    desc: "Non-resident taxation, DTAA advisory, FEMA compliance, repatriation, and certification work.",
    image: "/services/international.jpg",
    icon: Globe,
  },
  {
    title: "Other Matters",
    desc: "Formation of Partnership Firm, Profession Tax, Shops & Establishment, Trade Marks and complete Start-up setup support.",
    image: "/services/other.jpg",
    icon: FileCheck,
  },
];

export default function HomeServices() {
  return (
    <section className="relative py-20 overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/services/services-bg.jpg"
          alt="Services background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Light overlay so it looks premium and readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Top Text */}
        <div className="text-center mb-14">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/30 text-xs tracking-widest uppercase text-white bg-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
            Our Services
          </div>

          {/* Title */}
          <h2 className="mt-6 text-4xl md:text-6xl font-extrabold text-white">
            What We Offer
          </h2>

          {/* Subtitle */}
          <p className="mt-5 max-w-3xl mx-auto text-gray-100 text-lg leading-relaxed">
            Professional accounting, audit, taxation, and compliance services
            delivered with accuracy and trust.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group bg-white/95 backdrop-blur rounded-2xl overflow-hidden shadow-md border border-gray-200
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-500 ease-out"
                  />

                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#0f3d2e] flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>

                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#0f3d2e] hover:text-[#16A34A] transition-colors"
                  >
                    Learn More <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
