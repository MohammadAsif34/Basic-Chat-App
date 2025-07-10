import { useUser } from "../context/CreateContext";
import { Navigate } from "react-router-dom";
import ContactsSection from "../components/contact-section/ContactsSection";
import ChatsSection from "../components/chats/ChatsSection";
import NoChat from "../components/home/NoChat";

const Home = () => {
  const { currChat, isAuthenticated, loading } = useUser();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-lg text-neutral-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <section className="w-full h-screen px-10 flex justify-center items-center ">
      <div className="w-[1200px] h-[600px] max-lg:h-[675px] border border-neutral-700 rounded-xl flex shadow-xl overflow-hidden ">
        <div className="w-[400px] h-full border-r border-neutral-700 overflow-hidden max-lg:hidden">
          <ContactsSection />
        </div>
        <div className="flex-1">
          {currChat === "" ? <NoChat /> : <ChatsSection />}
        </div>
      </div>
    </section>
  );
};

export default Home;
