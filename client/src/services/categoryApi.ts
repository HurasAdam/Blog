import axios from "axios";

const getCategories = async ({ token }) => {
  try {
    const config = {
      headers: {
        AUthorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:5000/api/category",
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

export { getCategories };
