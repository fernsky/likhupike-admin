import { verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/[lng]/i18n/settings";
import type { NextRequest } from "next/server";

acceptLanguage.languages(languages);

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Handle CORS checks for non-GET requests
  if (request.method !== "GET") {
    const originHeader = request.headers.get("Origin");
    const hostHeader = request.headers.get("Host");
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return new NextResponse(null, {
        status: 403,
      });
    }
  }

  // Handle i18n routing
  let lng;
  if (request.cookies.has(cookieName)) {
    lng = acceptLanguage.get(request.cookies.get(cookieName)?.value);
  }
  if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !request.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${request.nextUrl.pathname}`, request.url),
    );
  }

  // Handle referer language
  if (request.headers.has("referer")) {
    const refererUrl = new URL(request.headers.get("referer") as string);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|assets|sw.js|site.webmanifest).*)",
  ],
};
