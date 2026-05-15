import { useState } from "react";
import { HeaderBack } from "../ui/HeaderBack";
import axios from "axios";
import { useAuth, useUser } from "../../services/hooks/CustomHooks";
import { userAPI } from "../../services/api/userAPI";
import { setCurrentState } from "../../services/slice/currentStateSlice";

export const AddContact = () => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [list, SetList] = useState(null);

  console.log(list);
  const search = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id.length <= 3) {
        setMessage("invalid search");
        return;
      }
      const { data } = await userAPI.searchUser(id);
      console.log(data);
      if (data.success) {
        SetList(data.data);
        setMessage("");
      } else setMessage(data.message);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeaderBack label={"Add Contact"} />

      <form action="" className="px-4 flex flex-wrap gap-4" onSubmit={search}>
        <input
          type="text"
          name="id"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl bg-slate-100 outline-0 "
          placeholder="email..."
        />
        <button
          type="button"
          onClick={() => setCurrentState("contact")}
          className="grow h-10  border border-gray-300  rounded-xl"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-2/3 h-10  text-white bg-slate-400  rounded-xl"
        >
          Add Contact
        </button>
      </form>
      <div className="px-4 py-4 w-full h-full overflow-y-auto ">
        {loading ? (
          <div className="py-4 mt-8 text-center text-slate-500">
            <span className="inline-block w-8 h-8 border-4 border-slate-600 border-t-transparent rounded-full animate-spin"></span>
            <br />
            <p>searching</p>
          </div>
        ) : message != "" ? (
          <div className="mt-8">
            <img
              src="/default/avatar.png"
              alt=""
              className="w-32 mx-auto opacity-45"
            />
            <p className="text-center text-sm capitalize text-slate-400">
              {message}
            </p>
          </div>
        ) : (
          list && (
            <div>
              {list.map((i, idx) => (
                <UserCard key={idx} info={i} />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

const UserCard = ({ info }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { token } = useAuth();
  const { user } = useUser();

  const sendRequest = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await userAPI.sendRequest(info._id);
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
      <div className="px-4 py-2 bg-slate-100 rounded-xl flex justify-between items-center">
        <div className="flex-1 flex items-center gap-2">
          <img
            src={info?.picture || "/default/avatar.png"}
            alt=""
            className="w-16 h-16 rounded-xl overflow-hidden bg-cover bg-center"
          />
          <div>
            <p className="  text-xl font-semibold text-slate-500 truncate text-wrap line-clamp-1">
              {info.name}
            </p>
            <p className="text-sm text-slate-400">{info.email}</p>
          </div>
        </div>
        {user.email == info.email ? (
          ""
        ) : (
          <button
            onClick={sendRequest}
            className="float-end px-4 py-2 bg-slate-500 text-white rounded-xl disabled:cursor-not-allowed"
            disabled={false}
          >
            {loading ? "sending..." : message ? message : "send"}
          </button>
        )}
      </div>
    </>
  );
};
