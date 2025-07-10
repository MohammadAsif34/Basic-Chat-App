import api from "./api";
import Cookie from "js-cookie";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZlOTkyOTRiZTIwYmE3MWM1MTE0M2YiLCJpYXQiOjE3NTIwOTEyMjAsImV4cCI6MTc1MjE3NzYyMH0.pc6XVIVzs2y8TMENYH8nqZUQIxxd7jsFNE5quEWVaaU";

export const getLogin = async ({ phone, password }) => {
  const res = await api.post("/auth/login", { phone, password });
  return res.data;
};

export const getRegister = async (fullname, phone, password) => {
  const res = await api.post("/auth/register", { fullname, phone, password });
  return res.data;
};

export const getLogout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const protect = async () => {
  const token = Cookie.get("chattoken");
  const res = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
