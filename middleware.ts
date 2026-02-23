import { NextRequest, NextResponse } from "next/server";
import {getSessionCookie} from "better-auth/cookies"

async function authmiddleware(request: NextRequest) {
    const sessionCookie = await getSessionCookie(request)

    if(!sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

export default async function middleware(request: NextRequest) {
    return authmiddleware(request);
}