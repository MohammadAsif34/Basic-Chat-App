export const Loader = ({ label = "" }) => {
  return (
    <>
      <div className="w-screen h-screen absolute top-0 left-0 bg-black/50 flex flex-col gap-2 justify-center items-center z-10">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white capitalize">{label}</p>
      </div>
    </>
  );
};

export const Loader2 = ({ label = "" }) => {
  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 text-slate-600 flex flex-col gap-2 justify-center items-center">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
        <p className=" capitalize">{label}</p>
      </div>
    </>
  );
};
