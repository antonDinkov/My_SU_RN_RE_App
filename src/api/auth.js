import api from './client';

export const login = async (email, password, lat, lng) => {
    try {
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
        return {
            user: response.data.user,
            token: response.data.token,
        };

    } catch (err) {
        console.log("LOGIN ERROR:");
        console.log("Message:", err.message);
        console.log("Response:", err.response?.data);
        console.log("Status:", err.response?.status);
        throw err;
    }
};


export const register = async (firstName, lastName, email, password, repeatPassword, lat, lng) => {
    const response = await api.post('/register',
        {firstName, lastName, email, password, repass: repeatPassword},
        {
            headers: {
                'x-user-lat': lat,
                'x-user-lng': lng,
            },
        }
    );

    return {
        user: response.data.user,
        token: response.data.token,
    };
};

export const logout = async () => {
    const response = await api.get('/logout');
    
    return response
};
