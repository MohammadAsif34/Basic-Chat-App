import { ChevronLeft, EllipsisVertical, Search } from "lucide-react";
import { useCurrentChat, useUser } from "../../services/hooks/CustomHooks";
import { useDispatch } from "react-redux";
import { setCurrentState } from "../../services/slice/currentStateSlice";
import { clearCurrentChat } from "../../services/slice/currentChatSlice";
import { toast } from "react-toastify";
import { userAPI } from "../../services/api/userAPI";
import { deleteContact } from "../../services/slice/userSlice";
export const ChatHeader = () => {
  const { currentChat } = useCurrentChat();
  const dispatch = useDispatch();

  const handleChatDelete = async () => {
    try {
      const { data } = await userAPI.chatDelete(currentChat.chatId);

      if (data.success) {
        dispatch(deleteContact(currentChat._id));
        dispatch(clearCurrentChat());
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <header className=" h-16 px-4  flex items-center justify-between bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-white/10 ">
      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0">
        {/* back button */}
        <button
          className="
            w-10 h-10 md:hidden
            rounded-xl
            bg-white/5 border border-white/10
            text-white/70
            hover:text-white hover:bg-white/10
            hover:border-cyan-400/40
            hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]
            transition
          "
          onClick={() => {
            dispatch(setCurrentState("contact"));
            dispatch(clearCurrentChat());
          }}
        >
          <ChevronLeft size={20} className="mx-auto" />
        </button>

        {/* avatar */}
        <div
          className="
          w-11 h-11 md:w-12 md:h-12
          rounded-xl overflow-hidden
          border border-white/10
        "
        >
          <img
            src={currentChat?.picture || "/default/avatar.png"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* name + status */}
        <div className="min-w-0">
          <p className="text-white font-medium truncate">
            {currentChat?.name || "Select chat"}
          </p>
          <p className="text-white">{currentChat.chatId}</p>

          <p className="text-xs text-white/40">online</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 text-cyan-300">
        <button
          className="
          p-2 rounded-xl
          hover:bg-white/10
          hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]
          transition
        "
        >
          <Search size={18} />
        </button>

        <button
          className="
          p-2 rounded-xl
          hover:bg-white/10
          transition
        "
          onClick={handleChatDelete}
        >
          <EllipsisVertical size={18} />
        </button>
      </div>
    </header>
  );
};
