import { NextResponse } from "next/server";
export async function GET() {
  // you're too hot remix
  return NextResponse.redirect("https://www.youtube.com/watch?v=Gy9W4nTxre4");
}
