import { useState } from "react";
import { useUser } from "../../services/hooks/CustomHooks";
import { HeaderBack } from "../ui/HeaderBack";
import { userAPI } from "../../services/api/userAPI";
import { EllipsisVertical } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { acceptRequest, addContact } from "../../services/slice/userSlice";

export const Notifications = () => {
  return (
    <div className="h-full bg-linear-0-to-b from-slate-950 via-slate-900 to-slate-950">
      <HeaderBack label={"Notifications"} />

      <div className="w-full px-4 py-4 space-y-3">
        <ItemCard label={"Request Sent"} name="requestSent" type={"sent"} />
        <ItemCard
          label={"Request Received"}
          name="requestReceive"
          type={"receive"}
        />
      </div>
    </div>
  );
};
const ItemCard = ({ label, name, type }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
      rounded-xl border border-white/10
      bg-white/5 backdrop-blur-md
      overflow-hidden
    "
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="
          w-full px-4 py-3
          flex justify-between items-center
          text-left
          hover:bg-white/5
          transition
        "
      >
        <h2 className="text-white font-medium">{label}</h2>

        <span className="text-xs text-white/40">
          {user?.[name]?.length || 0} requests
        </span>
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2">
          {user?.[name]?.length > 0 ? (
            user[name].map((item, idx) => (
              <UserCard key={idx} info={item} type={type} />
            ))
          ) : (
            <p className="text-xs text-white/40 px-2 py-2">No requests found</p>
          )}
        </div>
      )}
    </div>
  );
};
const UserCard = ({ info, type }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAcceptRequest = async (e) => {
    try {
      e.preventDefault();
      if (type == "sent") return;
      setLoading(true);
      const { data } = await userAPI.acceptRequest(info._id);
      console.log(data);
      if (data.success) {
        dispatch(addContact(data.data));
        dispatch(acceptRequest(info._id));
        toast.success(data.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className=" flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30
      hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition "
    >
      {/* User info */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={info?.picture || "/default/avatar.png"}
          className="w-11 h-11 rounded-xl object-cover border border-white/10"
        />

        <div className="min-w-0">
          <p className="text-white text-sm font-medium truncate">
            {info.name}
            {type}
          </p>
          <p className="text-xs text-white/40 truncate">{info.email}</p>
        </div>
      </div>

      {/* Action */}
      {type == "sent" ? (
        <EllipsisVertical size={20} className="text-cyan-300 cursor-pointer " />
      ) : (
        <button
          onClick={handleAcceptRequest}
          disabled={loading}
          className=" px-3 py-1.5 rounded-lg text-xs font-medium bg-linear-to-r from-cyan-500 to-blue-500 text-white 
          hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] active:scale-95 transition "
        >
          {loading ? "..." : "Accept"}
        </button>
      )}
    </div>
  );
};
