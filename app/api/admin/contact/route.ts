import { NextResponse } from "next/server";
import { verifyToken } from "../../../lib/auth";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

type ContactPayload = {
  phone?: string;
  email?: string;
  address?: string;
  office_hours?: string;
  map_url?: string;
};

export async function GET() {
  try {
    await verifyToken();

    const { data, error } = await supabaseAdmin
      .from("contact_info")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { msg: "Contact info not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET contact info error:", err);
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req: Request) {
  try {
    await verifyToken();

    const body = (await req.json()) as ContactPayload;
    const { phone, email, address, office_hours, map_url } = body;

    if (!phone || !email || !address || !office_hours) {
      return NextResponse.json(
        { msg: "Phone, email, address, and office hours are required" },
        { status: 400 },
      );
    }

    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("contact_info")
      .select("id")
      .limit(1)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { msg: "No contact row found. Insert one contact_info row first." },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("contact_info")
      .update({
        phone,
        email,
        address,
        office_hours,
        map_url: map_url || "",
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error || !data) {
      console.error("Update contact info error:", error);
      return NextResponse.json({ msg: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({
      msg: "Contact updated successfully",
      updated: data,
    });
  } catch (err) {
    console.error("PUT contact info error:", err);
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }
}
