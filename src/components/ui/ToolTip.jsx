export const ToolTip = ({ tooltip }) => {
  return (
    <div
      className="
        absolute bottom-0 left-[110%] px-3 py-1 text-xs font-medium text-white rounded-lg bg-slate-900/80 backdrop-blur-md
        border border-white/10 shadow-[0_0_15px_rgba(34,211,238,0.25)] opacity-0 invisible group-hover:visible group-
        hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap
      "
      title={null}
    >
      {/* neon accent line */}
      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-cyan-400 to-purple-500 rounded-l-lg" />

      {tooltip}
    </div>
  );
};
