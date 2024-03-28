import axios from "axios"

interface ICreateCommentProps {
    token: string;
    description: string;
    postId: string;
    parent: string | null;
    replyOnUser: string | null;
}
const createComment = async ({ token, description, postId, parent, replyOnUser }) => {

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.post("http://localhost:5000/api/comments", {
            description,
            postId,
            parent,
            replyOnUser
        }, config)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message)
        } else {
            throw new Error("An unexpected error occurred")

        }


    }
}

const updateComment = async ({ token, description, commentId }) => {

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.put(`http://localhost:5000/api/comments/${commentId}`, {
            description,

        }, config)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message)
        } else {
            throw new Error("An unexpected error occurred")

        }


    }
}

const deleteComment = async ({ token, commentId }) => {

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.delete(`http://localhost:5000/api/comments/${commentId}`, config)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message)
        } else {
            throw new Error("An unexpected error occurred")

        }


    }
}

export { createComment, updateComment, deleteComment };