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
      console.log(data);

      if (data.success) {
        dispatch(updateProfile(data.data));
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!user.passwordVerified) {
        const { data } = await userAPI.newPassword({
          newPassword,
          repeatPassword,
        });
        if (data.success) {
          dispatch(verifyUser());
          toast.success(data.message);
        }
      } else {
        console.log(oldPassword, newPassword);
        const { data } = await userAPI.updatePassword({
          oldPassword,
          newPassword,
        });

        if (data.success) {
          dispatch(verifyUser());
          toast.success(data.message);
        } else toast.error(data.message);
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <>
      <div className=" w-full h-full px-4 overflow-y-auto">
        <HeaderBack label={"Profile"} />
        {/* update profile  */}
        <h2 className="text-gray-500 font-semibold font-mono text-xl border-b border-gray-300">
          Information
        </h2>
        <div className="px-8 py-4">
          <form action="">
            <div>
              <label htmlFor="bio" className="px-2 text-gray-400">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 mt-1 mb-3 text-gray-500 border border-slate-300 rounded-xl outline-0"
              />
            </div>
            <div>
              <label htmlFor="bio" className="px-2 text-gray-400">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={user?.email}
                disabled
                className="w-full h-10 px-3 mt-1 mb-3 text-gray-500 border border-slate-300 rounded-xl outline-0"
              />
            </div>
            <div>
              <label htmlFor="bio" className="px-2 text-gray-400">
                Bio
              </label>
              <input
                type="text"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full h-10 px-3 mt-1 mb-3 text-gray-500 border border-slate-300 rounded-xl outline-0"
                placeholder="Welcome ChatSphere"
              />
            </div>
            <div className="flex gap-4 justify-end mt-2">
              <button
                className="px-4 py-2 border rounded-xl text-blue-500 disabled:text-blue-300 disabled:cursor-default!"
                disabled
              >
                cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 bg-blue-500 rounded-xl text-white disabled:bg-blue-300 disabled:cursor-default!"
                // disabled
              >
                save
              </button>
            </div>
          </form>
        </div>

        {/* new password  */}
        <h2 className="text-gray-500 font-semibold font-mono text-xl border-b border-gray-300">
          Password Update
        </h2>
        <div className="px-8 py-4">
          <form action="">
            {user?.passwordVerified && (
              <div>
                <label htmlFor="bio" className="px-2 text-gray-400">
                  Old Password
                </label>
                <input
                  type="text"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full h-10 px-3 mt-1 mb-3 text-gray-500 border border-slate-300 rounded-xl outline-0"
                  placeholder="old password"
                />
              </div>
            )}
            <div>
              <label htmlFor="bio" className="px-2 text-gray-400">
                New Password
              </label>
              <input
                type="text"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-10 px-3 mt-1 mb-3 text-gray-500 border border-slate-300 rounded-xl outline-0"
                placeholder="new password"
              />
            </div>
            {!user?.passwordVerified && (
              <div>
                <label htmlFor="bio" className="px-2 text-gray-400">
                  Repeat Password
                </label>
                <input
                  type="text"
                  name="re"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="w-full h-10 px-3 mt-1 mb-3 text-gray-500 border border-slate-300 rounded-xl outline-0"
                  placeholder="repeat password"
                />
              </div>
            )}
            <div className="flex gap-4 justify-end mt-2">
              <button
                className="px-4 py-2 border rounded-xl text-blue-500 disabled:text-blue-300 disabled:cursor-default!"
                disabled
              >
                cancel
              </button>
              <button
                onClick={handlePasswordUpdate}
                className="px-4 py-2 bg-blue-500 rounded-xl text-white disabled:bg-blue-300 disabled:cursor-default!"
                // disabled
              >
                save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
