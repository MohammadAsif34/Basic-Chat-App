import { io } from "socket.io-client";

const socket = io("http://localhost:8800", {
  withCredentials: true,
  autoConnect: false,
});

export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.connect();
    socket.emit("join", userId);
  }
};

export const sendMessage = (data) => {
  socket.emit("send-message", data);
};

export const onReceiveMessage = (callback) => {
  socket.on("receive-message", callback);
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;
