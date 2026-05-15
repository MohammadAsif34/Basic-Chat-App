import { useState } from "react";
import { useAuth, useUser } from "../../services/hooks/CustomHooks";
import { HeaderBack } from "../ui/HeaderBack";
import axios from "axios";
import { userAPI } from "../../services/api/userAPI";

export const Notifications = () => {
  return (
    <>
      <HeaderBack label={"Notifications"} />
      <div className="w-full  px-4 ">
        <ItemCard label={"Request Sent"} name="requestSent" />
        <ItemCard label={"Request Receive"} name="requestReceive" />
      </div>
    </>
  );
};

const ItemCard = ({ label, name }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="py-4 border-b border-gray-200">
        <h2
          className="font-semibold text-slate-500"
          onClick={() => setOpen((p) => !p)}
        >
          {label}
          <span className="font-normal float-end text-sm">
            {user[name]?.length} request
          </span>
        </h2>
        {open && (
          <div className="py-4 px-4">
            {user[name].map((item, idx) => (
              <UserCard key={idx} info={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const UserCard = ({ info }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { token } = useAuth();

  const sendRequest = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const { data } = userAPI.acceptRequest(info._id);
      console.log(data);
      if (data.success) {
        if (data.message) {
          return setMessage(data.message);
        }
        setMessage(null);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="px-4 py-2 my-2 bg-slate-100 rounded-xl flex justify-between items-center">
        <div className="flex-1 flex items-center gap-2">
          <img
            src={info?.picture || "/default/avatar.png"}
            alt=""
            className="w-16 h-14 rounded-xl overflow-hidden bg-cover bg-center"
          />
          <div>
            <p className=" flex-1 text-md font-semibold text-slate-500 truncate">
              {info.name}
            </p>
            <p className="text-sm text-slate-400">{info.email}</p>
          </div>
        </div>
        <button
          onClick={sendRequest}
          className="float-end px-4 py-2 bg-slate-500 text-white rounded-xl"
        >
          Accept
        </button>
      </div>
    </>
  );
};
