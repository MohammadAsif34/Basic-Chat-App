import { Archive } from "lucide-react";
import { HeaderBack } from "../ui/HeaderBack";

export const ArchiveSection = () => {
  return (
    <div className="h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <HeaderBack label={"Archive"} />

      {/* Body */}
      <div className="px-4 py-5 space-y-4">
        {/* Info Banner */}
        <div
          className="
          p-3 rounded-xl
          bg-white/5 border border-white/10
          text-xs text-white/50
        "
        >
          Archived chats are hidden from your main inbox but remain accessible
          anytime.
        </div>

        {/* Archive List (empty state UI) */}
        <div
          className="
          flex flex-col items-center justify-center
          py-14 text-center
        "
        >
          <div
            className="
            w-16 h-16 rounded-2xl
            bg-white/5 border border-white/10
            flex items-center justify-center
            shadow-[0_0_20px_rgba(34,211,238,0.15)]
          "
          >
            <Archive className="text-cyan-400" size={26} />
          </div>

          <h2 className="mt-4 text-white text-sm font-medium">
            No archived chats
          </h2>

          <p className="text-white/40 text-xs mt-1 max-w-xs">
            Swipe left on chats or use menu options to archive conversations
          </p>
        </div>
      </div>
    </div>
  );
};
