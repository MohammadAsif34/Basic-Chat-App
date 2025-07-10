import React, { useEffect, useRef, useState } from "react";
import { userInfo } from "../../services/userService";
import { useUser } from "../../context/CreateContext";

import SendChat from "./SendChat";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import {
  connectSocket,
  disconnectSocket,
  onReceiveMessage,
} from "../../services/chatSocket";

const ChatsSection = () => {
  const { currChat, user } = useUser();
  const [currContact, setCurrContact] = useState({});
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (user?._id) {
      connectSocket(user._id);
      onReceiveMessage((msg) => {
        console.log("Incomming socket message: ", msg);
        setNewMessage(msg);
      });
    }

    return () => {
      disconnectSocket();
    };
  }, [user?._id]);

  useEffect(() => {
    const fetchCurrChat = async () => {
      const data = await userInfo(currChat);
      setCurrContact(data?.user);
      console.log(data);
    };
    fetchCurrChat();
  }, [currChat]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100); // delay 1 frame

    return () => clearTimeout(timeout);
  }, [chats]);
  

  return (
    <div className="w-full  ">
      <div>
        <ChatHeader currContact={currContact} />
      </div>
      <div ref={scrollRef} className=" h-[470px] max-lg:h-[545px] py-3 overflow-y-auto">
        <ChatBody
          newMessage={newMessage}
          chats={chats}
          setChats={setChats}
          scrollRef={scrollRef}
        />
      </div>
      <div className="mt-2">
        <SendChat setChats={setChats} />
      </div>
    </div>
  );
};

export default ChatsSection;
