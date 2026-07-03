import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET || "default_super_secret_key_for_calmind";
const encodedKey = new TextEncoder().encode(secretKey);

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Define public routes
  const isPublicRoute = path === "/login" || path.startsWith("/api/public");
  
  // Read session cookie
  const session = req.cookies.get("session")?.value;
  let payload = null;

  if (session) {
    try {
      const { payload: decoded } = await jwtVerify(session, encodedKey, {
        algorithms: ["HS256"],
      });
      payload = decoded;
    } catch (error) {
      // Invalid session
    }
  }

  // Redirect unauthenticated users
  if (!isPublicRoute && !payload) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect authenticated users trying to access login page
  if (isPublicRoute && payload) {
    if (payload.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    } else {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  // Role-based protection
  if (path.startsWith("/admin") && payload?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl)); // User trying to access admin
  }
  
  if (path === "/" && payload?.role === "ADMIN") {
    // Optional: Prevent admin from seeing user homepage if not desired
    // return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
