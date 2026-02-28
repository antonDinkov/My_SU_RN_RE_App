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
    try {
        const response = await api.post('/register',
            { firstName, lastName, email, password, repass: repeatPassword },
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
        console.log("REGISTER ERROR:");
        console.log("Message:", err.message);
        console.log("Response:", err.response?.data);
        console.log("Status:", err.response?.status);
        throw err;
    }
};

export const logout = async () => {
    try {
        const response = await api.get('/logout');

        return response
    } catch (err) {
        console.log("LOGOUT ERROR:");
        console.log("Message:", err.message);
        console.log("Response:", err.response?.data);
        console.log("Status:", err.response?.status);
        throw err;
    }
};


export const updateProfile = async (profileData) => {
    try {
        const formData = new FormData();

        if (profileData.firstName) {
            formData.append("firstName", profileData.firstName);
        }

        if (profileData.lastName) {
            formData.append("lastName", profileData.lastName);
        }

        if (profileData.email) {
            formData.append("email", profileData.email);
        }

        // ако искаме да махнем снимката
        if (profileData.removePicture) {
            formData.append("removePicture" ?? false);
        }

        // ако има нова снимка
        if (profileData.image) {
            formData.append("image", {
                uri: profileData.image,
                type: "image/jpeg",
                name: "profile.jpg"
            });
        }

        const response = await api.put(
            `/profile/edit`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;

    } catch (err) {
        console.log(
            "This is the updateProfile error:",
            err.response?.data
        );
        throw err;
    }
};