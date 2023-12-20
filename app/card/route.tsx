import { NextResponse, NextRequest } from "next/server";

const isDev = process.env.NODE_ENV === "development";
const urlBase = isDev ? "http://localhost:3000" : "https://pond.audio";
const scanMeUrl = `${urlBase}/add-me`;
const vcfUrl = `${urlBase}/jamie.vcf`;

export async function GET(req: NextRequest) {
  const userAgent = req.headers.get("user-agent")?.toLowerCase();
  const isDesktop = userAgent?.includes("windows") || userAgent?.includes("mac");
  if (isDesktop) {
    return NextResponse.redirect(vcfUrl);
  }
  return NextResponse.redirect(scanMeUrl);
}
