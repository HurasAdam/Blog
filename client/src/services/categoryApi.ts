import axios from "axios";

const getCategories = async ({ token, searchKeyword = "", page = 1, limit = 10 }: { token: string, searchKeyword: string, page: number, limit: number }) => {
  try {
    const config = {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    };

    const { data, headers } = await axios.get(
      `http://localhost:5000/api/category?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`,
      config
    );
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

const getCategory = async ({ token, id }: { token: string, id: string }) => {
  try {
    const config = {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/category/${id}`,
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

const createCategory = async ({ formData, token }) => {
  try {
    const config = {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post("http://localhost:5000/api/category", formData, config)
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



const updateCategory = async ({ formData, token }) => {
  try {
    const { id, name, description } = formData

    const config = {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:5000/api/category/${id}`,
      { name, description }, config
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

const deleteCategory = async ({ categoryId, token }) => {
  try {
    const config = {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `http://localhost:5000/api/category/${categoryId}`, config);
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





export { getCategories, createCategory, updateCategory, getCategory, deleteCategory };
