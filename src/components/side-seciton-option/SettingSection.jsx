import { Bell, Info, KeyRound, LogOut, UserCircle } from "lucide-react";
import { useUser } from "../../services/hooks/CustomHooks";
import { HeaderBack } from "../ui/HeaderBack";
import { useDispatch } from "react-redux";
import { setCurrentState } from "../../services/slice/currentStateSlice";
import { logout } from "../../services/slice/authSlice";

export const SettingSection = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  const item = [
    {
      label: "Profile",
      option: "Name, Profile picture",
      icon: <UserCircle size={30} />,
      link: "profile",
    },
    {
      label: "Account",
      option: "Privacy, Theme",
      icon: <KeyRound size={25} />,
    },
    {
      label: "Notifications",
      option: "Message, Group, Sound",
      icon: <Bell size={25} />,
    },
    {
      label: "Help & FAQs",
      option: "Help ,FAQs ,Privacy policy",
      icon: <Info size={25} />,
    },
  ];
  return (
    <>
      <HeaderBack label={"Setting"} />
      <div className="px-4">
        {/* name  */}
        <p className="py-4 px-2 font-medium text-xl truncate ">
          {user?.name || "NAME"}
        </p>
        <p className="text-xs text-gray-500 font-normal">{user.email}</p>
        {/* picture  */}
        <div className="py-4">
          <img
            src={user?.picture}
            alt=""
            className="w-40 h-40 mx-auto rounded-3xl"
          />
        </div>

        {/* options  */}

        {item.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 my-2 py-2 px-4 hover:bg-slate-100 rounded-xl cursor-pointer"
            onClick={() => dispatch(setCurrentState(item?.link))}
          >
            {item.icon}
            <div className="">
              <h3 className="text-lg ">{item.label}</h3>
              <p className="text-sm text-gray-500">{item.option}</p>
            </div>
          </div>
        ))}

        {/* logout  */}
        <div
          className="flex items-center gap-4 my-2 py-3 px-4 rounded-xl text-red-500 hover:bg-red-100 cursor-pointer"
          onClick={() => dispatch(logout())}
        >
          <div>
            <LogOut size={25} />
          </div>
          <div className="">
            <h3 className="text-lg ">Logout</h3>
          </div>
        </div>
      </div>
    </>
  );
};
