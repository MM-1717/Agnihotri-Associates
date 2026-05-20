"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminPage() {
  const [form, setForm] = useState({
    address: "",
    phone: "",
    email: "",
    office_hours: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // 🔍 Validation
    if (!form.email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }

    if (form.phone.length < 10) {
      toast.error("Enter a valid phone number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/footer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 sends JWT cookie automatically
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Footer updated successfully");
      } else {
        toast.error(data.msg || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-black mb-6">
        Admin Footer Panel
      </h1>

      {/* ADDRESS */}
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full text-black mb-3 p-2 border rounded"
      />

      {/* PHONE */}
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full text-black mb-3 p-2 border rounded"
      />

      {/* EMAIL */}
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full text-black mb-3 p-2 border rounded"
      />

      {/* OFFICE HOURS */}
      <input
        name="office_hours"
        value={form.office_hours}
        onChange={handleChange}
        placeholder="Office Hours"
        className="w-full text-black mb-3 p-2 border rounded"
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full px-4 py-2 rounded text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Saving..." : "Update Footer"}
      </button>
    </div>
  );
}