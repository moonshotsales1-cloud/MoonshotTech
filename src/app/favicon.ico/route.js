import { NextResponse } from "next/server";

export function GET(request) {
  const url = new URL("/images/favicon-logo.png", request.url);
  const res = NextResponse.redirect(url, 307);
  res.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return res;
}
