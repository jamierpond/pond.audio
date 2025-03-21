import { NextResponse } from "next/server";
export async function GET() {
  // this file is like totally different
  console.log("Serving ubuntu-setup.sh");
  return NextResponse.redirect("https://github.com/jamierpond/.config/raw/main/ubuntu-setup.sh");
}
