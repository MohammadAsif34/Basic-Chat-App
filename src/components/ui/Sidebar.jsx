import { useDispatch } from "react-redux";
import {
  Archive,
  Bell,
  Bookmark,
  CircleDotDashed,
  MessageSquareText,
} from "lucide-react";
import { ToolTip } from "./ToolTip";
import { useUser } from "../../services/hooks/CustomHooks";
import { setCurrentState } from "../../services/slice/currentStateSlice";
import { NoChat } from "./NoChat";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  return (
    <>
      <div className="w-18 md:w-20 h-full py-6 bg-blue-200 flex flex-col justify-between items-center tootltip ">
        <div className="flex flex-col items-center gap-5">
          <div
            className=" p-2  md:p-3 bg-white  rounded-xl text-slate-700 cursor-pointer group relative"
            onClick={() => dispatch(setCurrentState("contact"))}
          >
            <MessageSquareText />
            <ToolTip tooltip={"Chat"} />
          </div>
          <div
            className="p-2 md:p-3 bg-white  rounded-xl text-slate-700 cursor-pointer group relative"
            onClick={() => dispatch(setCurrentState("saved"))}
          >
            <Bookmark />
            <ToolTip tooltip={"Saved"} />
          </div>
          <div
            className="p-2 md:p-3 bg-white  rounded-xl text-slate-700 cursor-pointer group relative"
            onClick={() => dispatch(setCurrentState("status"))}
          >
            <CircleDotDashed />
            <ToolTip tooltip={"Status"} />
          </div>
          <div
            className="p-2 md:p-3 bg-white  rounded-xl text-slate-700 cursor-pointer group relative"
            onClick={() => dispatch(setCurrentState("archive"))}
          >
            <Archive />
            <ToolTip tooltip={"Archive"} />
          </div>
          <div
            className="p-2 md:p-3 bg-white  rounded-xl text-slate-700 cursor-pointer group relative"
            onClick={() => dispatch(setCurrentState("notification"))}
          >
            <Bell />
            <ToolTip tooltip={"Notification"} />
          </div>
        </div>
        <div
          className="w-10 h-10 md:w-12 md:h-12 bg-white  rounded-xl  overflow-hidden cursor-pointer group relative"
          onClick={() => dispatch(setCurrentState("setting"))}
        >
          <img
            src={user?.picture || "/default/avatar.png"}
            alt=""
            className="scale-110"
          />
          <ToolTip tooltip={"profile"} />
        </div>
      </div>
    </>
  );
};
