import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    password: { type: String, default: null, select: false },
    passwordVerified: { type: Boolean, default: false },
    picture: { type: String, required: true, default: "/default/avatar.png" },
    lastMessage: {
      type: String,
      default: "Welcome to My ChatApp 😊😊 ._.",
    },
    lastSeen: { type: String },
    lastMessageTime: { type: String, default: "" },
    unreadMessage: { type: Number, default: 0 },
    email_verified: { type: Boolean, default: false },
    method: {
      type: String,
      enum: ["local", "google"],
      default: "local",
      select: false,
    },
    sub: { type: String, default: null, select: false },
    requestSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    requestReceive: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true },
);

const User = mongoose.model("users", userSchema);
export default User;
