import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Public routes (no login needed)
  const publicRoutes = ["/login", "/register", "/"];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If user NOT logged in
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
}

// Protect these routes
export const config = {
  matcher: [
    "/menu/:path*",
    "/orders/:path*",
    "/tables/:path*",
    "/qr/:path*",
    "/admin/:path*",
  ],
};
