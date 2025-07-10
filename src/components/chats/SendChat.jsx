import { useState } from "react";
import { useUser } from "../../context/CreateContext";
import { setChat } from "../../services/userService";
import { sendMessage } from "../../services/chatSocket";

const SendChat = ({ setChats }) => {
  const [msg, setMsg] = useState("");
  const { user, currChat } = useUser();

  const handleSend = async (e) => {
    e.preventDefault();

    if (!msg.trim()) return;

    const newMsg = {
      senderId: user?._id,
      receiverId: currChat,
      message: msg.trim(),
    };

    const res = await setChat(newMsg);
    setChats((prev) => [...prev, newMsg]);
    console.log(res);
    sendMessage(newMsg);
    setMsg("");
  };
  return (
    <>
      <div className="h-14 px-4 border-y border-neutral-700 flex gap-x-6 justify-between items-center">
        <button className="w-9 aspect-square  border border-neutral-700 rounded-md cursor-pointer hover:bg-neutral-800 active:border-neutral-500">
          +
        </button>
        <form className="w-full h-9 flex gap-x-5 " onSubmit={handleSend}>
          {" "}
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full px-4  border border-neutral-700 rounded-md focus:outline-0 focus:border-neutral-500 "
          />
          <button className=" px-4 border border-neutral-700 rounded-md cursor-pointer hover:bg-neutral-800 active:border-neutral-500">
            send
          </button>
        </form>
      </div>
    </>
  );
};
export default SendChat;
