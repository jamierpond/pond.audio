import { NextResponse, NextRequest } from "next/server";
import sharp from 'sharp';

async function createImage(amount: number, width: number, height: number) {
  const lineWithRatio = 0.1;
  const lineWidth = Math.min(width, height) * lineWithRatio;
  const radius = Math.min(width, height) / 2 - lineWidth; // 10 is the stroke width
  const centerX = width / 2;
  const centerY = height / 2;

  // SVG Circle Element
  const backgroundCircle = `<circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="#ddd" stroke-width="${lineWidth}" fill="black"/>`;

  const fullCircle = 2 * Math.PI * radius;
  const progressLength = (amount / 100) * fullCircle;
  const offset = fullCircle - progressLength; // Offset the starting point to the top

  const foregroundCircle = `<circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="green" stroke-width="${lineWidth}" fill="none"
    stroke-dasharray="${fullCircle}" stroke-dashoffset="${offset}" transform="rotate(-90 ${centerX} ${centerY})"/>`;

  // SVG Check Mark
  const checkStartX = centerX - radius * 0.4;
  const checkStartY = centerY + radius * 0.1;
  const checkMidX = centerX - radius * 0.1;
  const checkMidY = centerY + radius * 0.4;
  const checkEndX = centerX + radius * 0.5;
  const checkEndY = centerY - radius * 0.2;

  const checkMark = `<path d="M${checkStartX},${checkStartY} L${checkMidX},${checkMidY} L${checkEndX},${checkEndY}" stroke="white" stroke-width="${lineWidth * 0.6}" fill="none"/>`;

  // SVG Element, bump for 18
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    ${backgroundCircle}
    ${foregroundCircle}
    ${checkMark}
  </svg>`;

    // Convert SVG string to PNG using sharp
  const pngBuffer = await sharp(Buffer.from(svg))
    .resize(width, height)
    .toFormat('png')
    .toBuffer();

  return new NextResponse(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

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
  return createImage(amount, width, height);
}
