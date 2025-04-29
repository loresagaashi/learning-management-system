import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8080',
});
export const getChatHistory = (senderId, recipientId) => {
  const params = new URLSearchParams();
  params.append('senderId', senderId);  // Explicitly append
  params.append('recipientId', recipientId);

  return api.get(`/api/chat/history`, {
    params: params,  // Pass URLSearchParams instead of object
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
export const sendChatMessage = (message) => {
  return api.post(`/api/chat/send`, message, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const markMessagesAsRead = (senderId, recipientId) => {
  return api.post(`/api/chat/mark-as-read`, {
    senderId,
    recipientId
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
