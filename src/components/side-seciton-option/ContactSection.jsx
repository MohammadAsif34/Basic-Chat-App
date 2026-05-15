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
  const { contacts } = useUser();

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="px-4 py-5 flex justify-between items-center border-b border-white/10">
        <Link to={"/"} className="text-white">
          <Brand />
        </Link>

        <div className="flex items-center gap-5 text-cyan-300">
          <button
            onClick={() => dispatch(setCurrentState("add-contact"))}
            className="p-2 rounded-xl hover:bg-white/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition"
          >
            <MessageSquarePlus size={20} />
          </button>

          <button className="p-2 rounded-xl hover:bg-white/10 transition">
            <EllipsisVertical size={20} />
          </button>
        </div>
      </header>

      {/* Search */}
      <div className="p-4">
        <div
          className="h-11 rounded-xl 
          bg-white/5 border border-white/10
          backdrop-blur-md flex items-center text-white/70
          focus-within:border-cyan-400/40
          focus-within:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        >
          <Search size={18} className="mx-3 text-cyan-300" />

          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full h-full bg-transparent outline-none text-sm text-white placeholder:text-white/30"
          />
        </div>
      </div>

      {/* Contacts */}
      {contacts?.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-white/40">
          <Users
            size={50}
            className="text-cyan-400 mb-3 drop-shadow-[0_0_10px_rgba(34,211,238,0.25)]"
          />
          <p className="text-sm tracking-wide">No contacts yet</p>
        </div>
      ) : (
        <div className="flex-1 px-2 flex flex-col gap-3 overflow-y-auto scroll-custom">
          {contacts?.map((contact, idx) => (
            <ContactCard key={idx} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
};
