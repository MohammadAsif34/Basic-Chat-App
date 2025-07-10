import api from "./api";
import Cookie from "js-cookie";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZlOTkyOTRiZTIwYmE3MWM1MTE0M2YiLCJpYXQiOjE3NTIwOTEyMjAsImV4cCI6MTc1MjE3NzYyMH0.pc6XVIVzs2y8TMENYH8nqZUQIxxd7jsFNE5quEWVaaU";

//get all contact of curr user - DONE  //  token*
export const getContact = async () => {
  const token = Cookie.get("chattoken");
  const res = await api.get("user/me/contact", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
// get user info - DONE
export const userInfo = async (userId) => {
  const res = await api.get(`/user/${userId}`);
  return res.data;
};

// add contact - DONE
export const addContact = async ({ phone }) => {
  const token = Cookie.get("chattoken");
  // console.log(phone);
  const res = await api.post(
    "/user/me/add-contact",
    { phone },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// get all msg -
export const getChat = async ({ senderId, receiverId }) => {
  const res = await api.get(`/chat/${senderId}/${receiverId}`);
  return res.data;
};

//set msg -
export const setChat = async (msg) => {
  console.log(msg);
  const res = await api.post("/chat", msg);
  return res.data;
};
