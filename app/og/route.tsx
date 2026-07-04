import { ImageResponse } from "next/og";
import fs from "fs/promises";
import path from "path";

async function loadFont() {
  return fs.readFile(
    path.join(
      process.cwd(),
      "public",
      "fonts",
      "JetBrains_Mono",
      "static",
      "JetBrainsMono-Bold.ttf",
    ),
  );
}

export async function GET() {
  const fontData = await loadFont();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        fontFamily: "JetBrains Mono",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              padding: "6px 16px",
              backgroundColor: "#3DF1A61a",
              color: "#3DF1A6",
              border: "1px solid #3DF1A666",
            }}
          >
            TAMBER
          </span>
          <span
            style={{
              fontSize: "14px",
              padding: "6px 16px",
              backgroundColor: "#FF5C1C1a",
              color: "#FF5C1C",
              border: "1px solid #FF5C1C66",
            }}
          >
            EB-1A
          </span>
          <span
            style={{
              fontSize: "14px",
              padding: "6px 16px",
              backgroundColor: "#171717",
              color: "#a3a3a3",
              border: "1px solid #262626",
            }}
          >
            Los Angeles
          </span>
        </div>
      </div>
      <div
        style={{
          fontSize: "72px",
          fontWeight: "bold",
          letterSpacing: "-2px",
          marginBottom: "20px",
          display: "flex",
        }}
      >
        Jamie Pond
      </div>
      <div
        style={{
          fontSize: "28px",
          color: "#a3a3a3",
          lineHeight: 1.4,
          maxWidth: "1000px",
          display: "flex",
          gap: "10px",
        }}
      >
        <span>Founding Staff Software Engineer at</span>
        <span style={{ color: "#3DF1A6" }}>Tamber</span>
      </div>
      <div
        style={{
          fontSize: "28px",
          color: "#a3a3a3",
          lineHeight: 1.4,
          marginTop: "8px",
          display: "flex",
        }}
      >
        AI-first music creation. Audio engines, DSP, and dev tools.
      </div>
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginTop: "48px",
          fontSize: "18px",
          color: "#737373",
        }}
      >
        <span>pond.audio</span>
        <span>github.com/jamierpond</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "JetBrains Mono",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
