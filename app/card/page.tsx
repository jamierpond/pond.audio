"use client";
import { useState, useRef } from "react";

export default function VideoPage() {
  const videoSource = "/rick.mp4";
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayVideo = async () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    videoRef.current.loop = true;
    videoRef.current.playbackRate = 1;
    videoRef.current.volume = 1.0;
    await videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="relative min-h-screen">
      {!isPlaying && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50">
          <button
            onClick={handlePlayVideo}
            className="px-6 py-3 bg-white hover:bg-gray-100 text-black rounded-lg font-medium text-lg transition-colors"
          >
            I Dare To Wander
          </button>
        </div>
      )}

      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover"
      >
        <source src={videoSource} />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 text-white">
        {/* Add any content you want to display over the video */}
      </div>
    </div>
  );
}
