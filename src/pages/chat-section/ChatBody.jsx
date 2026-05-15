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
    <div className="
      flex-1 overflow-y-auto
      px-4 py-3
      bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
    ">

      {/* chat thread */}
      <div className="space-y-2">

        {messages?.map((msg, idx) => (
          <MessageCard
            key={idx}
            msg={msg}
            isMe={msg.sender === user._id}
          />
        ))}

        {/* scroll anchor */}
        <div ref={messagesEndRef} />

      </div>

    </div>
  );
};