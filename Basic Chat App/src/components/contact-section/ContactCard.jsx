import React from "react";
import { useUser } from "../../context/CreateContext";

const ContactCard = ({ item }) => {
  const { setCurrChat } = useUser();

  const textPicture = (name) => {
    if (!name) return "A";
    const n = name.trim().split(" ");
    const f = n[0]?.charAt(0).toUpperCase();
    const s = n[1]?.charAt(0).toUpperCase();
    return f + s;
  };
  return (
    <div
      className="w-full h-20 px-4 border-y border-neutral-700 flex gap-x-4 items-center"
      onClick={() => setCurrChat(item._id)}
    >
      <div className="max-w-14 min-w-14 h-14 bg-neutral-700 rounded-full overflow-hidden">
        {item.picture ? (
          <img
            src="/avatar-img.png"
            alt="profile picture"
            loading="lazy"
            className="w-full h-full object-center object-cover"
          />
        ) : (
          <div className="w-full h-full text-xl capitalize flex justify-center items-center ">
            {textPicture(item?.fullname)}
          </div>
        )}
      </div>
      <div className=" w-full">
        <div className="w-3/4 ">
          <h1 className="w-4/5 whitespace-nowrap overflow-hidden truncate">
            {item?.fullname}
          </h1>
          <p className="text-xs text-neutral-500 whitespace-nowrap overflow-hidden truncate">
            this is last messagethis is last messagethis is last messagethis is
            last message this is last message
          </p>
        </div>
        <div className=" text-xs text-neutral-400"></div>
      </div>
    </div>
  );
};

export default ContactCard;
