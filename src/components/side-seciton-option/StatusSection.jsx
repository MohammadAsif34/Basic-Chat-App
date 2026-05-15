import { CircleDotDashed } from "lucide-react";
import { HeaderBack } from "../ui/HeaderBack";

export const StatusSection = () => {
  return (
    <div className="h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <HeaderBack label={"Status"} />

      {/* Body */}
      <div className="px-4 py-5 space-y-4">
        {/* My Status */}
        <div
          className="
          flex items-center gap-3 p-3 rounded-xl
          bg-white/5 border border-white/10
          hover:border-cyan-400/30
          transition
        "
        >
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10">
            <img
              src="/default/avatar.png"
              className="w-full h-full object-cover"
              alt=""
            />

            {/* add status glow ring */}
            <div
              className="
              absolute inset-0 rounded-xl
              ring-2 ring-cyan-400/40
              animate-pulse
            "
            />
          </div>

          <div>
            <p className="text-white font-medium">My Status</p>
            <p className="text-xs text-white/40">Tap to add update</p>
          </div>
        </div>

        {/* Recent Updates Title */}
        <p className="text-xs text-white/40 px-1 uppercase tracking-wider">
          Recent updates
        </p>

        {/* Empty State */}
        <div
          className="
          flex flex-col items-center justify-center
          py-10 text-center
        "
        >
          <div
            className="
            w-14 h-14 rounded-2xl
            bg-white/5 border border-white/10
            flex items-center justify-center
            shadow-[0_0_20px_rgba(34,211,238,0.15)]
          "
          >
            <CircleDotDashed className="text-cyan-400" size={24} />
          </div>

          <h2 className="mt-3 text-white text-sm font-medium">
            No status updates
          </h2>

          <p className="text-white/40 text-xs mt-1 max-w-xs">
            Your contacts' status updates will appear here
          </p>
        </div>
      </div>
    </div>
  );
};
