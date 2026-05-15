import React from "react";
import Brand from "./Brand";

export const NoChat = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div
        className="w-full min-w-xs max-w-lg rounded-3xl 
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        shadow-[0_0_40px_rgba(34,211,238,0.15)]
        p-1 md:p-4 lg:p-10 text-center space-y-8"
      >
        {/* Brand */}
        <div className="flex flex-col items-center space-y-3">
          <div
            className="w-14 h-14 rounded-2xl 
            bg-linear-to-tr from-cyan-400 via-blue-500 to-purple-600
            shadow-[0_0_25px_rgba(34,211,238,0.4)]"
          ></div>

          <Brand />

          <p className="text-sm text-white/60">
            Real-time communication built for speed, scale & smooth UX
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
              className="px-3 py-2 rounded-xl 
              bg-white/5 border border-white/10 
              text-sm text-white/70
              hover:bg-white/10 hover:border-cyan-400/30
              hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]
              transition-all duration-200"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Socket.io",
            "Tailwind",
            "Lucide Icons",
            "Toastify",
          ].map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs font-medium rounded-full
              bg-white/5 border border-white/10
              text-white/60
              hover:border-purple-400/40 hover:text-white
              transition"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-2">
          <p className="text-xs text-white/40">
            Select a user or start a conversation to begin messaging
          </p>
        </div>
      </div>
    </div>
  );
};
