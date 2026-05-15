import React from "react";
import { AlertTriangle } from "lucide-react";

const InvalidPage = () => {
  return (
    <div
      className="
      w-full h-screen
      flex flex-col items-center justify-center
      bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
      text-center px-6
    "
    >
      {/* icon */}
      <div
        className="
        w-16 h-16 rounded-2xl
        bg-white/5 border border-white/10
        flex items-center justify-center
        shadow-[0_0_20px_rgba(34,211,238,0.15)]
      "
      >
        <AlertTriangle className="text-cyan-400" size={28} />
      </div>

      {/* title */}
      <h1 className="mt-4 text-white text-xl font-semibold">Page not found</h1>

      {/* subtitle */}
      <p className="text-white/40 text-sm mt-2 max-w-xs">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* hint */}
      <div
        className="
        mt-6 px-4 py-2
        rounded-xl
        bg-white/5 border border-white/10
        text-xs text-white/40
      "
      >
        Check the URL or return to chats
      </div>
    </div>
  );
};

export default InvalidPage;
