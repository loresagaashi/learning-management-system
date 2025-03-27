import axios from "axios";

const API_URL = "http://localhost:8080/api/chat";

export const getChatHistory = (senderId, recipientId) => {
  return axios.get(`${API_URL}/history`, {
    params: { senderId, recipientId }
  });
};

export const saveMessage = (senderId, recipientId, content) => {
  return axios.post(`${API_URL}/send`, {
    senderId,
    recipientId,
    content
  });
};
