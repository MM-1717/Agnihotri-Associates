"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import toast from "react-hot-toast";

type ClienteleItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function ClienteleAdmin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [data, setData] = useState<ClienteleItem[]>([]);

  /* ================= FETCH ================= */
  const fetchData = async (): Promise<void> => {
    const { data } = await supabase.from("clientele").select("*");
    setData(data || []);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  /* ================= IMAGE PREVIEW ================= */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  /* ================= ADD ================= */
  const handleAdd = async () => {
    if (!title || !description || !file) {
      toast.error("All fields required");
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;

    // ✅ EXACT bucket name match (Clientele)
    const { error: uploadError } = await supabase.storage
      .from("Clientele")
      .upload(`uploads/${fileName}`, file, {
        upsert: true,
      });

    if (uploadError) {
      console.log("UPLOAD ERROR:", uploadError);
      toast.error(uploadError.message || "Image upload failed");
      return;
    }

    // ✅ EXACT bucket name in URL
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Clientele/uploads/${fileName}`;

    const { error } = await supabase.from("clientele").insert([
      {
        title,
        description,
        image: imageUrl,
      },
    ]);

    if (!error) {
      toast.success("Added successfully");
      setTitle("");
      setDescription("");
      setFile(null);
      setPreview(null);
      fetchData();
    } else {
      console.log("DB ERROR:", error);
      toast.error("Database error");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    await supabase.from("clientele").delete().eq("id", id);
    toast.success("Deleted");
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl font-bold text-black mb-6">
          Clientele
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md mb-10">

          <input
            placeholder="Title (e.g. Airways)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-3 w-full mb-3 rounded text-black"
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 w-full mb-3 rounded text-black"
          />

          {/* IMAGE INPUT */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>

            <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm text-black">
              Choose Image
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {file && (
              <p className="text-sm text-gray-600 mt-2">{file.name}</p>
            )}

            {preview && (
              <img
                src={preview}
                alt="Selected industry preview"
                className="w-full h-40 object-cover rounded border mt-4"
              />
            )}
          </div>

          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 w-full rounded font-medium"
          >
            Add Industry
          </button>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-32 object-cover rounded mb-3"
              />

              <h3 className="font-bold text-black">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {item.description}
              </p>

              <button
                onClick={() => handleDelete(item.id)}
                className="mt-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
