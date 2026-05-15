import { Check, CheckCheck, CheckLine } from "lucide-react";
import { dateTimeFormat } from "../../services/utils/dateTimeFormat";
import { decryptMessage } from "../../services/utils/crypto";

export const MessageCard = ({ msg, isMe }) => {
  return (
    <>
      <div className={`w-full flex ${isMe && "justify-end"}`}>
        {isMe ? (
          <div className=" max-w-1/2 my-1 px-4 py-2 bg-blue-400 rounded-xl text-white text-wrap break-all">
            {decryptMessage(msg.message)}
            <div className="float-end text-[10px] pt-3 pl-3 text-gray-300 flex items-center">
              {dateTimeFormat(msg.updatedAt)}&nbsp;&nbsp;&nbsp;&nbsp;
              <Check size={14} />
              {/* <CheckCheck size={14} /> */}
              {/* <CheckLine size={14} className="text-blue-600" /> */}
            </div>
          </div>
        ) : (
          <div className=" max-w-1/2 my-1 px-4 py-2 bg-blue-100 rounded-xl text-gray-600 text-wrap break-all">
            {decryptMessage(msg.message)}
            <span className="float-end text-[10px] pt-3 pl-3 text-slate-400 ">
              {dateTimeFormat(msg.updatedAt)}
            </span>
          </div>
        )}
      </div>
    </>
  );
};
