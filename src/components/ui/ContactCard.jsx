import { useDispatch } from "react-redux";
import { ChevronDown } from "lucide-react";
import { setCurrentChat } from "../../services/slice/currentChatSlice";
import { useLocation } from "react-router-dom";
import { setCurrentState } from "../../services/slice/currentStateSlice";
export const ContactCard = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="
        group flex items-center gap-3
        px-4 py-3 rounded-xl cursor-pointer
        bg-white/5 border border-white/10
        hover:bg-white/10
        hover:border-cyan-400/30
        hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]
        transition-all duration-200
      "
      onClick={() => {
        dispatch(setCurrentChat(contact));
        dispatch(setCurrentState("chat"));
      }}
    >
      {/* Avatar */}
      <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-xl overflow-hidden border border-white/10">
        <img
          src={contact?.picture || "/default/avatar.png"}
          alt=""
          className="w-full h-full object-cover"
        />

        {/* online dot (optional future-ready UI) */}
        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-medium text-white truncate">
            {contact?.name || "Name"}
          </p>

          <p className="text-[10px] text-white/40 whitespace-nowrap">
            {contact?.lastMessageTime || ""}
          </p>
        </div>

        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-white/50 truncate max-w-[180px]">
            {contact?._id || "Last message preview"}
          </p>

          {/* hover action */}
          <div
            className="
            opacity-0 group-hover:opacity-100
            transition-all duration-200
            text-cyan-300
          "
          >
            <ChevronDown size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
