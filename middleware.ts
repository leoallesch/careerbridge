import {betterFetch} from "@better-fetch/fetch";
import {Session} from "better-auth";
import {NextResponse,type NextRequest} from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const isAuthPage=
    request.nextUrl.pathname.startsWith("/auth");
  const isAppPage=request.nextUrl.pathname.startsWith("/dashboard");

  const {data: session}=await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie")||"",
      },
    },
  );

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session && isAppPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config={
  matcher: ["/dashboard","/auth/:path*"],
};