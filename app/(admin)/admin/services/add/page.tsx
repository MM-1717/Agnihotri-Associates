"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "../../../../lib/uploadImage";

export default function AddService() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    points: [""],
    image: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handlePointChange = (i: number, val: string) => {
    const updated = [...form.points];
    updated[i] = val;
    setForm({ ...form, points: updated });
  };

  const addPoint = () => {
    setForm({ ...form, points: [...form.points, ""] });
  };

  const handleSubmit = async () => {
    let imageUrl = "";

    if (file) {
      imageUrl = await uploadImage(file);
    }

    await fetch("/api/services", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        image: imageUrl,
      }),
    });

    router.push("/admin/services");
  };

  return (
    <div className="space-y-4">

      <input
        placeholder="Title"
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      {/* Image Upload */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* Points */}
      {form.points.map((p, i) => (
        <input
          key={i}
          value={p}
          onChange={(e) => handlePointChange(i, e.target.value)}
        />
      ))}

      <button onClick={addPoint} className="text-black">+ Add Point</button>

      <button onClick={handleSubmit} className="text-black">Add Service</button>
    </div>
  );
}