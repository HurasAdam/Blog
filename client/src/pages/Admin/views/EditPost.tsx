import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineCamera } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { createPost, getPost, updatePost } from "../../../services/postApi";
import { useSelector } from "react-redux";
import { GrFormAdd } from "react-icons/gr";
import { getCategories } from "../../../services/categoryApi";
import MultiSelect from "../../../components/shared/MultiSelect";
import { getTags } from "../../../services/tagsApi";
import PostForm from "../forms/PostForm";
import { useParams } from "react-router-dom";

interface IOnSubmitProps {
    title: string;
    description: string;
    categories: string[];
    readingTime: string;
    tags: string[];
    postPicture: FileList | null;
}

const EditPost: React.FC = () => {

    const queryClient = useQueryClient();
    const userState = useSelector((state) => state?.user?.userInfo);
    const { id } = useParams();

    const [postPicture, setPostPicture] = useState(undefined);
    const [value, setValue] = useState();



    const { data: categories } = useQuery({
        queryFn: () => {
            return getCategories({ token: userState?.token });
        },
        queryKey: ["categories"],
    });

    const { data: tags } = useQuery({
        queryFn: () => {
            return getTags({ token: userState?.token });
        },
        queryKey: ["tags"],
    });



    const {
        data: postDetails,
    } = useQuery({
        queryFn: () => getPost({ id }),
        queryKey: ["post", id],
        onSuccess: (data) => {
            setPostPicture(data?.photo)

        },
        refetchOnWindowFocus: false
    });



    const { mutate: updatePostMutation, isLoading: isUpdateMutationLoading } = useMutation({
        mutationFn: ({ formData, token }) => {
            return updatePost({
                formData,
                token,

            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["post", id]);
            toast.success("Post Updated Successfully");
        },
        onerror: (error: Error) => {
            toast.error(error.message);
        },
    });


    const handleSave = ({ formData, token }) => {



        updatePostMutation({ formData, token });
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        setPostPicture(file);
    };
    const handleDeleteImage = () => {
        if (window.confirm("Do you want to delete Post picture?")) {
            setPostPicture(undefined);
            cb()
        }
    };



    return (
        <div>
            <section className="container   mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl   lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl  ">
                <h1 className="text-2xl font-semibold mb-10 flex">
                    <IoCreateOutline className="w-8 h-auto mr-2" />
                    Edit Post
                </h1>

                {postDetails  ? (<PostForm
                    type="edit"
                    categories={categories&&categories}
                    post={postDetails}
                    tags={tags&&tags}
                    handleFileChange={handleFileChange}
                    handleDeleteImage={handleDeleteImage}
                    postPicture={postPicture}
                    isUpdateMutationLoading={isUpdateMutationLoading}
                    handleSave={handleSave}
                />) : <></>}
            </section>
        </div>
    );
};

export default EditPost;
