import { NextResponse } from "next/server";
import withAuth from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Drivers only ever see their own vehicle, its violations, their profile,
    // and payment pages for their own fines - never the fleet-wide operational pages.
    const driverAllowedPrefixes = ["/my-vehicle", "/profile", "/payments", "/logout"];
    if (role === "DRIVER" && !driverAllowedPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
      return NextResponse.redirect(new URL("/my-vehicle", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|forgot-password|reset-password).*)",
  ],
};
