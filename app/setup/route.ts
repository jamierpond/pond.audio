import { NextResponse, NextRequest } from "next/server";

export async function GET(_: NextRequest) {
  return NextResponse.redirect("https://github.com/jamierpond/ubuntu-setup/raw/main/ubuntu-setup.sh");
}


