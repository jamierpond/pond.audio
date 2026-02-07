import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { SecondsRemaining } from "./SecondsRemaining";
import { createImage } from "../api/v1/progress-image/[progress]/CreateImage";

const birthday = new Date("1997-11-12");
const lifeExpectancy = 105;
const deathDay = new Date(
  birthday.getFullYear() + lifeExpectancy,
  birthday.getMonth(),
  birthday.getDate(),
);
const progress =
  ((Date.now() - birthday.getTime()) /
    (deathDay.getTime() - birthday.getTime())) *
  100;

const title = "Jamie Pond has completed " + progress.toFixed(2) + "% of life.";
const twitterImages = [
  {
    url: "/api/v1/progress-image/" + progress.toFixed(2),
    alt: title,
  },
];

const openGraphImages = [
  {
    url:
      "/api/v1/progress-image/" +
      progress.toFixed(2) +
      "?width=1200&height=630",
    alt: title,
  },
];

export async function generateMetadata({}: {
  params: {};
  searchParams: {};
}): Promise<Metadata> {
  const desc =
    "Born on " +
    birthday.toDateString() +
    " and expected to die on " +
    deathDay.toDateString() +
    ".";
  return {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      images: openGraphImages,
    },
    twitter: {
      title: title,
      card: "summary",
      description: desc,
      images: twitterImages,
    },
  };
}

const shaderUrl =
  "https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1&cAzimuthAngle=180&cDistance=5.9&cPolarAngle=90&cameraZoom=1&color1=%230040ff&color2=%23db002f&color3=%23d0bce1&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=2.1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&toggleAxis=true&type=waterPlane&uAmplitude=0&uDensity=2.6&uFrequency=5.5&uSpeed=0.1&uStrength=2.3&uTime=0&wireframe=false&zoomOut=false";

export default function Page() {
  const imageSvg = createImage(progress, 100, 100);
  return (
    <div className="flex text-center flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">
        Jamie Pond has completed {progress.toFixed(2)}% of life.
      </h1>
      <h2 className="mt-5">Born on {birthday.toDateString()}</h2>
      <h2 className="mt-2">Expected to die on {deathDay.toDateString()}</h2>
      <SecondsRemaining birthDate={birthday} deathDate={deathDay} />
      <div className="flex items-center justify-center my-10">
        <div className="relative">
          <Image
            src={"data:image/svg+xml;base64," + btoa(imageSvg)}
            alt="Progress bar"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
