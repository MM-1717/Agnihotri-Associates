import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔒 Validation
    if (!email || !password) {
      return NextResponse.json(
        { msg: "Email and password required" },
        { status: 400 },
      );
    }

    // 🔹 Fetch admin
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !admin) {
      return NextResponse.json({ msg: "Admin not found" }, { status: 404 });
    }

    // 🔹 Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 401 });
    }

    // 🔐 Create Access Token
    const accessToken = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    // 🔐 Create Refresh Token
    const refreshToken = jwt.sign(
      {
        id: admin.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    // 📦 Create response
    const response = NextResponse.json({
      message: "Login successful",
    });

    // 🍪 Set Access Token cookie
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // 🔥 FIX HERE
      sameSite: "lax", // 🔥 FIX HERE
      path: "/",
      maxAge: 60 * 60,
    });

    // 🍪 Set Refresh Token cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // 🔥 FIX HERE
      sameSite: "lax", // 🔥 FIX HERE
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.log("🔥 Login error:", err);

    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
