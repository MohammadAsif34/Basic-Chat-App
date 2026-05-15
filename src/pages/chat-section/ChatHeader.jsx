import { ChevronLeft, EllipsisVertical, Search } from "lucide-react";
import { useCurrentChat, useUser } from "../../services/hooks/CustomHooks";
import { useDispatch } from "react-redux";
import { setCurrentState } from "../../services/slice/currentStateSlice";
import { clearCurrentChat } from "../../services/slice/currentChatSlice";

export const ChatHeader = () => {
  const { currentChat } = useCurrentChat();
  const { user } = useUser();
  const dispatch = useDispatch();

  return (
    <>
      <header className="h-20 px-4 bg-blue-100 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            className="w-10 h-10  md:hidden bg-slate-200 rounded-full hover:bg-slate-300 animate"
            onClick={() => {
              dispatch(setCurrentState("contact"));
              clearCurrentChat();
            }}
          >
            <ChevronLeft className="mx-1.5" />
          </button>
          <div className="ml-2 w-14 h-14 flex-none  rounded-2xl overflow-hidden">
            <img src={currentChat?.picture || "/default/avatar.png"} alt="" />
          </div>
          <p className="text-xl font-medium  truncate text-wrap line-clamp-1  ">
            {currentChat?.name}
          </p>
        </div>
        <div>
          <div className="px-4 flex items-center gap-8 text-blue-600">
            <button className="">
              <Search size={20} />
            </button>
            <button>
              <EllipsisVertical size={20} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
