"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/images/hero1.jpeg",
    title: "HIGHLY EXPERIENCED AND",
    title2: "PEER REVIEWED",
    title3: "CA FIRM",
    subtitle: "AGNIHOTRI & ASSOCIATES",
    button: "GET IN TOUCH",
  },
  {
    image: "/images/hero2.jpg",
    title: "TRUSTED FINANCIAL & TAX",
    title2: "ADVISORY SERVICES",
    title3: "FOR BUSINESSES",
    subtitle: "YOUR COMPLIANCE + GROWTH PARTNER",
    button: "CONTACT US",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(next, 8000);
    return () => clearInterval(t);
  }, [index]);

  /* TOUCH SWIPE SUPPORT (MOBILE) */
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) next(); // Swipe left = next slide
    if (distance < -minSwipeDistance) prev(); // Swipe right = previous slide

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div
      className="relative w-full min-h-[120vh] overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === i ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={i === 0}
            className="object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* TEXT CONTENT */}
          <div
            className="absolute inset-0 flex flex-col justify-center items-start 
             pt-10 md:pt-20
             pl-8 md:pl-32 pr-8 pb-20 md:pb-0 
             text-white z-20"
          >
            <p
              key={index + "-sub"}
              className="text-sm md:text-lg tracking-widest mb-3 anim-line"
            >
              {s.subtitle}
            </p>

            <h1
              key={index + "-t1"}
              className="text-3xl md:text-6xl font-extrabold anim-line anim-delay-1"
            >
              {s.title}
            </h1>

            <h1
              key={index + "-t2"}
              className="text-3xl md:text-6xl font-extrabold anim-line anim-delay-2"
            >
              {s.title2}
            </h1>

            <h1
              key={index + "-t3"}
              className="text-4xl md:text-7xl font-extrabold mt-4 anim-line anim-delay-3"
            >
              {s.title3}
            </h1>

            {/* CTA BUTTON */}
            <Link href = "/contact">
            <button
              key={index + "-btn"}
              className="cta-btn mt-6 md:mt-8 anim-line anim-delay-3"
            >
              <span>
                {s.button}
              </span>
            </button>
            </Link>
          </div>
        </div>
      ))}

      {/* LEFT ARROW (hidden on mobile) */}
      <button
        onClick={prev}
        className="
          hidden md:flex
          absolute 
          left-12 
          top-[60%] 
          -translate-y-1/2
          text-white text-4xl z-30 
          w-13 h-13 
          flex items-center justify-center
          rounded-full
          bg-black/40 
          hover:bg-green-600 hover:text-black 
          transition-all duration-300
        "
      >
        ‹
      </button>

      {/* RIGHT ARROW (hidden on mobile) */}
      <button
        onClick={next}
        className="
          hidden md:flex
          absolute 
          right-12 
          top-[60%] 
          -translate-y-1/2
          text-white text-4xl z-30 
          w-13 h-13 
          flex items-center justify-center
          rounded-full 
          bg-black/40 
          hover:bg-green-600 hover:text-black 
          transition-all duration-300
        "
      >
        ›
      </button>
    </div>
  );
}
