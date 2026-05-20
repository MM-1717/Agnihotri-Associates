"use client";

import { useEffect, useState } from "react";
import { uploadImage } from "../../../lib/uploadImage";
import toast from "react-hot-toast";

export default function ServicesCMS() {
  const [services, setServices] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    points: [""],
    image: "",
  });

  const [file, setFile] = useState<File | null>(null);

  // 🔹 Fetch services (public)
  const fetchData = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Handle points
  const handlePointChange = (i: number, val: string) => {
    const updated = [...form.points];
    updated[i] = val;
    setForm({ ...form, points: updated });
  };

  const addPoint = () => {
    setForm({ ...form, points: [...form.points, ""] });
  };

  const removePoint = (i: number) => {
    const updated = [...form.points];
    updated.splice(i, 1);
    setForm({ ...form, points: updated });
  };

  // 🔹 Reset form
  const resetForm = () => {
    setForm({ title: "", points: [""], image: "" });
    setFile(null);
    setEditingId(null);
  };

  // 🔹 Submit (CREATE + UPDATE)
  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setLoading(true);

    let imageUrl = form.image;

    try {
      if (file) {
        imageUrl = await uploadImage(file);
      }

      let res;

      if (editingId) {
        // 🔹 UPDATE
        res = await fetch(`/api/services/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // 🔥 REQUIRED
          body: JSON.stringify({ ...form, image: imageUrl }),
        });

        if (res.ok) toast.success("Service updated successfully");
        else toast.error("Update failed");

      } else {
        // 🔹 CREATE
        res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // 🔥 REQUIRED
          body: JSON.stringify({ ...form, image: imageUrl }),
        });

        if (res.ok) toast.success("Service added successfully");
        else toast.error("Add failed");
      }

      resetForm();
      fetchData();

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  // 🔹 Edit
  const handleEdit = (service: any) => {
    setForm({
      title: service.title || "",
      points: service.points || [""],
      image: service.image || "",
    });

    setEditingId(service.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔹 Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;

    const res = await fetch(`/api/services/${id}`, {
      method: "DELETE",
      credentials: "include", // 🔥 REQUIRED
    });

    if (res.ok) {
      toast.success("Service deleted successfully");
      fetchData();
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-10 text-black">

      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded-xl shadow max-w-xl">
        <h2 className="text-lg font-bold mb-4">
          {editingId ? "Edit Service" : "Add Service"}
        </h2>

        {/* Title */}
        <input
          placeholder="Service Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full border p-3 rounded mb-4"
        />

        {/* Image Upload */}
        <div className="mb-6">
          <p className="font-medium mb-2">Service Image</p>

          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <label
            htmlFor="imageUpload"
            className={`flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-xl cursor-pointer transition ${
              file || form.image
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
            }`}
          >
            {file || form.image ? (
              <span className="text-green-600 font-medium">
                Image Selected ✓
              </span>
            ) : (
              <>
                <p className="text-gray-500 text-sm">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </>
            )}
          </label>

          {file && (
            <p className="text-sm text-gray-600 mt-2">
              {file.name}
            </p>
          )}

          <div className="mt-4 relative">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                className="w-full h-48 object-cover rounded-xl border"
              />
            ) : form.image ? (
              <img
                src={form.image}
                className="w-full h-48 object-cover rounded-xl border"
              />
            ) : null}

            {(file || form.image) && (
              <button
                onClick={() => {
                  setFile(null);
                  setForm({ ...form, image: "" });
                }}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-xs rounded-md"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Points */}
        {form.points.map((p, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              value={p}
              onChange={(e) =>
                handlePointChange(i, e.target.value)
              }
              className="w-full border p-2 rounded"
            />
            <button
              onClick={() => removePoint(i)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addPoint}
          className="text-green-600 text-sm mb-4"
        >
          + Add Point
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading
            ? "Processing..."
            : editingId
            ? "Update Service"
            : "Add Service"}
        </button>
      </div>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s: any) => (
          <div
            key={s.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
              src={s.image || "/services/default.jpg"}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold">{s.title}</h3>

              <ul className="text-sm text-gray-600 mt-2 list-disc pl-5">
                {s.points?.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEdit(s)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}