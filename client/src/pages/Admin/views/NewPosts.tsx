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
import { getTags } from "../../../services/tagsApi";

interface IOnSubmitProps {
  title: string;
  description: string;
  categories: string[];
  readingTime: string;
  tags: string[];
  postPicture: FileList | null;
}

const NewPost: React.FC = () => {
  const userState = useSelector((state) => state?.user?.userInfo);
  const [postPicture, setPostPicture] = useState(null);
  const [value, setValue] = useState();

  const formMethods = useForm<IOnSubmitProps>({
    defaultValues: {
      title: "",
      description: "",
      readingTime: "",
      categories: [],
      tags: [],
      postPicture: {},
    },
    mode: "onChange",
  });

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

  const { mutate: createPostMutation } = useMutation({
    mutationFn: (postData) => {
      return createPost({
        token: userState.token,
        postData,
      });
    },
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onerror: (error: Error) => {
      toast.error(error.message);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formMethods;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setPostPicture(file);
  };
  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete Post picture?")) {
      setPostPicture(null);
      formMethods.setValue("postPicture", "");
    }
  };

  const onSubmit = handleSubmit((data) => {
    const { title, description, postPicture, tags, categories, readingTime } =
      data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("readingTime", readingTime);
    formData.append("postPicture", postPicture ? postPicture[0] : "");

    categories.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });

    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
    console.log(data);
    createPostMutation(formData);
  });

  return (
    <div>
      <section className="container   mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl   lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl  ">
        <h1 className="text-2xl font-semibold mb-10 flex">
          <IoCreateOutline className="w-8 h-auto mr-2" />
          Create Post
        </h1>

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
                categories.map((category) => {
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
                tags.map((tag) => {
                  return (
                    <label
                      htmlFor={tag?.name}
                      className="text-sm flex gap-1 text-gray-700 cursor-pointer bg-gray-200 rounded p-4 mt-3 truncate md:mt-2"
                    >
                      <input
                        type="checkbox"
                        value={tag?._id}
                        id={tag?.name}
                        {...register("tags", {
                          validate: (tags) => {
                            if (tags && tags.length > 0) return true;
                            else return "Atleast one tag is required";
                          },
                        })}
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
            <label htmlFor="postPicture" className="text-sm cursor-pointer  ">
              {postPicture ? (
                <img src={URL.createObjectURL(postPicture)} />
              ) : (
                <div className="w-full  min-h-[200px] bg-blue-50/50 flex flex-col justify-center items-center border-[2px] border-dashed rounded-lg ">
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
              onChange={handleFileChange}
              id="postPicture"
            />
            {postPicture && (
              <button
                type="button"
                onClick={handleDeleteImage}
                className="w-fit bg-red-500 text-white font-semibold rounded-lg px-2 py-1 mt-5"
              >
                Delete Image
              </button>
            )}
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
  );
};

export default NewPost;
