import { NextResponse, NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";
  const urlBase = isDev ? "http://localhost:3000" : "https://pond.audio";
  const scanMeUrl = `${urlBase}/add-me`;
  const vcfUrl = `${urlBase}/jamie.vcf`;

  const userAgent = req.headers.get("user-agent")?.toLowerCase();
  const isMobile = userAgent?.includes("android") || userAgent?.includes("iphone");
  if (isMobile) {
    return NextResponse.redirect(vcfUrl);
  }
  return NextResponse.redirect(scanMeUrl);
}
