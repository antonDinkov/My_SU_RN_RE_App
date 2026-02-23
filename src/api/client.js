import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3004',
    timeout: 10000,
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['X-Authorization'] = token;
    } else {
        delete api.defaults.headers.common['X-Authorization'];
    }
};

export default api;
