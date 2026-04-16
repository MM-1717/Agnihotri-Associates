"use client";

import { CheckCircle } from "lucide-react";

export default function Krilekha() {
  return (
    <section className="w-full py-24 px-6 md:px-16 bg-white relative overflow-hidden">

      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-100 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">

        {/* LEFT */}
        <div className="space-y-6">

          {/* Pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 text-xs tracking-widest uppercase text-gray-800 bg-black/5 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-green-600" />
            Krilekha • AI Powered
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            File Your ITR in Minutes - Powered by Krilekha
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed">
            Krilekha is your AI-powered tax assistant built for speed, accuracy,
            and compliance. Automate your ITR filing and eliminate manual complexity.
          </p>

          {/* Features */}
          <div className="space-y-3">
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
          <div className="flex gap-10 pt-4">
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
          <div className="pt-6">
            <a
              href="https://krilekha.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-7 py-3 rounded-xl font-medium hover:bg-green-700 transition shadow-lg inline-block"
            >
              Start Filing on Krilekha ↗
            </a>
          </div>

        </div>

        {/* RIGHT */}
        <div className="relative">

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-800">ITR Summary</p>
              <span className="text-sm text-green-600 font-medium">Completed</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-xl text-center">
                <p className="text-xs text-gray-500">Income</p>
                <p className="font-bold text-gray-800">₹8.2L</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl text-center">
                <p className="text-xs text-gray-500">Tax</p>
                <p className="font-bold text-gray-800">₹45K</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl text-center">
                <p className="text-xs text-gray-500">Saved</p>
                <p className="font-bold text-green-600">₹12K</p>
              </div>
            </div>

            {/* Progress */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Filing Progress</p>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="w-[80%] h-2 bg-green-600 rounded-full"></div>
              </div>
            </div>

            {/* Button */}
            <button className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition">
              Download ITR
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}