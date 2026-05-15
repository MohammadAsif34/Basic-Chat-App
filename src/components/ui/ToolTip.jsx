export const ToolTip = ({ children, tooltip }) => {
  return (
    <div
      className="absolute bottom-0 left-[110%] px-3 py-1 bg-blue-500 text-white text-center rounded-md invisible opacity-0 
      group-hover:visible group-hover:opacity-100 group-hover:delay-300 pointer-events-none transition-all duration-500 ease-in-out"
      title={null}
    >
      {tooltip}
    </div>
  );
};
