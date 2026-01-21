"use client";

import Image from "next/image";
import { useState } from "react";

const teamMembers = [
  {
    name: "Ulhas Agnihotri",
    role: "Chartered Accountant",
    education:
      "Bachelor of Commerce from Mumbai University through R.A. Podar College of Commerce & Economics, Matunga.",
    image: "/team/ulhas.jpg",
    details:
      "CA Ulhas Agnihotri is a Fellow member of The Institute of Chartered Accountants of India since 1988. He is in continuous practice since then. He has a vast experience of over 30 years in handling all types of works such as Direct Tax, Indirect Tax, Audits, Company Law, Bank Finance, Planning & Advisory Services. His main area of specialization is Direct Taxes. He was also associated with L. K. Manjrekar & Co, Chartered Accountants, Mumbai for decades and presently heading their Dubai (UAE) branch. He also has special interest in development of software for office management for professionals.",
  },
  {
    name: "Jayashree Agnihotri",
    role: "Chartered Accountant",
    education:
      "Bachelor of Commerce from Pune University through BYK College of Commerce, Nashik.",
    image: "/team/jayashree.jpg",
    details:
      "CA Jayashree Agnihotri, Proprietress, is a Fellow member of The Institute of Chartered Accountants of India since 1993. She is in continuous practice since then. She has a vast experience of over 25 years in handling all types of works such as Direct Tax, Indirect Tax, Audits, Company Law, Bank Finance, Planning & Advisory Services. Her main area of specialization is Indirect Taxes.",
  },
  {
    name: "Tanvi Jadhav",
    role: "Chartered Accountant",
    education:
      "Bachelor of Commerce from Mumbai University through SIES College of Commerce & Economics, Sion.",
    image: "/team/tanvi.jpg",
    details:
      "CA Tanvi Jadhav is a Associate member of The Institute of Chartered Accountants of India since 2016. She has a good experience in handling all types of works such as Direct Tax, Indirect Tax, Audits, Company Law, Bank Finance, Planning & Advisory Services. Her main area of specialization is Direct Taxes.",
  },
  {
    name: "Ajinkya Agnihotri",
    role: "Chartered Accountant",
    education:
      "Bachelor of Commerce from Mumbai University through Mithibai College (Amrutben Jivanlal College of Commerce and Economics), Vile Parle.",
    image: "/team/ajinkya.jpeg",
    details:
      "CA Ajinkya Agnihotri is a Associate member of The Institute of Chartered Accountants of India since 2023. He has a good experience in handling all types of works such as Direct Tax, Indirect Tax, Audits, Company Law, Bank Finance, Planning & Advisory Services. His main area of specialization is Indirect Taxes.",
  },
];

function TeamCard({
  member,
}: {
  member: {
    name: string;
    role: string;
    education: string;
    image: string;
    details: string;
  };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-64">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-contain object-center"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-extrabold text-[#0A1A3B]">{member.name}</h3>

        <p className="mt-1 text-sm font-semibold text-[#16A34A]">
          {member.role}
        </p>

        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          {member.education}
        </p>

        {/* Smooth Dropdown Details (NO framer motion) */}
        <div
          className={`
            mt-4 overflow-hidden
            transition-all duration-800 ease-in-out
            ${open ? "max-h-[700px] opacity-100 translate-y-0" : "max-h-[95px] opacity-90 -translate-y-1"}
          `}
          style={{ transitionProperty: "max-height, opacity, transform" }}
        >
          <p
            className={`text-sm text-gray-700 leading-relaxed ${
              open ? "" : "line-clamp-4"
            }`}
          >
            {member.details}
          </p>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="mt-4 text-sm font-semibold text-[#0A1A3B] hover:text-[#16A34A] transition-colors"
        >
          {open ? "Show Less ↑" : "Read More →"}
        </button>
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <section className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-[420px] lg:min-h-[550px] pt-40 pb-28 text-white isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/team/team-hero.jpg"
            alt="Our Team"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-20">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-500 text-xs tracking-widest uppercase text-white-800 bg-black/5 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
              Team
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight anim-line anim-delay-1">
              Our Team
            </h1>

            <p className="mt-4 text-white/90 text-lg md:text-lg leading-relaxed max-w-xl anim-line anim-delay-1.3">
              Backed by experience and professionalism, our team ensures timely
              execution, clear communication, and consistent quality across all
              services.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TEAM GRID ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Center Pill */}
          <div className="bg-white text-center py-16 px-6">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 text-xs tracking-widest uppercase text-gray-800 bg-black/10 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
              Trusted Professionals
            </div>

            <p className="text-4xl md:text-6xl font-extrabold mt-4 anim-line anim-delay-3 text-[#0A1A3B]">
              Meet Our Experts
            </p>

            <p className="mt-6 max-w-4xl mx-auto text-gray-600 text-lg leading-relaxed">
              The technically qualified and highly experienced team of Chartered
              Accountants along with other team members are providing high
              quality professional service to the client satisfaction.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>

          {/* Closing Line */}
          <p className="mt-16 text-center text-gray-700 text-lg">
            Beside above, there are other young team members & other
            professionals also.
          </p>
        </div>
      </section>
    </section>
  );
}
