import { useState } from "react";
import { HeaderBack } from "../ui/HeaderBack";
import axios from "axios";
import { useAuth, useUser } from "../../services/hooks/CustomHooks";
import { userAPI } from "../../services/api/userAPI";
import { setCurrentState } from "../../services/slice/currentStateSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { sentRequest } from "../../services/slice/userSlice";
import { socket } from "../../services/utils/socket";

export const AddContact = () => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [list, setList] = useState(null);

  const dispatch = useDispatch();

  const search = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id.length <= 3) {
        setMessage("Enter valid email or id");
        return;
      }
      const { data } = await userAPI.searchUser(id);
      if (data.success) {
        setList(data.data);
        setMessage("");
      } else {
        setMessage(data.message);
        setList(null);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <HeaderBack label={"Add Contact"} />

      {/* Search Box */}
      <form onSubmit={search} className="px-4 pt-4 flex gap-3">
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Search by email or id..."
          className="
            flex-1 h-11 px-4 rounded-xl
            bg-white/5 border border-white/10
            text-white placeholder:text-white/30
            outline-none
            focus:border-cyan-400/40
            focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]
            transition
          "
        />

        <button
          type="submit"
          className="
            px-4 h-11 rounded-xl
            bg-gradient-to-r from-cyan-500 to-blue-500
            text-white font-medium
            hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]
            active:scale-95
            transition
          "
        >
          Search
        </button>
      </form>

      {/* Body */}
      <div className="px-4 py-5">
        {/* Loading */}
        {loading && (
          <div className="text-center text-white/50 mt-10">
            <div className="w-8 h-8 mx-auto border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <p className="mt-2 text-sm">Searching...</p>
          </div>
        )}

        {/* Message */}
        {!loading && message && (
          <div className="text-center text-white/40 mt-10">
            <p className="text-sm">{message}</p>
          </div>
        )}

        {/* Results */}
        {!loading && list && (
          <div className="space-y-3 mt-4">
            {list.map((i, idx) => (
              <UserCard key={idx} info={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
const UserCard = ({ info }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const { user } = useUser();
  const dispatch = useDispatch();

  const sendRequest = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(info);
      socket.emit("send_friend_request", {
        senderId: user._id,
        receiverId: info._id,
      });
      const { data } = await userAPI.sendRequest(info._id);
      if (data.success) {
        setMessage("Sent");
        dispatch(sentRequest(info));
        toast.success(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isSelf = user?.email === info.email;

  return (
    <div
      className="
      flex items-center justify-between
      px-3 py-3 rounded-xl
      bg-white/5 border border-white/10
      hover:border-cyan-400/30
      hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]
      transition
    "
    >
      {/* Info */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={info?.picture || "/default/avatar.png"}
          className="w-12 h-12 rounded-xl object-cover border border-white/10"
        />

        <div className="min-w-0">
          <p className="text-white font-medium truncate">{info.name}</p>
          <p className="text-xs text-white/40 truncate">{info.email}</p>
        </div>
      </div>

      {/* Action */}
      {!isSelf && (
        <button
          onClick={sendRequest}
          disabled={loading}
          className="
            px-3 py-1.5 rounded-lg text-xs font-medium
            bg-gradient-to-r from-cyan-500 to-blue-500
            text-white
            hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]
            active:scale-95
            transition
          "
        >
          {loading ? "..." : message ? message : "Add"}
        </button>
      )}

      {isSelf && <span className="text-xs text-white/30">You</span>}
    </div>
  );
};
