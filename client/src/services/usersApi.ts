
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