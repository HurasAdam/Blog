import * as types from "../types/index"
import axios, { AxiosResponse } from "axios";

export const signup = async ({ name, email, password }: types.IRegisterFormData) => {

    try {
        const response = await axios.post("http://localhost:5000/api/users/register", {
            name,
            email,
            password
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw new Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw new Error("An unexpected error occurred")
        }
    }
}

export const login = async ({ email, password }: types.ILoginFormData): Promise<AxiosResponse<types.IUserInfo>> => {

    try {
        const response = await axios.post("http://localhost:5000/api/users/login", {
            email, password
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw new Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw new Error("An unexpected error occurred")
        }
    }
}

export const getUserProfile = async ({ token }: types.IToken): Promise<AxiosResponse<types.IProfileResponse>> => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get("http://localhost:5000/api/users/profile", config);
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw new Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw new Error("An unexpected error occurred")
        }
    }
}

export const updateProfile = async ({ token, userData }: types.IUpdateProfileFormData): Promise<AxiosResponse<types.IUserInfo>> => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put("http://localhost:5000/api/users/updateProfile", userData, config);
        return response.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw new Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw new Error("An unexpected error occurred")
        }
    }
}

export const updateProfilePicture = async ({ token, formData }: types.IUpdateProfilePictureFormData): Promise<AxiosResponse<types.IUserInfo>> => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(
            "http://localhost:5000/api/users/updateProfileAvatar",
            formData,
            config
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw new Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw new Error("An unexpected error occurred")
        }
    }
};