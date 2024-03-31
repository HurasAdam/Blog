import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPost, updatePost } from "../../../services/postApi";
import { Link, useParams } from "react-router-dom";
import ArticleDetailSkeleton from "../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../components/comments/ErrorMessage";
import { useEffect, useState } from "react";
import { images } from "../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const EditPost: React.FC = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const userState = useSelector((state) => state?.user?.userInfso);
  const [photo, setPhoto] = useState(null);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [body, setBody] = useState(null);

  const {
    data: postDetails,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getPost({ id }),
    queryKey: ["post", id],
  });

  const { mutate, isLoading: isMutationLoading } = useMutation({
    mutationFn: ({ updatedData, id, token }) => {
      return updatePost({ updatedData, id, token });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["post", id]);
      toast.success("Post updated sucessfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const ulrToObject = async (url) => {
        let response = await fetch(url);
        let blob = await response.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await ulrToObject(images.Post3);
      updatedData.append("postPicture", picture);
    }
    updatedData.append("document", JSON.stringify({}));
    mutate({ updatedData, id, token: userState?.token });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete Post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };
  useEffect(() => {
    if (!isLoading || !isError) {
      setInitialPhoto(postDetails?.photo);
      setBody("asdasdadasdasdas");
    }
  }, [postDetails, isError, isLoading]);

  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  if (isError) {
    return <ErrorMessage message="Something went wrong..." />;
  }

  return (
    <div>
      <section className="container  mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <label htmlFor="postPicture" className="w-full cursor-pointer">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt={postDetails.title}
                className="rounded-xl w-full"
              ></img>
            ) : initialPhoto ? (
              <img
                src={initialPhoto}
                alt={postDetails.title}
                className="w-full cursor-pointer "
              />
            ) : (
              <div className="w-full min-h-[200px] bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-16 h-auto text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="postPicture"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={handleDeleteImage}
            className="w-fit bg-red-500 text-white font-semibold rounded-lg px-2 py-1 mt-5"
          >
            Delete Image
          </button>
          <div className="mt-4 flex gap-2">
            {postDetails?.categories.map((category) => {
              return (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block  md:text-base"
                >
                  {category.name}
                </Link>
              );
            })}
          </div>

          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            {postDetails?.title}
          </h1>

          <div className="mt-4 text-dark-soft">
            <p className="leading-7">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Explicabo corrupti quis nesciunt, dolore cupiditate voluptatem
              voluptate officiis iusto nulla. Nostrum hic commodi blanditiis
              nulla unde debitis accusamus. Eum, laborum enim. Sint provident
              similique adipisci natus at, recusandae quidem doloribus rerum non
              nihil quas deserunt quibusdam tempora qui possimus voluptatum
              voluptas, id totam sit consectetur aliquam ad commodi dicta!
              Quibusdam, iste. Ipsam fugiat porro voluptas quaerat maiores animi
              in tempore expedita rerum exercitationem doloribus maxime quos
              dolorem modi libero perferendis enim velit ad, eaque quam placeat.
              Modi illo unde a eius.
            </p>
          </div>
          <button
            type="button"
            onClick={handleUpdatePost}
            className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2"
          >
            Save
          </button>
        </article>
      </section>
    </div>
  );
};

export default EditPost;
