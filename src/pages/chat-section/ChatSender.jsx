import { useDispatch } from "react-redux";
import {
  useAuth,
  useCurrentChat,
  useUser,
} from "../../services/hooks/CustomHooks";
import { useState, useEffect } from "react";
import { socket } from "../../services/utils/socket.js";
import { Plus } from "lucide-react";
import {
  addMessage,
  replaceTempMessage,
} from "../../services/slice/currentChatSlice";
import { encryptMessage } from "../../services/utils/crypto.js";
// import { addMessage, replaceTempMessage } from "./currentChatSlice";
export const ChatSender = () => {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const { user } = useUser();
  const { currentChat } = useCurrentChat();

  useEffect(() => {
    const handler = (msg) => {
      dispatch(addMessage(msg));
    };

    socket.on("message_received", handler);

    return () => socket.off("message_received", handler);
  }, [dispatch]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!msg.trim() || !currentChat?.chatId) return;

    try {
      const encrypted = encryptMessage(msg);

      socket.emit("send_message", {
        chatId: currentChat.chatId,
        sender: user._id,
        message: encrypted,
      });

      setMsg("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="
        px-4 py-3 flex items-center gap-3
        bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950
        border-t border-white/10
      "
    >

      {/* plus button */}
      <button
        type="button"
        className="
          w-10 h-10 flex items-center justify-center
          rounded-xl
          bg-white/5 border border-white/10
          text-white/70
          hover:text-white hover:border-cyan-400/40
          hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]
          transition
        "
      >
        <Plus size={18} />
      </button>

      {/* input */}
      <div className="
        flex-1 h-11 flex items-center
        rounded-xl
        bg-white/5 border border-white/10
        focus-within:border-cyan-400/40
        focus-within:shadow-[0_0_15px_rgba(34,211,238,0.15)]
        transition
      ">

        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          className="
            w-full h-full px-3
            bg-transparent
            outline-none
            text-white
            placeholder:text-white/30
          "
        />
      </div>

      {/* send */}
      <button
        type="submit"
        className="
          px-4 h-11
          rounded-xl
          bg-gradient-to-r from-cyan-500 to-blue-500
          text-white text-sm font-medium
          hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
          active:scale-95
          transition
        "
      >
        Send
      </button>

    </form>
  );
};