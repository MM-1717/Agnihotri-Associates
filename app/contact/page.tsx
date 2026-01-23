"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Phone, Mail, Video, CheckCircle2, XCircle, X } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Toast State
  const [toast, setToast] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({
    show: false,
    type: "success",
    message: "",
  });

  // ✅ Auto hide toast after 4 seconds
  useEffect(() => {
    if (!toast.show) return;

    const t = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);

    return () => clearTimeout(t);
  }, [toast.show]);

  const services = [
    "Accounting & Outsourcing",
    "Audits",
    "Direct Tax – Income Tax",
    "Goods & Services Tax (GST)",
    "Company Law Matters",
    "Societies and Trust",
    "Financial Services",
    "International Taxation",
    "Other Matters",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        setToast({
          show: true,
          type: "error",
          message: data?.message || "Failed to send message. Please try again.",
        });
        return;
      }

      // ✅ Success Toast
      setToast({
        show: true,
        type: "success",
        message: "Thanks! Your message has been submitted successfully.",
      });

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact Form Error:", error);

      setToast({
        show: true,
        type: "error",
        message: "Server error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white relative">
      {/* ✅ TOP POPUP MESSAGE (TOAST) */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-500 ${
          toast.show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        }`}
      >
        {toast.show && (
          <div
            className={`flex items-start gap-3 rounded-xl px-5 py-4 shadow-xl border w-[92vw] max-w-xl ${
              toast.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {/* Icon */}
            <div className="mt-0.5">
              {toast.type === "success" ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="font-semibold text-base">
                {toast.type === "success" ? "Success" : "Error"}
              </p>
              <p className="text-sm mt-1">{toast.message}</p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setToast((prev) => ({ ...prev, show: false }))}
              className="opacity-70 hover:opacity-100 transition"
              aria-label="Close notification"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[420px] lg:min-h-[550px] pt-40 pb-24 text-white isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/contact/contact-hero.jpg"
            alt="Contact Us"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-20">
          <div className="max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/25 text-xs tracking-widest uppercase text-white bg-white/10 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
              Contact
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight anim-line anim-delay-1">
              Contact Us
            </h1>

            <p className="mt-4 text-white/90 text-lg leading-relaxed max-w-2xl anim-line anim-delay-1.3">
              Share your requirements and our team will get back to you shortly.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FORM + RIGHT BOX SECTION ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 text-xs tracking-widest uppercase text-gray-800 bg-black/5 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
              Get in Touch
            </div>

            <p className="text-4xl md:text-6xl font-extrabold mt-4 anim-line anim-delay-3 text-[#0A1A3B]">
              Send Your Query
            </p>

            <p className="mt-5 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              Fill out the form below and we will contact you as soon as
              possible.
            </p>
          </div>

          {/* ✅ Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* ================= LEFT: FORM ================= */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="text-sm font-semibold text-gray-800">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-[#16A34A]/40 focus:border-[#16A34A]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-gray-800">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-[#16A34A]/40 focus:border-[#16A34A]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-semibold text-gray-800">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-[#16A34A]/40 focus:border-[#16A34A]"
                  />
                </div>

                {/* Select Services */}
                <div>
                  <label className="text-sm font-semibold text-gray-800">
                    Select Services
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-[#16A34A]/40 focus:border-[#16A34A]"
                  >
                    <option value="">-- Select a service --</option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Case Description */}
                <div>
                  <label className="text-sm font-semibold text-gray-800">
                    Case Description
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your query / case details..."
                    rows={6}
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-[#16A34A]/40 focus:border-[#16A34A] resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-xl py-3 font-semibold transition-colors duration-300 ${
                    loading
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-[#0A1A3B] text-white hover:bg-[#16A34A]"
                  }`}
                >
                  {loading ? "Sending..." : "Submit Request →"}
                </button>
              </form>
            </div>

            {/* ================= RIGHT: GET IN TOUCH BOX ================= */}
            <div className="rounded-2xl border border-gray-200 shadow-md overflow-hidden bg[#f0e5d3] text-black">
              <div className="p-8 md:p-10">
                <h3 className="text-3xl font-extrabold">Get In Touch</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Need quick help? Reach out using any option below.
                </p>

                <div className="mt-10 space-y-10">
                  {/* Call */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                      <Phone className="w-6 h-6 text-[#16A34A]" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Call Us</p>
                      <p className="mt-1 text-gray-600">
                        +91 98705 47500 / 70453 37500
                      </p>
                      <p className="mt-2 text-md text-gray-600">
                        Mon – Fri : 9:30 AM – 06:30 PM
                      </p>
                      <p className="text-sm text-gray-600">
                        Available for immediate queries
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                      <Mail className="w-6 h-6 text-[#16A34A]" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Email Us</p>
                      <p className="mt-1 text-gray-600 break-all">
                        agnihotriandassociates@gmail.com
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        Response within 24 hours
                      </p>
                    </div>
                  </div>

                  {/* Video Consultation */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                      <Video className="w-6 h-6 text-[#16A34A]" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Video Consultation</p>
                      <p className="mt-1 text-gray-600">
                        Book a virtual meeting
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        Perfect for NRI clients
                      </p>
                      <p className="text-sm text-gray-600">
                        Schedule at your convenience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
            <div className="p-8 border-b border-gray-200 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1A3B]">
                Office Location
              </h2>
              <p className="mt-3 text-gray-600 text-lg">
                Find us on Google Maps and visit our office.
              </p>
            </div>

            <div className="w-full h-[450px]">
              <iframe
                title="Office Location Map"
                className="w-full h-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=19.05907466085209,72.84914262698292&z=16&output=embed`}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
