export const Loader = ({ label = "Loading..." }) => {
  return (
    <div
      className="
      fixed inset-0 z-50
      flex flex-col items-center justify-center gap-3
      bg-black/60 backdrop-blur-md
    "
    >
      {/* glow spinner */}
      <div
        className="
        w-12 h-12 rounded-full
        border-4 border-white/10
        border-t-cyan-400
        animate-spin
        shadow-[0_0_20px_rgba(34,211,238,0.3)]
      "
      />

      {/* label */}
      <p className="text-white/70 text-sm tracking-wide">{label}</p>
    </div>
  );
};

export const Loader2 = ({ label = "Loading..." }) => {
  return (
    <div
      className="
      w-full h-full
      flex flex-col items-center justify-center gap-2
      text-white/50
    "
    >
      <div
        className="
        w-8 h-8 rounded-full
        border-3 border-white/10
        border-t-cyan-400
        animate-spin
      "
      />

      <p className="text-xs">{label}</p>
    </div>
  );
};
