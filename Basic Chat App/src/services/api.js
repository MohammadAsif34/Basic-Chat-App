import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8800/api4/chat/v1/",
  withCredentials: true,
});
export default api;
