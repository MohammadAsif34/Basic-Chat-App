import { Bookmark } from "lucide-react";
import { HeaderBack } from "../ui/HeaderBack";

export const SavedSection = () => {
  return (
    <div className="h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <HeaderBack label={"Saved"} />

      {/* Body */}
      <div className="flex flex-col items-center justify-center h-[80%] text-center px-6">
        {/* Icon */}
        <div
          className="
          w-16 h-16 rounded-2xl
          bg-white/5 border border-white/10
          flex items-center justify-center
          shadow-[0_0_20px_rgba(34,211,238,0.15)]
        "
        >
          <Bookmark className="text-cyan-400" size={26} />
        </div>

        {/* Title */}
        <h2 className="mt-4 text-white text-lg font-medium">
          No saved items yet
        </h2>

        {/* Subtitle */}
        <p className="text-white/40 text-sm mt-1 max-w-xs">
          Save messages, links, or important chats here for quick access later.
        </p>

        {/* CTA hint */}
        <div className="mt-6 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/40">
          Long press messages to save them
        </div>
      </div>
    </div>
  );
};
