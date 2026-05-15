import mongoose from "mongoose";
const chatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    type: { type: String, enum: ["private", "group"], default: "private" },
    block: { type: Boolean, default: false },
    blockBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true },
);

const Chat = mongoose.model("chats", chatSchema);
export default Chat;
