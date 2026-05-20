import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { verifyToken } from "../../../lib/auth";

// ================= GET SINGLE =================
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { data, error } = await supabaseAdmin
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("GET single error:", error);
      return NextResponse.json(
        { error: "Failed to fetch service" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Unexpected GET error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// ================= UPDATE =================
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 🔒 PROTECT API
    await verifyToken();

    const { id } = await context.params;
    const body = await req.json();

    const { error } = await supabaseAdmin
      .from("services")
      .update(body)
      .eq("id", id);

    if (error) {
      console.error("UPDATE error:", error);
      return NextResponse.json(
        { error: "Failed to update service" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Updated successfully" });

  } catch (err) {
    console.error("UPDATE auth error:", err);
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

// ================= DELETE =================
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 🔒 PROTECT API
    await verifyToken();

    const { id } = await context.params;

    const { error } = await supabaseAdmin
      .from("services")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE error:", error);
      return NextResponse.json(
        { error: "Failed to delete service" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error("DELETE auth error:", err);
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
