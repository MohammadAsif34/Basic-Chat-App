import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "chats" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    type: { type: String, enum: ["text", "image", "file"], default: "text" },
    message: { type: String },
  },
  { timestamps: true },
);

const Message = mongoose.model("messages", messageSchema);
export default Message;
