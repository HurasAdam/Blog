import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineCamera } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { createPost } from "../../../services/postApi";
import { useSelector } from "react-redux";
import { GrFormAdd } from "react-icons/gr";
import { getCategories } from "../../../services/categoryApi";
import MultiSelect from "../../../components/shared/MultiSelect";
import { createTag, getTags } from "../../../services/tagsApi";
import { COLORS } from "../../../constants/colors";

interface IOnSubmitProps {
    name: string;
    description: string;

}
interface ICategory {
    _id: string;
    name: string;
    description: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;

}

interface ICategoryFormProps {
    type: string;
    isCreateCategoryLoading: boolean;
    handleSave: () => void;
    category: ICategory

}


const CategoryForm: React.FC<ICategoryFormProps> = ({ handleSave, type, isCreateCategoryLoading, category }) => {
    const userState = useSelector((state) => state?.user?.userInfo);

    const formMethods = useForm<IOnSubmitProps>({
        defaultValues: {
            name: category ? category?.name : "",
            description: category ? category?.description : "",
        },
        mode: "onChange",
    });



    const {
        handleSubmit,
        register,
        formState: { errors },
    } = formMethods;

    const onSubmit = handleSubmit((data) => {

        const { name, description } = data;
        const requestData = {
            name: name,
            description: description
        };

        if (category) {
            requestData.id = category._id;
        }

        handleSave({ formData: requestData, token: userState?.token })

    });

    return (

        <form
            onSubmit={onSubmit}
            className=" mx-auto w-full flex flex-col gap-y-8 "
        >
            <div className="">
                <label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700 block mb-1.5"
                >
                    Name
                </label>
                <input
                    {...register("name", { required: "category name is required" })}
                    type="text"
                    className="border rounded w-full py-3  lg:py-1.5 px-2 xl:py-1 font-normal"
                    id="name"
                    placeholder="here enter category name"
                />
                {errors?.name && (
                    <span className="text-xs text-red-500  font-semibold">
                        {errors.name?.message}
                    </span>
                )}
            </div>

            <div className="">
                <label
                    htmlFor="description"
                    className="text-sm font-semibold text-gray-700 block mb-1.5"
                >
                    Description
                </label>
                <textarea
                    {...register("description", { required: "category description is required" })}

                    className="border rounded w-full py-3  lg:py-1.5 px-2 xl:py-1 font-normal"
                    id="description"
                    rows={10}
                    placeholder="here enter category description"
                />
                {errors?.name && (
                    <span className="text-xs text-red-500  font-semibold">
                        {errors.name?.message}
                    </span>
                )}
            </div>

            <button
                type="submit"
                className="w-fit bg-green-500 text-white font-semibold rounded-lg px-2 py-1 mt-5"
            >
                {isCreateCategoryLoading ? "saving" : (type === "create" ? "Create" : "Update")}
            </button>
        </form>

    );
};

export default CategoryForm;
