import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  // get the domain we're being served from (e.g. "example.com")
  const domain = "home.pond.audio";
  const full = "https://" + domain + "/rick.webm";
  return NextResponse.redirect(full);
}
