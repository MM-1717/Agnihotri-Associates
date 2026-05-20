"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ✅ Reveal Animation Component (UNCHANGED) */
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
  // 🔥 NEW: dynamic services state
  const [services, setServices] = useState<any[]>([]);

  // 🔥 NEW: fetch from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services", {
          cache: "no-store", // 🔥 IMPORTANT (no caching)
        });

        const data = await res.json();

        setServices(data || []);
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };

    fetchServices();
  }, []);

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
            <div key={service.id || index} className="space-y-12 sm:space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">
                <div className={isReversed ? "lg:order-2" : ""}>
                  <Reveal from={isReversed ? "right" : "left"} delay={100}>
                    <div className="relative w-full h-64 sm:h-80 rounded-xl shadow-lg overflow-hidden">
                      <Image
                        src={service.image || "/services/default.jpg"}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                </div>

                <Reveal from={isReversed ? "left" : "right"} delay={200}>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A1A3B] mb-5 sm:mb-6">
                      {service.title}
                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-gray-900 text-base sm:text-lg break-words">
                      {service.points?.map((point: string, i: number) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

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