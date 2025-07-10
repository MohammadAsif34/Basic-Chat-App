import React, { useEffect } from "react";
import { getChat } from "../../services/userService";
import { useUser } from "../../context/CreateContext";

const ChatBody = ({ chats, setChats, newMessage, scrollRef }) => {
  const { user, currChat } = useUser();

  useEffect(() => {
    const fetchChat = async () => {
      const data = await getChat({ senderId: user?._id, receiverId: currChat });
      console.log(data);
      setChats(data?.chat);
    };
    fetchChat();
  }, [currChat]);

  useEffect(() => {
    if (newMessage && newMessage.senderId == currChat) {
      setChats((prev) => [...prev, newMessage]);
    }
  }, [newMessage]);

  return (
    <div
      ref={scrollRef}
      className="w-full h-full px-4 py-4 flex flex-col flex-nowrap scroll-auto"
    >
      {chats?.map((chat, idx) => (
        <Message key={chat?._id || idx} chat={chat} />
      ))}
    </div>
  );
};

export default ChatBody;

const Message = ({ chat }) => {
  const { currChat } = useUser();

  return (
    <>
      {chat.receiverId != currChat ? (
        <div className="max-w-3/4  my-2 px-3 py-1.5 bg-neutral-900 self-start  rounded-lg  transition-all">
          {chat?.message}
        </div>
      ) : (
        <div className="max-w-3/4  my-1 px-3 py-1.5 bg-neutral-700 self-end  rounded-lg ">
          {chat?.message}
        </div>
      )}
    </>
  );
};
