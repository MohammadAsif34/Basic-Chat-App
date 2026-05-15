import { useDispatch } from "react-redux";
import { setCurrentState } from "../../services/slice/currentStateSlice.js";
import {
  EllipsisVertical,
  MessageSquarePlus,
  Search,
  User,
  Users,
} from "lucide-react";
import { ContactCard } from "../ui/ContactCard.jsx";
import { Link } from "react-router-dom";
import { useUser } from "../../services/hooks/CustomHooks.jsx";
import Brand from "../ui/Brand.jsx";

export const ContactSection = () => {
  const dispatch = useDispatch();
  const { contacts, user } = useUser();
  return (
    <>
      <div className=" h-full flex flex-col">
        {/* header section  */}
        <header className=" px-4 py-5 flex justify-between">
          <Link to={"/"} className="text-slate-500 font-normal text-2xl">
            <Brand />
          </Link>
          <div className="flex items-center gap-6 text-blue-600">
            <button
              className=""
              onClick={() => dispatch(setCurrentState("add-contact"))}
            >
              <MessageSquarePlus size={20} />
            </button>
            <button>
              <EllipsisVertical size={20} />
            </button>
          </div>
        </header>

        {/* search section  */}
        <div className="p-4">
          <div className="h-10 rounded-xl bg-blue-50 overflow-hidden flex items-center text-slate-600">
            <Search size={18} className="mx-3 " />
            <input
              type="text"
              name=""
              id=""
              className="w-full h-full outline-0"
              placeholder="Search..."
            />
          </div>
        </div>

        {contacts == 0 ? (
          <div className="mx-auto my-8 text-center text-slate-400 cursor-default">
            <Users size={50} className="mx-auto" />
            <p className="capitalize italic">no contacts</p>
          </div>
        ) : (
          // {/* contact list  */}
          <div className=" flex-1 px-2 flex flex-col gap-3 overflow-y-auto scroll-custom">
            {contacts?.map((contact, idx) => (
              <ContactCard key={idx} contact={contact} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
