import { useContext } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};
