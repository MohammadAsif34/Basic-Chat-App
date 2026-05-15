import { Bell, Info, KeyRound, LogOut, UserCircle } from "lucide-react";
import { useUser } from "../../services/hooks/CustomHooks";
import { HeaderBack } from "../ui/HeaderBack";
import { useDispatch } from "react-redux";
import { setCurrentState } from "../../services/slice/currentStateSlice";
import { logout } from "../../services/slice/authSlice";
export const SettingSection = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  const items = [
    {
      label: "Profile",
      option: "Name, Profile picture",
      icon: <UserCircle size={22} />,
      link: "profile",
    },
    {
      label: "Account",
      option: "Privacy, Theme",
      icon: <KeyRound size={22} />,
      link: "account",
    },
    {
      label: "Notifications",
      option: "Message, Group, Sound",
      icon: <Bell size={22} />,
      link: "notification",
    },
    {
      label: "Help & FAQs",
      option: "Help, FAQs, Privacy policy",
      icon: <Info size={22} />,
      link: "help",
    },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-y-auto">

      <HeaderBack label={"Settings"} />

      {/* Profile Header Card */}
      <div className="px-4 py-4">
        <div className="
          p-4 rounded-2xl
          bg-white/5 border border-white/10
          backdrop-blur-md
          text-center
        ">

          <img
            src={user?.picture || "/default/avatar.png"}
            className="
              w-28 h-28 mx-auto rounded-2xl
              border border-white/10
              shadow-[0_0_20px_rgba(34,211,238,0.2)]
              object-cover
            "
          />

          <h2 className="mt-3 text-white font-medium text-lg">
            {user?.name || "NAME"}
          </h2>

          <p className="text-white/40 text-xs">
            {user?.email}
          </p>

        </div>
      </div>

      {/* Settings Options */}
      <div className="px-4 space-y-2">

        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => dispatch(setCurrentState(item.link))}
            className="
              flex items-center gap-3
              px-4 py-3 rounded-xl
              bg-white/5 border border-white/10
              hover:border-cyan-400/30
              hover:bg-white/10
              hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]
              cursor-pointer
              transition
            "
          >

            <div className="text-cyan-400">
              {item.icon}
            </div>

            <div className="flex-1">
              <h3 className="text-white text-sm font-medium">
                {item.label}
              </h3>
              <p className="text-white/40 text-xs">
                {item.option}
              </p>
            </div>

          </div>
        ))}

        {/* Logout */}
        <div
          onClick={() => dispatch(logout())}
          className="
            flex items-center gap-3
            px-4 py-3 rounded-xl
            mt-4
            bg-red-500/10 border border-red-500/20
            hover:bg-red-500/20
            cursor-pointer
            transition
          "
        >
          <LogOut size={20} className="text-red-400" />

          <div>
            <h3 className="text-red-400 text-sm font-medium">
              Logout
            </h3>
          </div>
        </div>

      </div>

    </div>
  );
};