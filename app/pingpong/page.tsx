"use client";

import { useState } from "react";

const PING_URL = process.env.NEXT_PUBLIC_PING_SERVICE_URL;
const PONG_URL = process.env.NEXT_PUBLIC_PONG_SERVICE_URL;

if (!PING_URL || !PONG_URL) {
  throw new Error("Missing required env vars: NEXT_PUBLIC_PING_SERVICE_URL, NEXT_PUBLIC_PONG_SERVICE_URL");
}

type ServiceResponse = {
  service: string;
  message: string;
  timestamp: string;
  status: "success" | "error";
};

export default function PingPongPage() {
  const [responses, setResponses] = useState<ServiceResponse[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  const callEndpoint = async (label: string, url: string) => {
    setLoading(label);
    const timestamp = new Date().toLocaleTimeString();

    try {
      const response = await fetch(url);
      const data = await response.json();

      setResponses((prev) => [
        { service: label, message: data.message || JSON.stringify(data), timestamp, status: "success" },
        ...prev.slice(0, 9),
      ]);
    } catch (e) {
      setResponses((prev) => [
        { service: label, message: `Error: ${e}`, timestamp, status: "error" },
        ...prev.slice(0, 9),
      ]);
    } finally {
      setLoading(null);
    }
  };

  const clearResponses = () => setResponses([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Ping Pong
        </h1>
        <p className="text-center text-slate-400 mb-12">
          Test your Blueprint microservices
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => callEndpoint("ping", `${PING_URL}/ping`)}
            disabled={loading !== null}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-xl
                     hover:from-cyan-400 hover:to-blue-400 transform hover:scale-105 transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                     shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50"
          >
            <span className="relative z-10">
              {loading === "ping" ? "..." : "PING"}
            </span>
            <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>

          <button
            onClick={() => callEndpoint("pong", `${PONG_URL}/pong`)}
            disabled={loading !== null}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-xl
                     hover:from-purple-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                     shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50"
          >
            <span className="relative z-10">
              {loading === "pong" ? "..." : "PONG"}
            </span>
            <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>

          <button
            onClick={() => callEndpoint("pingpong", `${PONG_URL}/pingpong`)}
            disabled={loading !== null}
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-xl font-bold text-xl
                     hover:from-amber-400 hover:via-orange-400 hover:to-red-400 transform hover:scale-105 transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                     shadow-lg shadow-orange-500/25 hover:shadow-orange-500/50"
          >
            <span className="relative z-10">
              {loading === "pingpong" ? "..." : "PING PONG"}
            </span>
            <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
        </div>

        {responses.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-300">Response Log</h2>
              <button
                onClick={clearResponses}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2 font-mono text-sm">
              {responses.map((r, i) => (
                <div
                  key={`${r.timestamp}-${i}`}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    r.service === "ping"
                      ? "bg-cyan-500/10 border border-cyan-500/20"
                      : r.service === "pong"
                      ? "bg-purple-500/10 border border-purple-500/20"
                      : "bg-orange-500/10 border border-orange-500/20"
                  }`}
                >
                  <span className="text-slate-500 text-xs">{r.timestamp}</span>
                  <span
                    className={`font-bold ${
                      r.service === "ping" ? "text-cyan-400" : r.service === "pong" ? "text-purple-400" : "text-orange-400"
                    }`}
                  >
                    {r.service.toUpperCase()}
                  </span>
                  <span className="text-slate-300">{r.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>Powered by Blueprint</p>
        </div>
      </div>
    </div>
  );
}
