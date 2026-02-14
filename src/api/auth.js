import api from './client';

export const login = async (email, password, lat, lng) => {
    const response = await api.post(
        '/login',
        { email, password },
        {
            headers: {
                'x-user-lat': lat,
                'x-user-lng': lng,
            },
        }
    );
    console.log("inside the service");
    console.log(response.data.user);
    console.log(response.data.token);
    
    return {
        user: response.data.user,
        token: response.data.token,
    };
};

export const register = (data) => {
    return api.post('/register', data);
};

export const logout = async () => {
    const response = await api.get('/logout');
    
    return response
};
