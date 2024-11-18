import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const domain = "home.pond.audio";
  const full = "https://" + domain + "/rick.webm";
  return NextResponse.redirect(full);
}
