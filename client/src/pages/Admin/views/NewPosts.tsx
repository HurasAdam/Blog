import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import PostForm from "../forms/PostForm";

interface IOnSubmitProps {
  title: string;
  description: string;
  categories: string[];
  readingTime: string;
  tags: string[];
  postPicture: FileList | null;
}

const NewPost: React.FC = () => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state?.user?.userInfo);
  const [postPicture, setPostPicture] = useState(null);
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

  const { mutate: createPostMutation } = useMutation({
    mutationFn: ({ formData, token }) => {
      return createPost({
        formData, token
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post Created successfully");
    },
    onerror: (error: Error) => {
      toast.error(error.message);
    },
  });



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setPostPicture(file);
  };
  const handleDeleteImage = (cb) => {
    if (window.confirm("Do you want to delete Post picture?")) {
      setPostPicture(null);
      cb()

    }
  };


  const handleSave = ({ formData, token }) => {
    createPostMutation({ formData, token });
  };

  return (
    <section className="container   mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl   lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl ">

      <h1 className="text-2xl font-semibold mb-10 flex">
        <IoCreateOutline className="w-8 h-auto mr-2" />
        Create Post
      </h1>
      <PostForm
        categories={categories}
        tags={tags}
        handleFileChange={handleFileChange}
        handleDeleteImage={handleDeleteImage}
        postPicture={postPicture}
        value={value}
        handleSave={handleSave}
      />
    </section>
  )

};

export default NewPost;
