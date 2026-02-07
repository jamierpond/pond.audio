import { NextResponse, NextRequest } from "next/server";
import sharp from 'sharp';
import { createImage } from "./CreateImage";


export async function GET(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const split = pathName.split("/");
  // "" / api / version / progress-image / percent
  // 0  / 1   / 2       / 3              / 4
  const amount = parseFloat(split[4]);

  if (isNaN(amount)) {
    return new NextResponse("Invalid amount", { status: 400 });
  }

  // get width and height from query params
  const width = parseInt(request.nextUrl.searchParams.get("width") || "400");
  const height = parseInt(request.nextUrl.searchParams.get("height") || "400");
  const svg = createImage(amount, width, height);

  const pngBuffer = await sharp(Buffer.from(svg))
    .resize(width, height)
    .toFormat('png')
    .toBuffer();

  return new NextResponse(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

