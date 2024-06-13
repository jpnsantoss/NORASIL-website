import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware({
  // A list of all locales that are supported
  locales: ["en", "pt"],

  // Used when no locale matches
  defaultLocale: "en",
});

export async function middleware(req: NextRequest) {
  // Run the next-intl middleware first
  const intlResult = await intlMiddleware(req);
  if (intlResult) {
    return intlResult;
  }

  // Then run your custom middleware
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pt|en)/:path*"],
};
