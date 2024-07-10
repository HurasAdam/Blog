import { useForm } from "react-hook-form";
import { HiOutlineCamera } from "react-icons/hi";
import { useSelector } from "react-redux";


interface IOnSubmitProps {
    title: string;
    description: string;
    categories: string[];
    readingTime: string;
    tags: string[];
    postPicture: FileList | null;
}

const PostForm: React.FC = ({ categories, tags, handleFileChange, handleDeleteImage, postPicture, isUpdateMutationLoading, handleSave, type, post }) => {

    const userState = useSelector((state) => state?.user?.userInfo);

    const formMethods = useForm<IOnSubmitProps>({
        defaultValues: {

            title: post ? post?.title : "",
            description: post ? post?.description : "",
            readingTime: post ? post?.readingTime : "",
            categories: post ? post?.categories : [],
            tags: post ? post?.tags : [],
            postPicture: post ? post?.photo : ""

        },
        mode: "onChange",
    });


    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors, isDirty },
    } = formMethods;

    const formFileRemoveHanlder = () => {
        setValue("postPicture", "");

    }


    const onSubmit = handleSubmit((data) => {
        const { title, description, postPicture, tags, categories, readingTime } =
            data;
        const formData = new FormData();
        if (post) {
            formData.append("id", post?._id)
        }
        const postPhoto = postPicture[0]
        formData.append("title", title);
        formData.append("description", description);
        formData.append("readingTime", readingTime);

        if (postPicture && typeof (postPicture) === 'object') {
            formData.append("postPicture", postPhoto);
        }

        categories.forEach((category, index) => {
            formData.append(`categories[${index}]`, category);
        });

        tags.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
        });

        handleSave({
            formData: formData,
            token: userState?.token
        });

    });

    const fileInputValue = watch("postPicture")[0]


    return (
        <div>
            <form
                onSubmit={onSubmit}
                className=" mx-auto w-full flex flex-col gap-y-8 "
            >
                <div className="">
                    <label
                        htmlFor="title"
                        className="text-sm font-semibold text-gray-700 block mb-1.5"
                    >
                        Title
                    </label>
                    <input
                        {...register("title", { required: "title is required" })}
                        type="text"
                        className="border rounded w-full py-3  lg:py-1.5 px-2 xl:py-1 font-normal"
                        id="title"
                        placeholder="here enter post title"
                    />
                    {errors?.title && (
                        <span className="text-xs text-red-500  font-semibold">
                            {errors.title?.message}
                        </span>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="text-sm font-semibold text-gray-700  block mb-1.5"
                    >
                        Description
                    </label>
                    <input
                        {...register("description", {
                            required: "description is required",
                        })}
                        type="text"
                        className="border rounded w-full py-3  lg:py-1.5 xl:py-1  px-2 font-normal"
                        id="description"
                        placeholder="here enter post description"
                    />
                    {errors?.description && (
                        <span className="text-xs text-red-500 px-1 font-semibold">
                            {errors.description?.message}
                        </span>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="readingTime"
                        className="text-sm font-semibold text-gray-700  block mb-1.5"
                    >
                        Estimated Reading Time{" "}
                        <span className="text-xs text-slate-400">(in minutes)</span>
                    </label>
                    <input
                        {...register("readingTime", {
                            required: "estimated reading time is required",
                        })}
                        type="number"
                        min={2}
                        className="border rounded w-full py-3  lg:py-1.5 xl:py-1  px-2 font-normal"
                        id="readingTime"
                        placeholder="here enter estimated post reading time "
                    />
                    {errors?.readingTime && (
                        <span className="text-xs text-red-500 px-1 font-semibold">
                            {errors.readingTime?.message}
                        </span>
                    )}
                </div>

                <div>
                    <span className="text-sm block font-semibold text-gray-700">
                        Categories
                    </span>
                    <div className=" grid-row-5 gap-3 md:grid-cols-3 md:gap-3 lg:grid">
                        {categories &&
                            categories?.map((category) => {
                                const id = category?._id
                                const formCategoriesState = watch("categories")
                                const isChecked = formCategoriesState?.some((c) => c._id === id)
                                return (
                                    <label
                                        htmlFor={category?.name}
                                        className="text-sm flex gap-1 text-gray-700 cursor-pointer bg-gray-200 rounded p-4 mt-3 truncate md:mt-2"
                                    >
                                        <input
                                            type="checkbox"
                                            value={category?._id}
                                            id={category?.name}
                                            {...register("categories", {
                                                validate: (categories) => {
                                                    if (categories && categories.length > 0)
                                                        return true;
                                                    else return "Atleast one category is required";
                                                },
                                            })}
                                            defaultChecked={isChecked}
                                        />
                                        {category?.name}
                                    </label>
                                );
                            })}
                    </div>
                    {errors?.categories && (
                        <span className="text-xs text-red-500 px-1 font-semibold">
                            {errors.categories?.message}
                        </span>
                    )}
                </div>
                {/* TAGS */}
                <div>
                    <span
                        htmlFor=""
                        className=" text-sm block font-semibold text-gray-700"
                    >
                        Tags
                    </span>
                    <div className=" grid-row-5 gap-3 md:grid-cols-3 md:gap-3 lg:grid">
                        {tags &&
                            tags?.map((tag) => {
                                const id = tag?._id
                                const formTagsState = watch("tags")
                                const isChecked = formTagsState?.some((t) => t._id === id)
                                return (
                                    <label
                                        htmlFor={tag?._id}
                                        className="text-sm flex gap-1 text-gray-700 cursor-pointer bg-gray-200 rounded p-4 mt-3 truncate md:mt-2"
                                    >
                                        <input

                                            type="checkbox"
                                            value={tag?._id}
                                            id={tag?._id}
                                            {...register("tags", {
                                                validate: (tags) => {
                                                    if (tags && tags.length > 0) return true;
                                                    else return "Atleast one tag is required";
                                                },
                                            })}
                                            defaultChecked={isChecked}
                                        />
                                        {`# ${tag?.name}`}
                                    </label>
                                );
                            })}
                    </div>
                    {errors?.tags && (
                        <span className="text-xs text-red-500 px-1 font-semibold">
                            {errors.tags?.message}
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor="postPicture" className="text-sm cursor-pointer">
                        {watch("postPicture") ? (
                            <img src={watch("postPicture")?.length > 10 ? watch("postPicture") : URL.createObjectURL(fileInputValue)} alt="Post Picture" />
                        ) : (
                            <div className="w-full min-h-[200px] bg-blue-50/50 flex flex-col justify-center items-center border-[2px] border-dashed rounded-lg">
                                <HiOutlineCamera className="w-16 h-auto text-primary" />
                                <span className="font-semibold text-slate-900 text-base">
                                    Add Photo here
                                </span>
                                <span className="text-xs text-slate-500">PNG, JPG, JPEG</span>
                            </div>
                        )}
                    </label>
                    <input
                        {...register("postPicture")}
                        type="file"
                        className=" mt-2 sr-only"
                        id="postPicture"
                    />
                    {watch("postPicture") && (
                        <button
                            type="button"
                            onClick={() => handleDeleteImage(formFileRemoveHanlder())}
                            className="w-fit bg-red-500 text-white font-semibold rounded-lg px-2 py-1 mt-5"
                        >
                            Delete Image
                        </button>
                    )}
                </div>
                {errors?.postPicture && (
                    <span className="text-xs text-red-500 px-1 font-semibold">
                        {errors.postPicture?.message}
                    </span>
                )}
                <button
                    disabled={!isDirty}
                    type="submit"
                    className="w-fit  bg-green-500 text-white font-semibold rounded-lg py-2 px-5 mt-5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {type === "edit" ? "Update" : "Create"}
                    {isUpdateMutationLoading && "Saving..."}
                </button>
            </form>

        </div >
    );
};

export default PostForm;
