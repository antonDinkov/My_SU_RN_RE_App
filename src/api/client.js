import axios from 'axios';

const api = axios.create({
    baseURL: 'https://travelfeverbe.onrender.com', //'http://localhost:3004' 'https://travelfeverbe.onrender.com',
    timeout: 120000,
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['X-Authorization'] = token;
    } else {
        delete api.defaults.headers.common['X-Authorization'];
    }
};

export default api;