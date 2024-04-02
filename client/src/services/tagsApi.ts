import axios from "axios";

const getTags = async ({ token, searchKeyword = "", page = 1, limit = 10 }) => {
  try {
    const config = {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:5000/api/tag?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`, config);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message", error.message);
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

const createTag = async ({ token, name, color }) => {
  try {
    const config = {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/tag",
      {
        name,
        color,
      },
      config
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message", error.message);
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
export { getTags, createTag };
