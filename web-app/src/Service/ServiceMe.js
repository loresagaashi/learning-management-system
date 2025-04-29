import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const getCurrentUser = () => {
  return api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
