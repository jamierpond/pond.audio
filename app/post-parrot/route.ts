import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  // parrot back the json given
  const json = await request.json();
  return new NextResponse(JSON.stringify(json), {
    headers: {
      "content-type": "application/json",
    },
  });
}
