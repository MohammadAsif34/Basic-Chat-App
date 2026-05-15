import React from "react";

export default function ServerError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-indigo-400 to-indigo-500 text-white px-6">
      <div className="text-center max-w-md">
        {/* Error Code */}
        <h1 className="text-7xl font-extrabold tracking-tight">500</h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold">Server Failure</h2>

        {/* Message */}
        <p className="mt-3 text-white/80">
          Something went wrong on our side. We’re working to fix it as soon as
          possible.
        </p>

        {/* Glow effect */}
        <div className="my-10 flex justify-center">
          <div className="h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-md hover:bg-white/90 transition"
          >
            Retry
          </button>

          <a
            href="/"
            className="px-6 py-3 border border-white/30 rounded-xl hover:bg-indigo-500 transition"
          >
            Go Home
          </a>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-white/60">
          If the problem persists, contact support.
        </p>
      </div>
    </div>
  );
}
