import api from "./client";

export const getFeateredCountries = async () => {
    try {
        const response = await api.get('/featured');
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getSearchResults = async (text, type) => {
    try {
        const response = await api.get('/search', { params: { text, type } });
        return response.data.data;
    } catch (err) {
        throw err
    }
}