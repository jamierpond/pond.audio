import { NextResponse, NextRequest } from "next/server";

export async function GET(_: NextRequest) {
  return NextResponse.redirect("https://github.com/jamierpond/bootstrap/raw/main/ubuntu-setup.sh");
}


