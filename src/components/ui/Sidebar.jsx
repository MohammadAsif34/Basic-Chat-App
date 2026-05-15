import { useDispatch } from "react-redux";
import { useUser } from "../../services/hooks/CustomHooks";
import {
  Archive,
  Bell,
  Bookmark,
  CircleDotDashed,
  MessageSquareText,
} from "lucide-react";
import { setCurrentState } from "../../services/slice/currentStateSlice";
import { ToolTip } from "./ToolTip";
export const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  const items = [
    {
      key: "contact",
      icon: <MessageSquareText />,
      label: "Chat",
      color: "from-pink-500 to-rose-500",
    },
    {
      key: "saved",
      icon: <Bookmark />,
      label: "Saved",
      color: "from-purple-500 to-indigo-500",
    },
    {
      key: "status",
      icon: <CircleDotDashed />,
      label: "Status",
      color: "from-green-400 to-emerald-500",
    },
    {
      key: "archive",
      icon: <Archive />,
      label: "Archive",
      color: "from-orange-400 to-amber-500",
    },
    {
      key: "notification",
      icon: <Bell />,
      label: "Alerts",
      color: "from-sky-400 to-blue-500",
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-20 h-full py-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex-col justify-between items-center">
        <div className="flex flex-col items-center gap-5">
          {items.map((item) => (
            <div
              key={item.key}
              onClick={() => dispatch(setCurrentState(item.key))}
              className={`group relative p-3 rounded-2xl cursor-pointer 
              bg-white/10 backdrop-blur-md border border-white/10
              hover:scale-110 transition-all duration-200
              hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]`}
            >
              <div className="text-white group-hover:text-white">
                {item.icon}
              </div>

              {/* glow effect */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all bg-gradient-to-r ${item.color}`}
              />

              <ToolTip tooltip={item.label} />
            </div>
          ))}
        </div>

        {/* Profile */}
        <div
          className="relative w-12 h-12 rounded-2xl overflow-hidden cursor-pointer
          border-2 border-transparent hover:border-cyan-400 transition-all
          shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          onClick={() => dispatch(setCurrentState("setting"))}
        >
          <img
            src={user?.picture || "/default/avatar.png"}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0
        bg-slate-950/95 backdrop-blur-xl border-t border-white/10
        flex justify-around items-center py-2
        pb-[env(safe-area-inset-bottom)]"
      >
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => dispatch(setCurrentState(item.key))}
            className="flex flex-col items-center justify-center w-12 h-12 text-white/70
            hover:text-white active:scale-95 transition"
          >
            <div className="p-1 rounded-lg hover:bg-white/10">{item.icon}</div>
            <span className="text-[10px] opacity-80">{item.label}</span>
          </button>
        ))}

        <button
          onClick={() => dispatch(setCurrentState("setting"))}
          className="w-12 h-12 rounded-xl overflow-hidden border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
        >
          <img
            src={user?.picture || "/default/avatar.png"}
            className="w-full h-full object-cover"
            alt="profile"
          />
        </button>
      </div>
    </>
  );
};
