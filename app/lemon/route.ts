import { NextResponse } from "next/server";

export function GET() {
  const time = new Date().toLocaleTimeString();
  const message = `Hello, Emily! You're on the internet! You updated this at ${time}`;
  return NextResponse.json({ message: message });
}
