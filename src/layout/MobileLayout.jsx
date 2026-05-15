import React from "react";
import { ContactSection } from "../components/side-seciton-option/ContactSection";
import ChatSection from "../pages/chat-section/ChatSection";
import { useCurrentChat, useCurrentState } from "../services/hooks/CustomHooks";
import { SavedSection } from "../components/side-seciton-option/SavedSection";
import { StatusSection } from "../components/side-seciton-option/StatusSection";
import { ArchiveSection } from "../components/side-seciton-option/ArchiveSection";
import { SettingSection } from "../components/side-seciton-option/SettingSection";
import { AddContact } from "../components/side-seciton-option/AddContact";
import { Notifications } from "../components/side-seciton-option/Notifications";
import { Profile } from "../components/side-seciton-option/Profile";
import { Sidebar } from "../components/ui/Sidebar";

const MobileLayout = () => {
  const { currentState } = useCurrentState();
  const { currentChat } = useCurrentChat();

  return (
    <>
      <section className="flex h-screen">
        <Sidebar />

        <div className="w-full">
          {currentState == "contact" && <ContactSection />}
          {currentState == "chat" && currentChat && <ChatSection />}
          {currentState == "" && <ContactSection />}
          {currentState == undefined && <ContactSection />}
          {currentState == "saved" && <SavedSection />}
          {currentState == "status" && <StatusSection />}
          {currentState == "archive" && <ArchiveSection />}
          {currentState == "setting" && <SettingSection />}
          {currentState == "add-contact" && <AddContact />}
          {currentState == "notification" && <Notifications />}
          {currentState == "profile" && <Profile />}
        </div>
      </section>
    </>
  );
};

export default MobileLayout;
