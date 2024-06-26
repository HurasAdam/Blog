import axios from "axios";

const getTags = async ({ token, searchKeyword = "", page = 1, limit = 10 }) => {
  try {
    const config = {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    };

    const { data, headers } = await axios.get(`http://localhost:5000/api/tag?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`, config);
    return { data, headers };
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


const getTag = async ({ token, id }) => {
  try {
    const config = {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/tag/${id}`,

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

const updateTag = async ({ formData, token }) => {
  const { id, name, color } = formData;
  try {
    const config = {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/tag/${id}`,
      { name, color },
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
const deleteTag = async ({ tagId, token }: { id: string, token: string }) => {

  try {
    const config = {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:5000/api/tag/${tagId}`, config);
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
export { getTags, createTag, getTag, updateTag, deleteTag };
