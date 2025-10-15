import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.redirect("https://raw.githubusercontent.com/jamierpond/yapi/refs/heads/main/yapi.schema.json");
}
