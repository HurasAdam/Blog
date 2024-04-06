import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineCamera } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { createPost } from "../../../services/postApi";
import { useSelector } from "react-redux";
import { GrFormAdd } from "react-icons/gr";
import { createCategory, getCategories } from "../../../services/categoryApi";
import MultiSelect from "../../../components/shared/MultiSelect";
import { createTag, getTags } from "../../../services/tagsApi";
import { COLORS } from "../../../constants/colors";
import CategoryForm from "../forms/CategoryForm";

interface IOnSubmitProps {
    name: string;
    description: string;

}

const NewCategory: React.FC = () => {
    const userState = useSelector((state) => state?.user?.userInfo);


    const { mutate: createCategoryMutation, isLoading: isCreateCategoryLoading } = useMutation({
        mutationFn: ({ formData, token }) => {
            return createCategory({
                formData,
                token
            });
        },
        onSuccess: () => {
            toast.success("Category Created Successfully");
        },
        onerror: (error: Error) => {
            toast.error(error.message);
        },
    });



    const handleSave = ({ formData, token }) => {
        createCategoryMutation({ formData, token })
    }

    return (
        <div>
            <section className="container  mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl   lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl  ">
                <h1 className="text-2xl font-semibold mb-10 flex">
                    <IoCreateOutline className="w-8 h-auto mr-2" />
                    Create Category
                </h1>

                <CategoryForm
                    type="create"
                    handleSave={handleSave}
                    isCreateCategoryLoading={isCreateCategoryLoading}
                />
            </section>
        </div>
    );
};

export default NewCategory;
