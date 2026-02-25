const email = (setErrors, email) => {
    let isValid = true;
    setErrors(prevErrors => {
        const newErrors = { ...prevErrors };

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (email.trim().length < 10) {
            newErrors.email = 'Email must be at least 10 characters';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        } else {
            delete newErrors.email;
            isValid = true;
        }
        return newErrors;
    });
    return isValid;
};

const password = (setErrors, password) => {
    let isValid = true;
    setErrors(prevErrors => {
        const newErrors = { ...prevErrors };

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else {
            if (password.length < 4) {
                newErrors.password = 'Password must be at least 4 characters';
                isValid = false;
            }/*  else if (!/[A-Z]/.test(password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = 'Password must contain at least one number';
      } */ else {
                delete newErrors.password;
                isValid = true;
            }
        }
        return newErrors;
    });
    return isValid;
};

const repeatPassword = (setErrors, password, repeatPassword) => {
    let isValid = true;
    setErrors(prevErrors => {
        const newErrors = { ...prevErrors };

        if (!repeatPassword) {
            newErrors.repeatPassword = 'Please repeat your password';
            isValid = false;
        } else if (repeatPassword !== password) {
            newErrors.repeatPassword = 'Passwords do not match';
            isValid = false;
        } else {
            delete newErrors.repeatPassword;
            isValid = true;
        }
        return newErrors;
    });
    return isValid;
};

const firstName = (setErrors, firstName) => {
    let isValid = true;
    setErrors(prevErrors => {
        const newErrors = { ...prevErrors };

        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required';
            isValid = false;
        } else if (firstName.trim().length < 4) {
            newErrors.firstName = 'First name must be at least 4 characters';
            isValid = false;
        } else {
            delete newErrors.firstName;
            isValid = true;
        }
        return newErrors;
    });
    return isValid;
};

const lastName = (setErrors, lastName) => {
    let isValid = true;
    setErrors(prevErrors => {
        const newErrors = { ...prevErrors };

        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            isValid = false;
        } else if (lastName.trim().length < 4) {
            newErrors.lastName = 'Last name must be at least 4 characters';
            isValid = false;
        } else {
            delete newErrors.lastName;
            isValid = true;
        }
        return newErrors;
    });
    return isValid;
};

const register = (setErrors, data) => {

    const results = [
        firstName(setErrors, data.firstName),
        lastName(setErrors, data.lastName),
        email(setErrors, data.email),
        password(setErrors, data.password),
        repeatPassword(setErrors, data.password, data.repeatPassword),
    ];

    return results.every(Boolean);
};

const login = (setErrors, data) => {
  const results = [
    email(setErrors, data.email),
    password(setErrors, data.password),
  ];

  return results.every(Boolean);
};


export const validate = {
    email,
    password,
    repeatPassword,
    firstName,
    lastName,
    register,
    login,
}