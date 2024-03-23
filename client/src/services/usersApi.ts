
import axios from "axios";
export const signup = async ({ name, email, password }) => {

    try {
        const response = await axios.post("http://localhost:5000/api/users/register", {
            name,
            email,
            password
        });
        return response.data;
    } catch (error: Error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message)
        }
    }

}

export const login = async ({ email, password }) => {


    try {
        const response = await axios.post("http://localhost:5000/api/users/login", {
            email, password
        })
        return response.data
    } catch (error: Error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error(error.message)
        }
    }

}

export const getUserProfile = async ({ token }: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get("http://localhost:5000/api/users/profile", config);
        return response.data
    } catch (error: Error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }

    }
}

export const updateProfile = async ({ token, userData }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put("http://localhost:5000/api/users/updateProfile", userData, config);
        return response.data;

    } catch (error: Error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error(error.message)
        }

    }
}