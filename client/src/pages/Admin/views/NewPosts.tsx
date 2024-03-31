import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineCamera } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { createPost } from "../../../services/postApi";
import { useSelector } from "react-redux";
import { GrFormAdd } from "react-icons/gr";



interface IOnSubmitProps {
    title: string; 
description: string; 
categories: string[]; 
tags: string[]; 
postPicture: FileList | null;
}

const NewPost: React.FC = () => {
    const userState = useSelector((state) => state?.user?.userInfo);
    const [postPicture, setPostPicture] = useState(null);

    const formMethods = useForm<IOnSubmitProps>({
        defaultValues: {
            title: "",
            description: "",
            categories:[],
            tags:[],
            postPicture:{}
        
        },
        mode: "onChange",
    });


const {mutate:createPostMutation}=useMutation({
    mutationFn:(postData)=>{
return createPost({
    token: userState.token,
    postData
});
    },
   onSuccess:()=>{
    toast.success("Post created successfully")
   },
   onerror:(error:Error)=>{
    toast.error(error.message)
   }
})

    const { handleSubmit, register, formState: { errors },watch } = formMethods;

  
  

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        setPostPicture(file);


    }
    const handleDeleteImage = () => {
        if (window.confirm("Do you want to delete Post picture?")) {
            setPostPicture(null);
            formMethods.setValue("postPicture", "");
        }
    }

  
const Image = watch("postPicture")
    const onSubmit = handleSubmit((data)=> {
       


const formData = new FormData();
formData.append("title",data?.title);
formData.append("description",data?.description);

formData.append("postPicture",data?.postPicture[0]);


     console.log(data)
    //  createPostMutation(formData);
    });


    return (
        <div>
            <section className='container   mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl   lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl  '>
                <h1 className="text-2xl font-semibold mb-10 flex">
                <IoCreateOutline
                className="w-8 h-auto mr-2"
                />
                    Create Post
                    </h1>
                 
                <form
                    onSubmit={onSubmit}
                    className=" mx-auto w-full flex flex-col gap-y-5 ">
                    <div className="">
                        <label
                            htmlFor="title"
                            className="text-sm ">
                            Title
                        </label>
                        <input
                            {...register("title", { required: "title is required" })}
                            type="text"
                            className="border rounded w-full py-1 px-2 font-normal"
                            id="title"
                            placeholder="here enter post title" />
                        {errors?.title && <span className="text-xs text-red-500 px-1 font-semibold">{errors.title?.message}</span>}
                    </div>
                    <div>
                        <label
                            htmlFor="title"
                            className="text-sm ">
                            Description
                        </label>
                        <input
                           {...register("description", { required: "description is required" })}
                            type="text"
                            className="border rounded w-full py-1 px-2 font-normal"
                            id="categories"
                            placeholder="here enter post description" />
                        {errors?.description && <span className="text-xs text-red-500 px-1 font-semibold">{errors.description?.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="categories" className="text-sm ">
                            Categories
                        </label>
                        <select
                         {...register("categories", { required: "At least one category is required" })}
                            name="categories"
                            id="categories"
                            className="border rounded w-full py-1 px-2 font-normal"
                          defaultValue=""
                        >
                            <option value="A">Programming</option>
                            <option value="A">Front-end</option>
                            <option value="A">Back-end</option>
                            <option value="A">Computer</option>
                            <option value="A">AI</option>
                        </select>
                        {errors?.categories && <span className="text-xs text-red-500 px-1 font-semibold">{errors.categories?.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="tags" className="text-sm ">
                            Tags
                        </label>
                        <select
                           {...register("tags", { required: "At least one tag is required" })}
                            name="tags"
                            id="tags"
                            className="border rounded w-full py-1 px-2 font-normal"
                        >
                            <option value="A">React</option>
                            <option value="A">Django</option>
                            <option value="A">Redux</option>
                            <option value="A">Svetle</option>
                            <option value="A">Astro</option>
                            <option value="A">Node</option>
                        </select>
                        {errors?.tags && <span className="text-xs text-red-500 px-1 font-semibold">{errors.tags?.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="postPicture" className="text-sm ">
                            {postPicture ? (
                                <img src={URL.createObjectURL(postPicture)} />

                            ) :
                                (<div
                                    className="w-full min-h-[200px] bg-blue-50/50 flex justify-center items-center"
                                >
                                    <HiOutlineCamera
                                        className="w-16 h-auto text-primary"
                                    />
                                </div>)}
                        </label>
                        <input
                           {...register("postPicture")}
                            type="file"
                            className=" mt-2 sr-only"
                            onChange={handleFileChange}
                            id="postPicture" />
  { postPicture &&<button
                            type="button"
                            onClick={handleDeleteImage}
                            className="w-fit bg-red-500 text-white font-semibold rounded-lg px-2 py-1 mt-5"
                        >
                            Delete Image
                        </button>}
                    </div>
                    <button
                        type="submit"
                        className="w-fit bg-green-500 text-white font-semibold rounded-lg px-2 py-1 mt-5"
                    >
                        Create Post
                    </button>
                </form>
            </section>
        </div>
    )
}

export default NewPost;