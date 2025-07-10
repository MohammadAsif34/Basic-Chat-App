import React, { useEffect, useState } from "react";
// import { contacts } from "../../datasets/contacts.js";
import ContactCard from "./ContactCard";
import { addContact, getContact } from "../../services/userService.js";
import { useUser } from "../../context/CreateContext.jsx";
import { toast } from "react-toastify";
import { getLogout } from "../../services/authService.js";

const ContactsSection = () => {
  const { user } = useUser();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContact();
        setContacts(data.contact);
      } catch (err) {
        console.log("Error fetching contact :: ", err);
      }
    };
    fetchContact();
  }, []);

  return (
    <div className="w-full h-full flex flex-col  overflow-x-hidden ">
      <div>
        <Header />
        <SearchSection />
      </div>
      <div className="overflow-x-hidden overflow-y-auto">
        {contacts?.map((item, idx) => (
          <ContactCard key={idx} item={item} />
        ))}
        <div className="p-4 whitespace-wrap">
          _id: {user?._id} <br />
          FullName: {user?.fullname} <br />
          Phone: {user?.phone}
        </div>
      </div>
    </div>
  );
};

export default ContactsSection;

const SearchSection = () => {
  const [addContact, setAddContact] = useState(false);
  return (
    <>
      <div className="h-14 px-4 border-b border-neutral-700 flex justify-between items-center">
        <div className="w-full text-xs flex gap-x-5">
          <input
            type="text"
            className="w-full h-8 px-4 border border-neutral-700 rounded-sm"
            placeholder="search"
          />
          <button
            className=" px-4 py-1 text-xs border border-neutral-700 rounded-sm whitespace-nowrap cursor-pointer"
            onClick={() => setAddContact((prev) => !prev)}
          >
            + Add
          </button>
          {addContact && <AddContact toggle={setAddContact} />}
        </div>
      </div>
    </>
  );
};
const Header = () => {
  const { setAppKey } = useUser();
  const handleLogout = async () => {
    const res = await getLogout();
    if (res.status == "OK") {
      console.log("logoutsuccess ::", res.message);
      toast.success(res.message);
      setTimeout(() => {
        setAppKey((p) => p + 1);
      }, 100);
    }
  };
  return (
    <>
      <div className="h-18 px-4 border-b border-neutral-700 flex justify-between items-center">
        <div>ChatSy</div>
        <div
          className="border px-2 text-xs rounded-sm cursor-pointer"
          onClick={() => setAppKey((p) => p + 1)}
        >
          re-render
        </div>
        <button onClick={() => handleLogout()}>logout</button>
        <div className="max-w-10 min-w-10 h-10 bg-neutral-700 rounded-full overflow-hidden">
          <img
            src="/avatar-img.png"
            alt="profile picture"
            loading="lazy"
            className="w-full h-full object-center object-cover"
          />
        </div>
      </div>
    </>
  );
};

const AddContact = ({ toggle }) => {
  const [phone, setPhone] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (phone.length == 10) {
      const res = await addContact({ phone });

      console.log(res);
      toast.success(res.message);
      setPhone("");
    } else {
      toast.warn("incorrect phone number");
    }
  };
  return (
    <>
      <div className="w-full h-screen  bg-black/60 fixed top-0 left-0  flex justify-center items-center">
        <div className="w-1/3  p-8 bg-neutral-800 rounded-xl relative">
          <span
            className="px-2 text-xl absolute -top-10 -right-10 cursor-pointer"
            onClick={() => toggle(false)}
          >
            X
          </span>
          <form className="flex gap-x-4" onSubmit={handleSearch}>
            <input
              type="number"
              minLength={10}
              maxLength={10}
              className="w-full h-10 px-4 text-lg border border-neutral-600 rounded-lg"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className="px-4 bg-neutral-900 border border-neutral-600 rounded-lg cursor-pointer">
              Search
            </button>
          </form>
          {/* <div className="mt-4 p-2  w-full bg-neutral-900 border border-neutral-700 rounded-xl flex justify-between">
            <p className="px-2 text-lg">7250761747</p>
            <button className="px-2 text-shadow-amber-200 bg-neutral-700 rounded-md">
              Add To Chat
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};
