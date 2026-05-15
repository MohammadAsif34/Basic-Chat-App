import { ChevronLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCurrentState } from "../../services/slice/currentStateSlice";

export const HeaderBack = ({ label }) => {
  const dispatch = useDispatch();
  return (
    <>
      <header className="px-4 py-4 text-xl font-medium text-slate-600 flex items-center gap-4">
        <button
          className="w-10 h-10 bg-slate-200 rounded-full hover:bg-slate-300 animate"
          onClick={() => dispatch(setCurrentState("contact"))}
        >
          <ChevronLeft className="mx-1.5" />
        </button>
        {label}
      </header>
    </>
  );
};
