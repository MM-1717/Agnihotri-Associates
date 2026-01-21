"use client";

import { ShieldCheck, Users, Briefcase, Clock, Globe } from "lucide-react";

const values = [
  {
    title: "Experienced & Qualified Professionals",
    desc: "Our firm is led by experienced professionals with strong expertise in taxation, audit, accounting, and compliance.",
    icon: ShieldCheck,
  },
  {
    title: "Client-Centric & Ethical Approach",
    desc: "We believe in transparent communication, ethical practices, and complete confidentiality in every engagement.",
    icon: Users,
  },
  {
    title: "End-to-End Services",
    desc: "From accounting and audits to taxation, GST, and advisory services — we provide complete solutions under one roof.",
    icon: Briefcase,
  },
  {
    title: "Accuracy & Timely Delivery",
    desc: "We focus on statutory accuracy, compliance, and timely execution to help clients avoid penalties and stress.",
    icon: Clock,
  },
  {
    title: "Domestic & Global Exposure",
    desc: "We handle Indian as well as cross-border and non-resident taxation and compliance matters with confidence.",
    icon: Globe,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 text-xs tracking-widest uppercase text-gray-800 bg-black/5 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
            Why Choose Us
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-[#0A1A3B] leading-tight">
            Trusted Chartered Accountants You Can Rely On
          </h2>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            We focus on accuracy, ethics, and long-term client relationships
            while delivering reliable financial and compliance solutions.
          </p>
        </div>

        {/* Values Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {values.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="text-center group">
                {/* Icon Circle */}
                <div
                  className="
                    mx-auto w-14 h-14 rounded-full bg-[#16A34A]/10
                    flex items-center justify-center
                    transition-all duration-300 ease-in-out
                    group-hover:scale-110 group-hover:bg-[#16A34A]/15
                  "
                >
                  <Icon
                    className="
                      w-7 h-7 text-[#16A34A]
                      transition-all duration-300 ease-in-out
                      group-hover:rotate-6 group-hover:scale-110
                    "
                  />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-bold text-[#0A1A3B]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
