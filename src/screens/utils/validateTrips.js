const name = (setErrors, name) => {
    let isValid = true;

    setErrors(prev => {
        const newErrors = { ...prev };

        if (!name.trim()) {
            newErrors.name = "Destination name is required";
            isValid = false;
        } else if (name.trim().length < 3) {
            newErrors.name = "Destination name must be at least 3 characters";
            isValid = false;
        } else {
            delete newErrors.name;
        }

        return newErrors;
    });

    return isValid;
};

const shortDescription = (setErrors, description) => {
    let isValid = true;

    setErrors(prev => {
        const newErrors = { ...prev };

        if (!description.trim()) {
            newErrors.short_description = "Description is required";
            isValid = false;
        } else if (description.trim().length < 10) {
            newErrors.short_description = "Description must be at least 10 characters";
            isValid = false;
        } else {
            delete newErrors.short_description;
        }

        return newErrors;
    });

    return isValid;
};

const type = (setErrors, type) => {
    let isValid = true;

    setErrors(prev => {
        const newErrors = { ...prev };

        if (!type) {
            newErrors.type = "Type is required";
            isValid = false;
        } else {
            delete newErrors.type;
        }

        return newErrors;
    });

    return isValid;
};

const image = (setErrors, image) => {
    let isValid = true;

    setErrors(prev => {
        const newErrors = { ...prev };

        if (!image) {
            newErrors.image = "Image is required";
            isValid = false;
        } else {
            delete newErrors.image;
        }

        return newErrors;
    });

    return isValid;
};


const createTrip = (setErrors, data) => {
    const results = [
        name(setErrors, data.name),
        shortDescription(setErrors, data.short_description),
        type(setErrors, data.type),
        image(setErrors, data.image),
    ];

    return results.every(Boolean);
};

const editTrip = (setErrors, data) => {
    const results = [
        name(setErrors, data.name),
        shortDescription(setErrors, data.short_description),
        type(setErrors, data.type),
        image(setErrors, data.image),   // 👈 добавяме image
    ];

    return results.every(Boolean);
};

export const validateTrip = {
    name,
    shortDescription,
    type,
    image,
    createTrip,
    editTrip,
};