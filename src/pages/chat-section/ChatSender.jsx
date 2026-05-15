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
// import { addMessage, replaceTempMessage } from "./currentChatSlice";

export const ChatSender = () => {
  const { token } = useAuth();
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { user } = useUser();
  const { currentChat } = useCurrentChat();

  // receive message from socket
  useEffect(() => {
    socket.on("message_received", (msg) => {
      console.log("msg-receive:", msg);
      // dispatch(replaceTempMessage(msg));
      dispatch(addMessage(msg));
    });

    return () => {
      socket.off("message_received");
    };
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      // temporary optimistic message
      const tempMessage = {
        _id: Date.now().toString(),
        tempId: Date.now().toString(),
        chatId: currentChat.chatId,
        sender: user._id,
        message,
        pending: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      //   dispatch(addMessage(tempMessage));

      socket.emit("send_message", {
        chatId: currentChat.chatId,
        sender: user._id,
        message,
        tempId: tempMessage.tempId,
      });

      setMessage("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className="px-8 py-4 flex gap-4 ">
      <div className="px-3 bg-blue-200  rounded-2xl flex justify-center items-center">
        <Plus className="text-blue-600" />
      </div>

      <div className="flex-1 h-12 border border-blue-400 bg-white rounded-2xl">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-full max-h-20 outline-0 px-4 resize-none scrollbar-track-transparent"
        />
      </div>

      <button
        onClick={handleSend}
        className="px-4 bg-blue-500 rounded-2xl py-3 font-medium capitalize text-white"
      >
        send
      </button>
    </form>
  );
};
