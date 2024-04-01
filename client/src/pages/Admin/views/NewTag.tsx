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
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  postPicture: FileList | null;
}

const NewTag: React.FC = () => {
  const userState = useSelector((state) => state?.user?.userInfo);

  const formMethods = useForm<IOnSubmitProps>({
    defaultValues: {
      name: "",
      color: "",
    },
    mode: "onChange",
  });

  const { mutate: createTagMutation } = useMutation({
    mutationFn: ({ token, name, color }) => {
      return createTag({
        token,
        name,
        color,
      });
    },
    onSuccess: () => {
      toast.success("Tag Created Successfully");
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

  const onSubmit = handleSubmit((data) => {
    const { name, color } = data;
    createTagMutation({ token: userState?.token, name, color });
  });

  return (
    <div>
      <section className="container  mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl   lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl  ">
        <h1 className="text-2xl font-semibold mb-10 flex">
          <IoCreateOutline className="w-8 h-auto mr-2" />
          Create Tag
        </h1>

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
              {...register("name", { required: "tag name is required" })}
              type="text"
              className="border rounded w-full py-3  lg:py-1.5 px-2 xl:py-1 font-normal"
              id="name"
              placeholder="here enter tag name"
            />
            {errors?.name && (
              <span className="text-xs text-red-500  font-semibold">
                {errors.name?.message}
              </span>
            )}
          </div>

          <div>
            <span className="text-sm block font-semibold text-gray-700">
              Color
            </span>
            <div className=" grid-row-5 gap-3 md:grid-cols-3 md:gap-3 lg:grid">
              {COLORS.map((color, index) => {
                return (
                  <label
                    htmlFor={index}
                    className={`bg-${color} text-sm flex gap-1 text-gray-700 cursor-pointer rounded p-4 mt-3 truncate md:mt-2`}
                  >
                    <input
                      type="radio"
                      value={color}
                      id={index}
                      {...register("color", {
                        validate: (categories) => {
                          if (categories && categories.length > 0) return true;
                          else return "tag color is required";
                        },
                      })}
                    />
                    <span className="text-slate-200 font-bold"># {}</span>
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

export default NewTag;
