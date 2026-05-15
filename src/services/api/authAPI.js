import axios from "axios";
import { apiClient } from "./apiClient";

export const authAPI = {
  login: (payload) => apiClient.post("/api/auth/login", payload),
  googleCallback: (payload) =>
    apiClient.post("/api/auth/google-callback", payload),
};
