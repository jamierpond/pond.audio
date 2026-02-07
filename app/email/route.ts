import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.redirect("mailto:hi@pond.audio");
}
