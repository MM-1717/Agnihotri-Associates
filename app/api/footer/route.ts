import { NextResponse } from "next/server";
import { verifyToken } from "../../lib/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ================= GET FOOTER =================
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("footer_settings")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { msg: "Footer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error("GET Footer Error:", err);
    return NextResponse.json(
      { msg: "Server error" },
      { status: 500 }
    );
  }
}

// ================= UPDATE FOOTER =================
export async function PUT(req: Request) {
  try {
    // 🔒 Auth
    verifyToken(req);

    const body = await req.json();
    const { address, phone, email, office_hours } = body;

    if (!address || !phone || !email || !office_hours) {
      return NextResponse.json(
        { msg: "All fields are required" },
        { status: 400 }
      );
    }

    // 🔹 First get existing row
    const { data: existing, error: fetchError } = await supabase
      .from("footer_settings")
      .select("id")
      .limit(1)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { msg: "No footer row found. Insert first." },
        { status: 400 }
      );
    }

    // 🔹 Update by ID (correct way)
    const { data, error } = await supabase
      .from("footer_settings")
      .update({
        address,
        phone,
        email,
        office_hours,
        updated_at: new Date(),
      })
      .eq("id", existing.id)
      .select();

    if (error) {
      console.error("Update Error:", error);
      return NextResponse.json(
        { msg: "Update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      msg: "Footer updated successfully",
      updated: data,
    });

  } catch (err) {
    console.error("Auth Error:", err);
    return NextResponse.json(
      { msg: "Unauthorized" },
      { status: 401 }
    );
  }
}