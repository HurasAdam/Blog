import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCamera } from "react-icons/hi";


const NewPost: React.FC = () => {
    const [postPicture, setPostPicture] = useState(null);

    const formMethods = useForm();
    const { handleSubmit, register, formState: { errors } } = formMethods;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        setPostPicture(file);


    }
    const handleDeleteImage = () => {
        if (window.confirm("Do you want to delete Post picture?")) {
            setPostPicture(null);

        }
    }


    const onSubmit = handleSubmit((data) => {
        console.log(data)
    });


    return (
        <div>
            <section className='container  mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start'>
                <h1 className="text-2xl font-semibold">Create New Post</h1>
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-y-4">
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
                            id="title"
                            placeholder="here enter post description" />
                        {errors?.description && <span className="text-xs text-red-500 px-1 font-semibold">{errors.description?.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="title" className="text-sm ">
                            Categories
                        </label>
                        <select
                            name=""
                            id=""
                            className="border rounded w-full py-1 px-2 font-normal"
                        >
                            <option value="A">Programming</option>
                            <option value="A">Front-end</option>
                            <option value="A">Back-end</option>
                            <option value="A">Computer</option>
                            <option value="A">AI</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="title" className="text-sm ">
                            Tags
                        </label>
                        <select
                            name=""
                            id=""
                            className="border rounded w-full py-1 px-2 font-normal"
                        >
                            <option value="A">React</option>
                            <option value="A">Django</option>
                            <option value="A">Redux</option>
                            <option value="A">Svetle</option>
                            <option value="A">Astro</option>
                            <option value="A">Node</option>
                        </select>
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
                            type="file"
                            className="w-full mt-2 sr-only"
                            onChange={handleFileChange}
                            id="postPicture" />
                        <button
                            type="button"
                            onClick={handleDeleteImage}
                            className="w-fit bg-red-500 text-white font-semibold rounded-lg px-2 py-1 mt-5"
                        >
                            Delete Image
                        </button>
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