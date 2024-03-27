import axios from "axios";

export const getAllPosts = async () => {

    try {
        const response = await axios.get("http://localhost:5000/api/posts");
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