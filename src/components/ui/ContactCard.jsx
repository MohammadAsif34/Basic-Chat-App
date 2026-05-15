import { useDispatch } from "react-redux";
import { ChevronDown } from "lucide-react";
import { setCurrentChat } from "../../services/slice/currentChatSlice";
import { useLocation } from "react-router-dom";
import { setCurrentState } from "../../services/slice/currentStateSlice";

export const ContactCard = ({ contact }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className=" min-h-18 max-h-20 flex-1 px-5  py-8 rounded-xl flex items-center gap-2 group hover:bg-blue-100 cursor-pointer"
        onClick={() => {
          dispatch(setCurrentChat(contact));
          dispatch(setCurrentState("chat"));
        }}
      >
        <div className="w-10 h-10 md:w-14 md:h-14  rounded-xl overflow-hidden">
          <img src={contact?.picture || "/default/avatar.png"} alt="" />
        </div>
        <div className="flex-1">
          <div className=" flex justify-between">
            <p className="font-medium">{contact?.name || "Name"}</p>
            <p className="text-xs text-gray-400">{contact?.lastMessageTime}</p>
          </div>
          <div className=" flex justify-between">
            <p className="w -2xs text-sm text-gray-400  truncate">
              {contact?._id || "Last message"}
            </p>
            <p className="invisible opacity-0 group-hover:opacity-100 group-hover:visible overflow-hidden  transition-all duration-100 ease-in-out">
              <ChevronDown />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
