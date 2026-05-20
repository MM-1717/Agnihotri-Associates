"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { uploadImage } from "../../../../lib/uploadImage";

export default function EditServicePage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    points: [""],
    image: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch service by ID
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${id}`);
        const data = await res.json();

        setForm({
          title: data.title || "",
          points: data.points || [""],
          image: data.image || "",
        });
      } catch (err) {
        toast.error("Failed to load service");
      }

      setLoading(false);
    };

    if (id) fetchService();
  }, [id]);

  // 🔹 Handle title
  const handleTitleChange = (value: string) => {
    setForm({ ...form, title: value });
  };

  // 🔹 Handle points
  const handlePointChange = (index: number, value: string) => {
    const updated = [...form.points];
    updated[index] = value;
    setForm({ ...form, points: updated });
  };

  // 🔹 Add point
  const addPoint = () => {
    setForm({ ...form, points: [...form.points, ""] });
  };

  // 🔹 Remove point
  const removePoint = (index: number) => {
    const updated = [...form.points];
    updated.splice(index, 1);
    setForm({ ...form, points: updated });
  };

  // 🔹 Submit update
  const handleSubmit = async () => {
    if (!form.title.trim()) {
      return toast.error("Title is required");
    }

    let imageUrl = form.image;

    try {
      // Upload new image if selected
      if (file) {
        imageUrl = await uploadImage(file);
      }

      const res = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
        }),
      });

      if (res.ok) {
        toast.success("Service updated");
        router.push("/admin/services");
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Error updating service");
    }
  };

  if (loading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl font-bold">Edit Service</h1>

      {/* 🔹 Title */}
      <input
        value={form.title}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder="Service Title"
        className="w-full border p-3 rounded"
      />

      {/* 🔹 Image Upload */}
      <div className="space-y-2">
        <p className="font-medium">Service Image</p>

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        {/* Preview NEW image */}
        {file && (
          <img
            src={URL.createObjectURL(file)}
            className="w-40 h-40 object-cover rounded"
          />
        )}

        {/* Show existing image */}
        {!file && form.image && (
          <img
            src={form.image}
            className="w-40 h-40 object-cover rounded"
          />
        )}
      </div>

      {/* 🔹 Points */}
      <div className="space-y-3">
        <p className="font-medium">Service Points</p>

        {form.points.map((point, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={point}
              onChange={(e) =>
                handlePointChange(index, e.target.value)
              }
              className="w-full border p-2 rounded"
            />

            <button
              onClick={() => removePoint(index)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addPoint}
          className="text-green-600"
        >
          + Add Point
        </button>
      </div>

      {/* 🔹 Submit */}
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Update Service
      </button>
    </div>
  );
}