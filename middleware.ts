import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("accessToken")?.value;

  // 🔓 If user already logged in → block login page
  if (pathname === "/admin/login") {
    if (token) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", req.url)
      );
    }
    return NextResponse.next();
  }

  // 🔒 Protect all admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};