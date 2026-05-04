import { auth } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";

declare module "next/server" {
  interface NextRequest {
    auth: any;
  }
}

export default auth((req: NextRequest) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login");

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};