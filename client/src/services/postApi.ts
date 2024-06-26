import axios from "axios";

export const getAllPosts = async ({ searchKeyword = "", page = 1, category = [], limit = 10 }) => {
    try {


        const { data, headers } = await axios.get(
            `http://localhost:5000/api/posts?searchKeyword=${searchKeyword}&category=${category}&page=${page}&limit=${limit}`
        );
        return { data, headers };

    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw new Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw new Error("An unexpected error occurred")
        }
    }
}


export const getPost = async ({ id }: { id: string }) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
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

export const deletePost = async ({ postId, token }) => {

    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.delete(`http://localhost:5000/api/posts/${postId}`, config)
        return data
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

export const updatePost = async ({ formData, token }) => {

    const postId = formData.get('id');

    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.put(`http://localhost:5000/api/posts/${postId}`, formData, config)
        return data
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


export const createPost = async ({ formData, token }) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.post("http://localhost:5000/api/posts", formData, config)
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message:", error.message);
            throw new Error(error.message);
        } else {
            console.log("unexpected error", error)
            throw new Error("An unexpected error occured")
        }
    }
}