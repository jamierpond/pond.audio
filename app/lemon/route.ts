import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "Hello, Emily! You're the internet!" });
}
