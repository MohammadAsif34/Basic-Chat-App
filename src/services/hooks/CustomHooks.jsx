import { useDispatch, useSelector } from "react-redux";

export const useSelect = (name) => {
  const state = useSelector((s) => s[name]);
  return state;
};

export const usePatch = (func) => {
  const dispatch = useDispatch();
  dispatch(func);
  return;
};

export const useAuth = () => {
  const auth = useSelect("auth");
  return auth;
};

export const useUser = () => {
  const user = useSelector((s) => s.user);
  return user;
};

export const useCurrentState = () => {
  const state = useSelector((s) => s.state);
  return state;
};
export const useCurrentChat = () => {
  const chat = useSelector((s) => s.currentChat);
  return chat;
};
