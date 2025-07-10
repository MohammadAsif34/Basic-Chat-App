import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { protect } from "../services/authService";
import { UserContext } from "./CreateContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currChat, setCurrChat] = useState("");
  const [appKey, setAppKey] = useState(0);
  const [loading, setLoading] = useState(true); // ⏳ Used to prevent render before auth check

  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await protect();
        console.log("🔐 User Fetch:", data);

        if (data.status === "OK") {
          setUser(data.me);
        } else {
          setUser(null);
          console.warn("❌ Authorization failed");
        }
      } catch (error) {
        console.error("🚨 Error during auth check:", error);
        toast.error("Something went wrong. Please login again.");
      } finally {
        setLoading(false); // ✅ Always stop loading
      }
    };

    fetchUser();
  }, [appKey]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        loading,
        currChat,
        setCurrChat,
        appKey,
        setAppKey,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
