import { Check, CheckCheck, CheckLine } from "lucide-react";
import { dateTimeFormat } from "../../services/utils/dateTimeFormat";
import { decryptMessage } from "../../services/utils/crypto";
export const MessageCard = ({ msg, isMe }) => {
  return (
    <div className={`w-full flex ${isMe ? "justify-end" : "justify-start"}`}>

      <div
        className={`
          relative
          max-w-[75%]
          my-1 px-3 py-2
          rounded-2xl
          text-sm break-words
          transition

          ${
            isMe
              ? `
                bg-gradient-to-r from-cyan-500 to-blue-500
                text-white
                shadow-[0_0_15px_rgba(34,211,238,0.25)]
              `
              : `
                bg-white/5 border border-white/10
                text-white/80
              `
          }
        `}
      >

        {/* message text */}
        <div className="whitespace-pre-wrap">
          {decryptMessage(msg.message)}
        </div>

        {/* meta row */}
        <div
          className={`
            mt-1 flex items-center justify-end gap-1
            text-[10px]
            ${isMe ? "text-white/70" : "text-white/40"}
          `}
        >
          <span>{dateTimeFormat(msg.updatedAt)}</span>

          {isMe && (
            <Check size={14} className="text-white/80" />
          )}
        </div>

      </div>
    </div>
  );
};