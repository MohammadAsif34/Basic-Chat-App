import { apiClient } from "./apiClient";

export const userAPI = {
  fetchUser: () => apiClient.get("/api/user"),
  searchUser: (email) => apiClient.get(`/api/user/search?email=${email}`),
  sendRequest: (id) => apiClient.post(`/api/user/request/${id}`),
  acceptRequest: (id) => apiClient.post(`/api/user/accept/${id}`),
  updateProfile: (payload) => apiClient.put("/api/user", payload),
  newPassword: (payload) => apiClient.post("/api/user/password", payload),
  updatePassword: (payload) => apiClient.put("/api/user/password", payload),

  chatFetch: (chatId) => apiClient.get(`/api/user/messages/${chatId}`),
  chatDelete: (chatId) => apiClient.delete(`api/user/${chatId}`),
};
