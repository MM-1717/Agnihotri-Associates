import { supabase } from "./supabase";

export async function uploadImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("services")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    throw new Error("Upload failed");
  }

  const { data } = supabase.storage
    .from("services")
    .getPublicUrl(fileName);

  return data.publicUrl;
}