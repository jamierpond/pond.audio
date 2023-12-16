import { NextResponse, NextRequest } from "next/server";
// import { createCanvas } from "canvas";
const cv = require("canvas");

export async function GET(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const split = pathName.split("/");
  // "" / api / version / progress-image / percent
  // 0  / 1   / 2       / 3              / 4
  const amount = parseFloat(split[4]);

  const lineWithRatio = 0.1;
  const width = 512;
  const height = width;
  const lineWidth = width * lineWithRatio;
  const canvas = cv.createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Scale the circles based on the provided width and height
  const radius = Math.min(width, height) / 2 - lineWidth; // 10 is the stroke width
  const centerX = width / 2;
  const centerY = height / 2;

  // fill background black
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);

  // Background circle
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.strokeStyle = '#ddd';
  context.lineWidth = lineWidth;
  context.stroke();

  // Foreground circle (progress)
  context.beginPath();
  context.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2) * (amount / 100));
  context.strokeStyle = 'green';
  context.lineWidth = lineWidth;
  context.stroke();

  // bump, bump
  // Draw check mark with squared ends and a right angle
  context.beginPath();
  context.lineCap = 'butt'; // Squared-off ends
  context.strokeStyle = 'white';
  context.lineWidth = lineWidth * 0.6; // Adjust the thickness of the check mark

  // Start point of the check mark
  const checkStartX = centerX - radius * 0.4;
  const checkStartY = centerY + radius * 0.1;

  // Middle point of the check mark (right angle)
  const checkMidX = centerX - radius * 0.1;
  const checkMidY = centerY + radius * 0.4;

  // End point of the check mark
  const checkEndX = centerX + radius * 0.5;
  const checkEndY = centerY - radius * 0.2;

  // Draw the check mark
  context.moveTo(checkStartX, checkStartY);
  context.lineTo(checkMidX, checkMidY); // Down to the middle point (right angle)
  context.lineTo(checkEndX, checkEndY); // Diagonal up to the end point
  context.stroke();

  const imageData = canvas.createJPEGStream().read();
  return new NextResponse(imageData, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}


