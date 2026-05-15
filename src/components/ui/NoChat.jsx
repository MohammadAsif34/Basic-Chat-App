import React from "react";
import Brand from "./Brand";

export const NoChat = () => {
  return (
    <>
      <div className="w-full min-w-md h-full flex items-center justify-center bg-linear-to-br from-blue-200 via-slate-50 to-indigo-100 p-6">
        <div className="w-full max-w-lg rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow-xl p-10 text-center space-y-8">
          {/* Logo / Brand */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-blue-500 to-indigo-300 shadow-md"></div>

            <Brand />

            <p className="text-sm text-slate-500">
              Real-time communication platform built for speed & simplicity
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-3 text-left">
            {[
              "⚡ Instant Messaging",
              "🔒 End-to-End Secure",
              "🌐 Socket Realtime Sync",
              "📱 Fully Responsive UI",
              "🚀 Scalable Architecture",
              "🎯 Smooth UX Design",
            ].map((item) => (
              <div
                key={item}
                className="px-3 py-2 bg-linear-to-tr from-blue-50 to-white rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 hover:bg-slate-100 transition"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "React",
              "Node.js",
              "Express",
              "MongoDB",
              "Socket.io",
              "Tailwind",
              "Lucide Icon",
              "React Toastify",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA Hint */}
          <div className="pt-2">
            <p className="text-xs text-slate-400">
              Select a user or start a new conversation to begin messaging
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
