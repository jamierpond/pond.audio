"use client";
import { data } from "./data";
import { useEffect, useRef } from "react";
const pako = require('pako');

// data is a string
export default function Page() {
  const decodedBase64 = atob(data);
  const array = new Uint8Array(decodedBase64.length);
  for (let i = 0; i < decodedBase64.length; i++) {
    array[i] = decodedBase64.charCodeAt(i);
  }
  const unzippedData = pako.inflate(array);

  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      const blob = new Blob([unzippedData], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      audioRef.current.src = url;
    }
  }, [unzippedData]);

  return (
    <div>
      <h1>Hi Neer</h1>
      <audio ref={audioRef} controls />
    </div>
  );
}
