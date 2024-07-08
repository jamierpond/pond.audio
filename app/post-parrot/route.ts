import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  // parrot back the json given
  const json = await request.json();
  console.log("Parrotting back", json);
  return new NextResponse(JSON.stringify(json), {
    headers: {
      "content-type": "application/json",
    },
  });
}
