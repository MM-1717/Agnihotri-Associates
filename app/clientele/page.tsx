"use client";

import Image from "next/image";

const clienteleIndustries = [
  {
    title: "Airways",
    image: "/clientele/airways.jpg",
    desc: "Aviation and airline service businesses.",
  },
  {
    title: "Film Production",
    image: "/clientele/film-production.jpg",
    desc: "Production houses and media studios.",
  },
  {
    title: "Film Actors",
    image: "/clientele/films-actors.jpg",
    desc: "Professional artists and talent clients.",
  },
  {
    title: "Steel Market",
    image: "/clientele/steel-market.jpg",
    desc: "Steel trading and distribution firms.",
  },
  {
    title: "Office Furniture",
    image: "/clientele/office-furniture.jpg",
    desc: "Workplace furniture suppliers and dealers.",
  },
  {
    title: "E-Commerce",
    image: "/clientele/e-commerce.jpg",
    desc: "Online sellers and digital businesses.",
  },
  {
    title: "Liquor & Wine",
    image: "/clientele/liquor-wine.jpg",
    desc: "Wine, liquor and beverage businesses.",
  },
  {
    title: "Hotel & Restaurant",
    image: "/clientele/hotel-and-restaurant.jpg",
    desc: "Hospitality and food service clients.",
  },
  {
    title: "Catering",
    image: "/clientele/catering.jpg",
    desc: "Catering services and event operations.",
  },
  {
    title: "Dairy Products",
    image: "/clientele/dairy-products.jpg",
    desc: "Milk and dairy product manufacturers.",
  },
  {
    title: "Air-Conditioners",
    image: "/clientele/air-conditioners.jpg",
    desc: "HVAC dealers and service providers.",
  },
  {
    title: "Textile & Fabrics",
    image: "/clientele/textile-and-fabrics.jpg",
    desc: "Textile traders and fabric businesses.",
  },
  {
    title: "Pharmaceuticals",
    image: "/clientele/pharmaceuticals.jpg",
    desc: "Pharma trading and manufacturing units.",
  },
  {
    title: "Logistics & Transport",
    image: "/clientele/logistics-transport.jpg",
    desc: "Transporters and logistics companies.",
  },
  {
    title: "Rent-a-Car",
    image: "/clientele/rent-a-car.jpg",
    desc: "Car rental and fleet operations.",
  },
  {
    title: "Leather Bags",
    image: "/clientele/leather-bags.jpg",
    desc: "Leather goods and accessories brands.",
  },
  {
    title: "Computers",
    image: "/clientele/computers.jpg",
    desc: "IT trading and computer businesses.",
  },
  {
    title: "Civil Contractors",
    image: "/clientele/civil-contractors.jpg",
    desc: "Construction and civil contractors.",
  },
  {
    title: "Dies & Moulds",
    image: "/clientele/dies-moulds.jpg",
    desc: "Tooling and manufacturing support firms.",
  },
  {
    title: "Plating Works",
    image: "/clientele/plating-works.jpg",
    desc: "Industrial plating and processing units.",
  },
  {
    title: "Co-op. Societies",
    image: "/clientele/co-op-societies.jpg",
    desc: "Housing and co-operative societies.",
  },
];

export default function ClientelePage() {
  return (
    <section className="bg-white">
      {/* ========== HERO ========== */}
      <section className="relative w-full min-h-[420px] lg:min-h-[550px] pt-40 pb-28 text-white isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/clientele/clientele-hero.jpg"
            alt="Our Clientele"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-20">
          <div className="max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-500 text-xs tracking-widest uppercase text-white-800 bg-black/5 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
            Clientele
          </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight anim-line anim-delay-1">
              Our Clientele
            </h1>

            <p className="mt-4 text-white/90 text-lg leading-relaxed max-w-2xl anim-line anim-delay-1.3">
              Serving clients across diverse industries with reliable support
              and long-term trust.
            </p>
          </div>
        </div>
      </section>

      {/* ========== CONTENT ========== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 text-xs tracking-widest uppercase text-gray-800 bg-black/5 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
              Industries We serve 
            </div>

            <p className="text-4xl md:text-6xl font-extrabold mt-4 anim-line anim-delay-3 text-[#0A1A3B]">
              Serving a Wide Range of Industries
            </p>

            <p className="mt-6 max-w-4xl mx-auto text-gray-600 text-lg leading-relaxed">
              Agnihotri & Associates handles a variety of clients from multiple
              industries and sectors. We cater to large groups as well as small
              and medium clients. Our clientele includes MNCs, Companies, LLPs,
              Partnership Firms, Societies, HNIs, and Non-Residents.
            </p>
          </div>

          {/* ✅ 3×3 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {clienteleIndustries.map((item, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* ✅ Image area bigger & fitted */}
                <div className="relative w-full h-85 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-7 text-center">
                  <h3 className="text-base md:text-lg font-bold text-[#0A1A3B]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing */}
          <p className="mt-16 text-center text-gray-700 text-lg">
            We value every client relationship and remain committed to accuracy,
            confidentiality, and timely delivery.
          </p>
        </div>
      </section>
    </section>
  );
}
