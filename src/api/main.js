import api from "./client";

export const getFeateredCountries = async () => {
    try {
        const response = await api.get('/featured');
        return response.data;
    } catch (err) {
        throw err;
    }
};