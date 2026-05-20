import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { verifyToken } from "../../lib/auth";

function getErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : "Server error";
}

// ================= GET =================
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("services")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("GET ERROR:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error("GET SERVER ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// ================= POST =================
export async function POST(req: Request) {
  try {
    // 🔒 AUTH (VERY IMPORTANT)
    await verifyToken();

    const body = await req.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // 🔒 CONTROLLED INSERT (don’t trust frontend blindly)
    const { title, points, image } = body;

    const { data, error } = await supabaseAdmin
      .from("services")
      .insert([
        {
          title,
          points,
          image,
        },
      ]);

    if (error) {
      console.error("INSERT ERROR:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error("POST ERROR:", err);
    const message = getErrorMessage(err);

    // differentiate auth vs server
    if (
      message === "No token" ||
      message === "Unauthorized" ||
      message === "Not authorized"
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
