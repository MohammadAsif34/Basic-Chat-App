import React, { useEffect } from "react";
import { NoChat } from "../../components/ui/NoChat";
import SideSection from "../side-section/SideSection";
import {
  useAuth,
  useCurrentChat,
  useCurrentState,
} from "../../services/hooks/CustomHooks";
import { userAPI } from "../../services/api/userAPI";
import { useDispatch } from "react-redux";
import { setUser } from "../../services/slice/userSlice";
import ChatSection from "../chat-section/ChatSection";
import { socket } from "../../services/utils/socket";
import useResponsiveLayout from "../../services/utils/useResponsiveLayout";
import MobileLayout from "../../layout/MobileLayout";

const HomePage = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const isMobile = useResponsiveLayout();
  const { currentChat } = useCurrentChat();
  const { currentState } = useCurrentState();

  useEffect(() => {
    console.log("HomePage Loaded");
    const fetch = async () => {
      const { data } = await userAPI.fetchUser();
      console.log(data.message);
      if (data.success) {
        dispatch(setUser(data));
      }
    };

    const connectSocket = (token) => {
      socket.auth = { token };

      socket.connect();

      socket.on("connect", () => {
        console.log("Socket Connection Established:", socket.id);
      });
    };

    if (token) {
      fetch();
      connectSocket();
    }
  }, []);

  if (isMobile) return <MobileLayout />;

  return (
    <section className="h-screen flex bg-slate-950">
      <SideSection />

      {currentChat && currentState === "chat" ? <ChatSection /> : <NoChat />}
    </section>
  );
};

export default HomePage;
