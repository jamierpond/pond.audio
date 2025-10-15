import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.redirect("https://raw.githubusercontent.com/jamierpond/yapit/refs/heads/main/yapit.schema.json");
}
