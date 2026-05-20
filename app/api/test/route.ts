import { NextResponse } from "next/server";
import { verifyToken } from "../../lib/auth";

export async function GET(req: Request) {
  try {
    verifyToken(req);

    return NextResponse.json({ msg: "Access granted" });

  } catch (err) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }
}