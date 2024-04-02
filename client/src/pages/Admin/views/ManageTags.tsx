import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, getAllPosts } from "../../../services/postApi";
import images from "../../../constants/images";
import { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination";
import { FaHashtag } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTags } from "../../../services/tagsApi";

const ManageTags: React.FC = () => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state?.user?.userInfo);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: tags,
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: () => {
      return getTags({ token: userState?.token });
    },
    queryKey: ["tags"],
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
    useMutation({
      mutationFn: ({ postId, token }) => {
        return deletePost({ postId, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries("posts");
        toast.success("Post deleted sucessfully");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  const deletePostHandler = ({ postId, token }): void => {
    mutateDeletePost({ postId, token });
  };

  const searchKeywordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Manage Tags</h1>
      <div className="w-full px-4 mx-auto ">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">Tags</h2>
            <div className="text-end">
              <form
                onSubmit={submitSearchKeywordHandler}
                className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
              >
                <div className=" relative ">
                  <input
                    type="text"
                    id='"form-subscribe-Filter'
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Post title..."
                    onChange={searchKeywordHandler}
                    value={searchKeyword}
                  />
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Filter
                </button>
              </form>
            </div>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Color
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td className="text-center py-10 w-full" colSpan={5}>
                        Loading...
                      </td>
                    </tr>
                  ) : tags?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        No posts found
                      </td>
                    </tr>
                  ) : (
                    tags?.map((tag) => {
                      return (
                        <tr>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <a href="/" className="relative block">
                                  {tag?.photo ? (
                                    <img
                                      alt={tag.name}
                                      src={tag?.photo}
                                      className="mx-auto object-cover rounded-lg h- w-10 aspect-square "
                                    />
                                  ) : (
                                    <FaHashtag
                                      className={`w-6 h-auto text-${tag?.color}`}
                                    />
                                  )}
                                </a>
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {tag?.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap text-xs">
                              {tag?.createdBy?.name}
                            </p>
                            <img
                              className="w-10 h-auto rounded-full  object-cover object-center"
                              src={
                                tag?.createdBy?.avatar
                                  ? tag?.createdBy?.avatar
                                  : images.PostProfileImage
                              }
                              alt="avatar"
                            />
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {new Date(tag?.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex gap-x-1.5 gap-y-1.5 flex-wrap">
                              <span
                                className={`bg-${tag?.color}  p-2.5 rounded-[5px] font-bold text-white `}
                              ></span>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                            <button
                              onClick={() =>
                                deletePostHandler({
                                  postId: tag?._id,
                                  token: userState?.token,
                                })
                              }
                              disabled={isLoadingDeletePost}
                              type="button"
                              className="text-red-600 hover:red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                              Delete
                            </button>
                            <Link
                              to={`/admin/posts/manage/edit/${tag._id}`}
                              className="text-green-600 hover:text-green-900"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              {/* {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={parseInt(tags?.headers?.["x-totalpagecount"])}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTags;
