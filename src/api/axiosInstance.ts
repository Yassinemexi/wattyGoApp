import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // modifie selon ton backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
