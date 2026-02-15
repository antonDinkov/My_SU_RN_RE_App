import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.50.99:3005',
  timeout: 10000,
});

export default api;