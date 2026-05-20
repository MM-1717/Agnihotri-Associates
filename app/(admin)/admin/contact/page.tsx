"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import toast from "react-hot-toast";

export default function AdminContact() {
  const [form, setForm] = useState<any>({
    id: "", // ✅ MUST HAVE
    phone: "",
    email: "",
    address: "",
    office_hours: "",
    map_url: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 Fetch contact data
  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .limit(1);

      console.log("FETCH DATA:", data);
      console.log("FETCH ERROR:", error);

      if (error) {
        toast.error(error.message);
        return;
      }

      if (!data || data.length === 0) {
        toast.error("No contact data found");
        return;
      }

      const row = data[0];

      // ✅ SET ID PROPERLY
      setForm({
        id: row.id,
        phone: row.phone || "",
        email: row.email || "",
        address: row.address || "",
        office_hours: row.office_hours || "",
        map_url: row.map_url || "",
      });
    } catch (err) {
      toast.error("Failed to load contact info");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 Handle input change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 FINAL UPDATE (CORRECT)
  const handleUpdate = async () => {
    if (!form.id) {
      toast.error("Missing ID");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("contact_info")
        .update({
          phone: form.phone,
          email: form.email,
          address: form.address,
          office_hours: form.office_hours,
          map_url: form.map_url,
        })
        .eq("id", form.id) // ✅ REQUIRED (fixes WHERE error)
        .select();

      console.log("UPDATE RESPONSE:", data);
      console.log("UPDATE ERROR:", error);

      if (error) {
        toast.error(error.message);
        return;
      }

      if (!data || data.length === 0) {
        toast.error("Update failed (row not matched)");
        return;
      }

      toast.success("Contact updated successfully");

      // 🔄 Refresh UI
      fetchData();

    } catch (err) {
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