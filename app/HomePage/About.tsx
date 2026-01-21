import Image from "next/image";

export default function AboutIntro() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6 ">
        {/* TOP CENTER LABEL */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 text-xs tracking-widest uppercase text-gray-800 bg-black/5 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
            About Us 
          </div>
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* LEFT — CONTENT */}
          <div className="lg:pr-8">
            <p className="text-2xl md:text-3xl font-extrabold text-black uppercase mb-3">
              30+ Years of Excellence
            </p>

            <p className="text-gray-700 leading-relaxed text-base md:text-md text-justify">
              Agnihotri & Associates, established in the year 1993, has evolved
              with over 30 years of experience in providing a comprehensive
              range of services in the fields of Accounting, Direct & Indirect
              Taxation, Auditing, Company Law, and allied matters. The firm is
              strategically located near Bandra-Kurla Complex, Bandra (East),
              Mumbai.
              <br />
              <br />
              Our aim is not only to cater to our client’s statutory compliances
              but also to assist them in growing their businesses. We believe in
              delivering all services under one roof, enabling clients to focus
              on their core business activities while enhancing efficiency and
              receiving expert advice whenever required.
              <br />
              <br />
              Our clientele includes MNCs, Companies, LLPs, Firms, HNIs,
              Non-Residents, and individuals across diverse business and
              professional domains.
            </p>
          </div>

          {/* RIGHT — IMAGE (Reduced Size) */}
          <div className="relative w-full h-[200px] md:h-[320px] lg:h-[420px] rounded-lg overflow-hidden shadow-lg bg-white">
            <Image
              src="/images/aboutUs.jpg"
              alt="Agnihotri & Associates – About Us"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
