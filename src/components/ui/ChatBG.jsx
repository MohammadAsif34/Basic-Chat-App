export const ChatBG = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* 🔵 Animated gradient background */}
      <div
        className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-black bg-size-[200%_200%]"
        style={{
          animation: "bgMove 25s ease-in-out infinite",
        }}
      />

      {/* ✨ Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />

      {/* 🌊 Floating glow blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 blur-[120px] opacity-20 animate-pulse" />

      {/* 💬 Chat container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <h1 className="text-lg font-semibold mb-3">Chat UI</h1>

          <div className="space-y-3">
            <div className="bg-white/10 p-3 rounded-lg w-fit max-w-xs">
              Hello 👋
            </div>

            <div className="bg-blue-500/20 p-3 rounded-lg w-fit ml-auto max-w-xs">
              Hi! This looks live ✨
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <input
              className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 outline-none"
              placeholder="Type a message..."
            />
            <button className="bg-blue-500 px-4 rounded-lg hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
