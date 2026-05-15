import Message from "../models/Message.model.js";

const onlineUsers = new Map();

export const socketInitilize = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket Connection Established: ", socket.id);

    socket.on("user_online", (userId) => {
      onlineUsers.set(userId, socket.id);

      const list = Array.from(onlineUsers.keys());

      io.emit("online_users", list);
      // console.log("user_online:", userId);
      // onlineUsers.set(userId, socket.id);

      // io.emit("online_users", Array.from(onlineUsers.keys()));
    });

    socket.on("join_chat", (chatId) => {
      socket.join(chatId.chatId);
      // console.log(`${socket.id} joined ${chatId.chatId}`);
    });

    socket.on("send_message", async (data) => {
      const { chatId, sender, message } = data;

      const savedMessage = await Message.create({
        chatId,
        sender,
        message,
      });
      console.log("message: ", savedMessage);
      io.to(data.chatId).emit("message_received", savedMessage);
    });

    socket.on("disconnect", () => {
      for (let [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      console.log("Disconnected:, ", socket.id);
    });
  });
};
