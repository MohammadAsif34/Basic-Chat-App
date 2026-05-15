import React from "react";
import { useCurrentState } from "../../services/hooks/CustomHooks";
import { ContactSection } from "../../components/side-seciton-option/ContactSection";
import { SavedSection } from "../../components/side-seciton-option/SavedSection";
import { StatusSection } from "../../components/side-seciton-option/StatusSection";
import { ArchiveSection } from "../../components/side-seciton-option/ArchiveSection";
import { SettingSection } from "../../components/side-seciton-option/SettingSection";
import { Notifications } from "../../components/side-seciton-option/Notifications";
import { AddContact } from "../../components/side-seciton-option/AddContact";
import { Profile } from "../../components/side-seciton-option/Profile";
import { Sidebar } from "../../components/ui/Sidebar";

const SideSection = () => {
  const { currentState } = useCurrentState();
  return (
    <>
      <section className="flex min-w-lg:border sm:w-100 md:w-120 lg:w-150 ">
        <Sidebar />

        <div className="w-md min-w-sm max-w-md">
          {currentState == "contact" && <ContactSection />}
          {currentState == "chat" && <ContactSection />}
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

export default SideSection;
