import { useEffect } from "react";
import { useRef } from "react";
import { useCurrentChat, useUser } from "../../services/hooks/CustomHooks";
import { MessageCard } from "../../components/ui/MessageCard";

export const ChatBody = () => {
  const { user } = useUser();
  const { messages } = useCurrentChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <>
      {/* messages section  */}
      <div className="flex-1 py-2 px-6 overflow-y-auto">
        {messages?.map((msg, idx) => (
          <MessageCard
            key={idx}
            msg={msg}
            isMe={msg.sender == user._id}
            setMessage
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};
