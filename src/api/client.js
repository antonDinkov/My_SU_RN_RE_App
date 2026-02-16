import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3004',
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    const authData = await AsyncStorage.getItem('auth');

    if (authData) {
        const parsed = JSON.parse(authData);

        if (parsed.token) {
            config.headers['X-Authorization'] = parsed.token;
        }
    }

    return config;
});

export default api;
