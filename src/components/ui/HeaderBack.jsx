import { ChevronLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCurrentState } from "../../services/slice/currentStateSlice";
export const HeaderBack = ({ label }) => {
  const dispatch = useDispatch();

  return (
    <header
      className="
      px-4 py-4 flex items-center gap-4
      bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950
      border-b border-white/10
    "
    >
      {/* Back Button */}
      <button
        onClick={() => dispatch(setCurrentState("contact"))}
        className="
          w-10 h-10 flex items-center justify-center
          rounded-xl
          bg-white/5 border border-white/10
          text-white/70
          hover:text-white hover:bg-white/10
          hover:border-cyan-400/40
          hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]
          transition-all duration-200
        "
      >
        <ChevronLeft size={20} />
      </button>

      {/* Label */}
      <h1
        className="
        text-lg font-medium text-white
        tracking-wide
        select-none
      "
      >
        {label}
      </h1>
    </header>
  );
};
