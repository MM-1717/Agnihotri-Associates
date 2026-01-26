"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Accounting & Outsourcing",
    image: "/services/accounting.jpg",
    points: [
      "Accounting Services",
      "Budget & Forecasting",
      "Management Information Reports (MIS)",
      "Creating Business Operating Systems & Streamlining Business Activities",
      "Planning & Advisory Services",
    ],
  },
  {
    title: "Audits",
    image: "/services/audit.jpg",
    points: [
      "Internal Audit",
      "Statutory Audit under Companies Act, 2013",
      "Tax Audit under Income Tax Act, 1961",
      "GST Audit under Goods & Services Act, 2017",
      "Transfer Pricing Audit-Domestic & International",
      "Bank Audit",
      "Co-operative Society Audits",
      "Trust Audit",
      "Planning & Advisory Services",
    ],
  },
  {
    title: "Direct Tax - Income Tax",
    image: "/services/direct-tax.jpg",
    points: [
      "Preparation & Filing of Return of Income",
      "All types of Compliances under Income Tax",
      "Assessment proceedings",
      "Consultancy in Tax matters",
      "Certification works",
      "Withholding tax compliance (TDS/TCS)",
      "Income tax Appeals before CIT (Appeals) and ITAT",
      "Search & Seizure cases",
      "Planning & Advisory Services",
    ],
  },
  {
    title: "Indirect Tax - Goods & Service Tax (GST)",
    image: "/services/gst.jpg",
    points: [
      "Registration under GST",
      "Preparation & Filing of various Returns under GST",
      "Various Compliances under GST",
      "Assessment Proceedings",
      "Consultancy Services",
      "Planning & Advisory Services",
    ],
  },
  {
    title: "Company Law Matters",
    image: "/services/company-law.jpg",
    points: [
      "Incorporation of Company & Limited Liability Partnership (LLP)",
      "All matters related with Registrar of Companies (ROC-MCA)",
      "All types of Compliances under Companies Act",
      "Filling & Maintenance of Statutory Records",
      "Consultancy in above matters",
      "Obtaining DIN & DSC",
      "Opening & Closure of Branch/Liaison Office of Foreign Company",
    ],
  },
  {
    title: "Societies and Trust",
    image: "/services/society.jpg",
    points: [
      "Formation of Trust",
      "Registration u/s 12AA and 80G",
      "Registration under Foreign Contribution Regulation Act (FCRA)",
      "All types of Compliances & Audit under Societies Act & Trust Act",
      "Planning & Advisory Services",
    ],
  },
  {
    title: "Financial Services",
    image: "/services/financial.jpg",
    points: [
      "Preparation of project reports",
      "Liaising with Bankers for arrangement of Project Finance",
      "Business Valuation",
      "Merger & Acquisition",
      "Corporate Restructuring",
      "Project Finance",
      "Planning & Advisory Services",
    ],
  },
  {
    title: "Services to Non-Residents & International Taxation",
    image: "/services/international.jpg",
    points: [
      "Preparation & Filing of Return of Income",
      "All types of Compliances under Income Tax",
      "All types of Compliances under FEMA & RBI",
      "Repatriation of Funds",
      "Certification works",
      "Advise on DTAA & Advance Ruling",
      "Withholding tax compliance (TDS/TCS)",
      "Consultancy in Foreign Taxation",
      "Planning & Advisory Services",
    ],
  },
  {
    title: "Other Matters",
    image: "/services/other.jpg",
    points: [
      "Formation of Partnership Firm",
      "Profession Tax",
      "Shops & Establishment",
      "Trade Marks",
      "Start-up Companies Complete set up",
    ],
  },
];

/* ✅ Reveal Animation Component */
function Reveal({
  children,
  from = "bottom",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from?: "left" | "right" | "bottom";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  let hiddenClass = "opacity-0 translate-y-10";
  if (from === "left") hiddenClass = "opacity-0 -translate-x-12";
  if (from === "right") hiddenClass = "opacity-0 translate-x-12";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transform transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-x-0 translate-y-0" : hiddenClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <section className="bg-white w-full overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section
        className="
          relative w-full
          min-h-[420px] lg:min-h-[550px]
          pt-40 pb-28
          text-white
          isolate overflow-hidden
        "
      >
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/services/services-header.jpg"
            alt="Our Services"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Text Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-500 text-xs tracking-widest uppercase text-white bg-black/5 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
            Services
          </div>

          <div className="max-w-2xl text-left">
            <h1 className="mt-6 text-4xl md:text-7xl font-bold leading-tight anim-line anim-delay-1">
              Our Services
            </h1>

            <p className="mt-4 text-white/90 text-lg md:text-xl leading-relaxed max-w-full anim-line anim-delay-1.3">
              Comprehensive professional services offered under one roof to meet
              diverse business and compliance requirements.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION INTRO ================= */}
      <div className="bg-white text-center py-16 px-4 sm:px-6 overflow-x-hidden">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 text-xs tracking-widest uppercase text-gray-800 bg-black/10 backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
          What we Offer
        </div>

        <p className="text-4xl md:text-6xl font-extrabold mt-4 anim-line anim-delay-3 text-[#0A1A3B]">
          Explore Our Services
        </p>

        <p className="mt-6 max-w-4xl mx-auto text-gray-600 text-lg leading-relaxed">
          Agnihotri & Associates is one of the leading and reputed firm in the
          field of accountancy, audit & taxation services. We offer a
          comprehensive range of services, which include following :
        </p>
      </div>

      {/* ================= SERVICES LIST ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-14 sm:space-y-20 overflow-x-hidden">
        {services.map((service, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div key={index} className="space-y-12 sm:space-y-16">
              {/* ✅ One Service Block */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">
                {/* Image */}
                <div className={isReversed ? "lg:order-2" : ""}>
                  <Reveal from={isReversed ? "right" : "left"} delay={100}>
                    <div className="relative w-full h-64 sm:h-80 rounded-xl shadow-lg overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                </div>

                {/* Content */}
                <Reveal from={isReversed ? "left" : "right"} delay={200}>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A1A3B] mb-5 sm:mb-6">
                      {service.title}
                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-gray-900 text-base sm:text-lg break-words">
                      {service.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              {/* ✅ Divider line (skip for last service) */}
              {index !== services.length - 1 && (
                <div className="relative w-full pt-8">
                  <div className="h-px w-full bg-gray-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
