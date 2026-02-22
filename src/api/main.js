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

export const addToFavorites = async (userId, itemId, type) => {
    try {
        const response = await api.post('/favorites', { userId, itemId, itemModel: type });
        return response.data;
    } catch (err) {
        throw err
    }
}

export const isItFavorite = async (userId, itemId) => {
    try {
        const response = await api.get('/favorites', { params: { typeRequest: 'getOne', userId, itemId } });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getFavorites = async (userId) => {
    try {
        const response = await api.get('/favorites', { params: { typeRequest: 'getAll', userId } });
        return response.data;
    } catch (err) {
        throw err;
    }
}