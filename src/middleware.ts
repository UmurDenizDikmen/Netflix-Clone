import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/auth";
  const token = request.cookies.get("next-auth.session-token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(
      new URL("netflix-clone-projects.vercel.app/", request.nextUrl)
    );
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(
      new URL("netflix-clone-projects.vercel.app/auth", request.nextUrl)
    );
  }
}

export const config = {
  matcher: [
    "netflix-clone-projects.vercel.app/",
    "netflix-clone-projects.vercel.app/profile",
    "netflix-clone-projects.vercel.app/auth",
  ],
};
