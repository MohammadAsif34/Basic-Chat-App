import { useUser } from "../../services/hooks/CustomHooks";
import { HeaderBack } from "../ui/HeaderBack";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateProfile, verifyUser } from "../../services/slice/userSlice.js";
import { useState } from "react";
import { userAPI } from "../../services/api/userAPI.js";
export const Profile = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const { data } = await userAPI.updateProfile({ name, bio });

      if (data.success) {
        dispatch(updateProfile(data.data));
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      let data;

      if (!user.passwordVerified) {
        data = await userAPI.newPassword({ newPassword, repeatPassword });
      } else {
        data = await userAPI.updatePassword(oldPassword, newPassword);
      }

      if (data.success) {
        dispatch(verifyUser());
        toast.success(data.message);
      } else {
        console.log(data);
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.messsage || err.message);
    }
  };

  return (
    <div className="w-full h-full bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 overflow-y-auto">
      <HeaderBack label={"Profile"} />

      {/* PROFILE INFO */}
      <Section title="Information">
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <Input label="Name" value={name} onChange={setName} />

          <Input label="Email" value={user.email} disabled />

          <Input label="Bio" value={bio} onChange={setBio} />

          <ActionRow />
        </form>
      </Section>

      {/* PASSWORD */}
      <Section title="Password Update">
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          {user?.passwordVerified && (
            <Input
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={setOldPassword}
            />
          )}

          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={setNewPassword}
          />

          {!user?.passwordVerified && (
            <Input
              label="Repeat Password"
              type="password"
              value={repeatPassword}
              onChange={setRepeatPassword}
            />
          )}

          <ActionRow />
        </form>
      </Section>
    </div>
  );
};
const Section = ({ title, children }) => (
  <div className="px-4 py-5">
    <h2 className="text-white/60 text-sm font-medium mb-3 tracking-wider">
      {title}
    </h2>

    <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
      {children}
    </div>
  </div>
);
const Input = ({ label, value, onChange, disabled, type = "text" }) => (
  <div>
    <label className="text-white/50 text-xs px-1">{label}</label>

    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className="
        w-full h-11 px-3 mt-1
        rounded-xl
        bg-white/5 border border-white/10
        text-white
        placeholder:text-white/30
        outline-none
        focus:border-cyan-400/40
        focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]
        transition
        disabled:opacity-50
      "
    />
  </div>
);
const ActionRow = () => (
  <div className="flex justify-end gap-3 pt-2">
    <button
      type="button"
      className="
        px-4 py-2 rounded-xl text-xs
        border border-white/10
        text-white/50
        hover:bg-white/5
        transition
      "
    >
      Cancel
    </button>

    <button
      type="submit"
      className="
        px-4 py-2 rounded-xl text-xs font-medium
        bg-gradient-to-r from-cyan-500 to-blue-500
        text-white
        hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
        active:scale-95
        transition
      "
    >
      Save
    </button>
  </div>
);
