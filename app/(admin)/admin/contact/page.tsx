"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ContactForm = {
  id: string;
  phone: string;
  email: string;
  address: string;
  office_hours: string;
  map_url: string;
};

export default function AdminContact() {
  const [form, setForm] = useState<ContactForm>({
    id: "",
    phone: "",
    email: "",
    address: "",
    office_hours: "",
    map_url: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchData = async (): Promise<void> => {
    try {
      const res = await fetch("/api/admin/contact", {
        credentials: "include",
      });
      const data = (await res.json()) as Partial<ContactForm> & {
        msg?: string;
      };

      if (!res.ok) {
        toast.error(data.msg || "Failed to load contact info");
        return;
      }

      setForm({
        id: data.id || "",
        phone: data.phone || "",
        email: data.email || "",
        address: data.address || "",
        office_hours: data.office_hours || "",
        map_url: data.map_url || "",
      });
    } catch {
      toast.error("Failed to load contact info");
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          phone: form.phone,
          email: form.email,
          address: form.address,
          office_hours: form.office_hours,
          map_url: form.map_url,
        }),
      });
      const data = (await res.json()) as { msg?: string };

      if (!res.ok) {
        toast.error(data.msg || "Update failed");
        return;
      }

      toast.success("Contact updated successfully");
      void fetchData();
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-xl font-bold">Manage Contact Info</h1>

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="border p-2 w-full rounded"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 w-full rounded"
      />

      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className="border p-2 w-full rounded"
      />

      <input
        name="office_hours"
        value={form.office_hours}
        onChange={handleChange}
        placeholder="Office Hours"
        className="border p-2 w-full rounded"
      />

      <input
        name="map_url"
        value={form.map_url}
        onChange={handleChange}
        placeholder="Google Map Embed URL"
        className="border p-2 w-full rounded"
      />

      <button
        onClick={handleUpdate}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
}
