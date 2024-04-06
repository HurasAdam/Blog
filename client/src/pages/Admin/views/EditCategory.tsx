import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineCamera } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { createPost, getPost, updatePost } from "../../../services/postApi";
import { useSelector } from "react-redux";
import { GrFormAdd } from "react-icons/gr";
import { getCategories, getCategory, updateCategory } from "../../../services/categoryApi";
import MultiSelect from "../../../components/shared/MultiSelect";
import { getTags } from "../../../services/tagsApi";
import PostForm from "../forms/PostForm";
import { useParams } from "react-router-dom";
import CategoryForm from "../forms/CategoryForm";

interface IOnSubmitProps {
    title: string;
    description: string;
    categories: string[];
    readingTime: string;
    tags: string[];
    postPicture: FileList | null;
}

const EditCategory: React.FC = () => {

    const queryClient = useQueryClient();
    const userState = useSelector((state) => state?.user?.userInfo);
    const { id } = useParams();


    const {
        data: categoryDetails,
    } = useQuery({
        queryFn: () => getCategory({ token: userState?.token, id }),
        queryKey: ["category", id],
        onSuccess: (data) => {

        },
        refetchOnWindowFocus: false
    });

    const { mutate: updateCategoryMutation, isLoading: isUpdateMutationLoading } = useMutation({
        mutationFn: ({ formData, token }) => {
            return updateCategory({
                formData,
                token,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["category", id]);
            toast.success("Category Updated Successfully");
        },
        onerror: (error: Error) => {
            toast.error(error.message);
        },
    });


    const handleSave = ({ formData, token }) => {
        updateCategoryMutation({ formData, token });
    }


    return (
        <div>
            <section className="container   mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl   lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl  ">
                <h1 className="text-2xl font-semibold mb-10 flex">
                    <IoCreateOutline className="w-8 h-auto mr-2" />
                    Edit Category
                </h1>

                {categoryDetails ? (<CategoryForm
                    type="edit"
                    category={categoryDetails}
                    isUpdateMutationLoading={isUpdateMutationLoading}
                    handleSave={handleSave}
                />) : <></>}
            </section>
        </div>
    );
};

export default EditCategory;
