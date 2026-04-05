"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function Krilekha() {
  return (
    <section className="w-full py-24 px-6 md:px-16 bg-white relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-100 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
        {/* LEFT */}
        <div>
          {/* Pill */}
          <div className="inline-flex items-center gap-1 px-5 py-2 rounded-full border border-gray-300 text-xs tracking-widest uppercase text-gray-800 bg-black/5 backdrop-blur mb-4">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
            Krilekha • AI Powered
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Krilekha - File Your ITR in Minutes, Not Hours
          </h2>

          <p className="mt-5 text-gray-600 text-lg">
            Krilekha is your AI-powered tax assistant built for speed, accuracy,
            and compliance. Automate your ITR filing and eliminate manual
            complexity.
          </p>

          {/* Features */}
          <div className="mt-6 space-y-4">
            {[
              "Accurate AI-based return preparation",
              "Latest tax rules built-in",
              "Save hours of manual effort",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 text-green-600" />
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-8">
            <div>
              <p className="text-2xl font-bold text-gray-900">90%</p>
              <p className="text-sm text-gray-500">Time Saved</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">99%</p>
              <p className="text-sm text-gray-500">Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p className="text-sm text-gray-500">Support</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex gap-4">
            <Link href="/krilekha">
              <button className="bg-green-600 text-white px-7 py-3 rounded-xl font-medium hover:bg-green-700 transition shadow-lg">
                Start Filing Now
              </button>
            </Link>

            <button className="px-7 py-3 rounded-xl font-medium border border-gray-300 hover:bg-gray-100 transition text-black">
              View Demo
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="h-20 bg-green-50 rounded-xl"></div>
                <div className="h-20 bg-green-50 rounded-xl"></div>
                <div className="h-20 bg-green-50 rounded-xl"></div>
              </div>

              <div className="h-28 bg-gray-100 rounded-xl mt-4"></div>
            </div>
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 bg-white shadow-xl border rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-800">ITR Filed</p>
            <p className="text-green-600 font-bold text-lg">₹2.4L Saved</p>
          </div>
        </div>
      </div>
    </section>
  );
}
