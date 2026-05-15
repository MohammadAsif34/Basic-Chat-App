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
      socket.auth = { token }; // if using JWT later

      socket.connect();

      socket.on("connect", () => {
        console.log("web_socket_online");
      });
    };

    if (token) {
      fetch();
      connectSocket();
    }
  }, []);

  const { currentChat } = useCurrentChat();
  const { currentState } = useCurrentState();

  const isMobile = useResponsiveLayout();
  console.log("ENV");
  console.log("1:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
  console.log("2:", import.meta.env.VITE_URL);

  return (
    <>
      {isMobile ? (
        <>
          <MobileLayout />
        </>
      ) : (
        <section className=" h-screen flex">
          <SideSection />
          {currentChat && currentState == "chat" ? <ChatSection /> : <NoChat />}
        </section>
      )}
    </>
  );
};

export default HomePage;
