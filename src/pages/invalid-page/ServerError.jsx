import React from "react";
import { RefreshCw, Home } from "lucide-react";

export default function ServerError() {
  return (
    <div
      className="
      min-h-screen flex items-center justify-center
      bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
      text-white px-6
    "
    >
      <div className="text-center max-w-md">
        {/* Error code */}
        <h1 className="text-7xl font-extrabold text-white/90 tracking-tight">
          500
        </h1>

        {/* title */}
        <h2 className="mt-4 text-xl font-semibold text-white">Server Error</h2>

        {/* message */}
        <p className="mt-3 text-white/40 text-sm">
          Something went wrong on our side. We’re fixing it as quickly as
          possible.
        </p>

        {/* glow effect */}
        <div className="my-10 flex justify-center">
          <div
            className="
            h-40 w-40 rounded-full
            bg-cyan-500/10 blur-3xl
            animate-pulse
          "
          />
        </div>

        {/* actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="
              flex items-center justify-center gap-2
              px-5 py-3 rounded-xl
              bg-gradient-to-r from-cyan-500 to-blue-500
              text-white font-medium
              hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
              active:scale-95
              transition
            "
          >
            <RefreshCw size={16} />
            Retry
          </button>

          <a
            href="/"
            className="
              flex items-center justify-center gap-2
              px-5 py-3 rounded-xl
              bg-white/5 border border-white/10
              text-white/70
              hover:text-white hover:border-cyan-400/40
              hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]
              transition
            "
          >
            <Home size={16} />
            Go Home
          </a>
        </div>

        {/* footer */}
        <p className="mt-8 text-xs text-white/30">
          If the problem persists, contact support.
        </p>
      </div>
    </div>
  );
}
