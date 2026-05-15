import React from "react";
import { useCurrentChat, useUser } from "../../services/hooks/CustomHooks";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../../services/utils/socket";
import { ChatSender } from "./ChatSender";
import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { fetchedMessages } from "../../services/slice/currentChatSlice";
import { userAPI } from "../../services/api/userAPI";
import { setCurrentState } from "../../services/slice/currentStateSlice";
import { ChatBG } from "../../components/ui/ChatBG";
// import { fetchedMessages } from "./currentChatSlice";

const ChatSection = () => {
  const { currentChat } = useCurrentChat();
  const { user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentChat = async () => {
      // setloading(true);
      try {
        const { data } = await userAPI.chatFetch(currentChat.chatId);
        if (data.success) {
          console.log("chat fetched");
          dispatch(fetchedMessages(data.messages));
        }
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      } finally {
        // setloading(false);
      }
    };

    const joinChat = () => {
      socket.emit("join_chat", {
        chatId: currentChat.chatId,
        userId: user._id,
      });
      console.log("join_chat_room");
    };

    fetchCurrentChat();
    joinChat();
  }, [currentChat]);

  return (
    <section className="flex-1 h-screen relative  flex flex-col bg-slate-50 bg-blue-200">
      {/* <ChatBG /> */}
      {/* chat header  */}
      <ChatHeader />

      {/* chat body  */}
      <ChatBody />

      {/* chat send section  */}
      <ChatSender />
    </section>
  );
};

export default ChatSection;
