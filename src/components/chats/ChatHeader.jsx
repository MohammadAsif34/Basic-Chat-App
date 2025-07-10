const ChatHeader = ({ currContact }) => {
  const textPicture = (name) => {
    if (!name) return "A";
    const n = name.trim().split(" ");
    const f = n[0]?.charAt(0).toUpperCase();
    const s = n[1]?.charAt(0).toUpperCase();
    return f + s;
  };

  return (
    <>
      <div className="h-18 px-4 border-b border-neutral-700 flex justify-between items-center">
        <div className="flex-1 flex gap-x-4 items-center">
          <div className="max-w-10 min-w-10 h-10 bg-neutral-700 rounded-full overflow-hidden">
            {currContact?.picture ? (
              <img
                src="/avatar-img.png"
                alt="profile picture"
                loading="lazy"
                className="w-full h-full object-center object-cover"
              />
            ) : (
              <div className="w-full h-full text-lg capitalize flex justify-center items-center ">
                {textPicture(currContact?.fullname)}
              </div>
            )}
          </div>
          <div>
            <p>{currContact?.fullname}</p>
          </div>
        </div>
        <div className=" "></div>
      </div>
    </>
  );
};
export default ChatHeader;
