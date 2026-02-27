import api from "./client";

export const createTrip = async (tripInfo) => {
    try {
        const formData = new FormData();

        formData.append("type", tripInfo.type);
        formData.append("name", tripInfo.name);
        formData.append("short_description", tripInfo.short_description);
        formData.append("location_name", tripInfo.location_name);
        formData.append("location", JSON.stringify(tripInfo.location));

        formData.append("image", {
            uri: tripInfo.image,
            type: "image/jpeg",
            name: "trip.jpg"
        });

        const response = await api.post('/mytrips/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(response.data);
        

        return response.data;
    } catch (err) {
        console.log("Thih is the error from the trips service catched", err.response.data);
        throw err;
    }
};

export const getMyTrips = async () => {
    try {
        const response = await api.get('/mytrips');

        console.log("This is my trips response:", response.data);

        return response.data;

    } catch (err) {
        console.log(
            "This is the getMyTrips error:",
            err.response?.data
        );
        throw err;
    }
};