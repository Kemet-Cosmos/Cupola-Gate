import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl;

  const blockedForSignedIn = ["/login", "/register", "/sign-in", "/sign-up"];

  const protectedRoutes = ["/profile","/levels","/Chat"];

  if (userId) {
    if (blockedForSignedIn.some((path) => url.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  } else {
    if (protectedRoutes.some((path) => url.pathname.startsWith(path))) {
      return NextResponse.redirect(
        new URL("/register?redirect_url=" + url.pathname, req.url)
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
