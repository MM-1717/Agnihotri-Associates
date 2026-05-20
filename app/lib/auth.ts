import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyToken() {
  const cookieStore = await cookies(); // ✅ MUST be awaited

  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("No token");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as any;

    if (decoded.role !== "admin") {
      throw new Error("Not authorized");
    }

    return decoded;

  } catch (err) {
    console.log("JWT ERROR:", err);
    throw new Error("Unauthorized");
  }
}