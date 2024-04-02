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
import { IoMdCheckmark } from "react-icons/io";
import { approveComment, getAllComments } from "../../../services/commentApi";
import Popup from "../../../components/shared/Popup";

const Comments: React.FC = () => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state?.user?.userInfo);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [commentStatus, setCommentStatus] = useState("");
  const [popupContent, setPopupContent] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    data: comments,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => {
      return getAllComments({
        searchKeyword,
        currentPage,
        commentStatus,
        token: userState?.token,
      });
    },
    queryKey: ["comments"],
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

  const { mutate: mutateApproveComment, isLoading: isLoadingCommentAprove } =
    useMutation({
      mutationFn: ({ commentId, token }) => {
        return approveComment({ commentId, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries("comments");
        toast.success("Comment accepted sucessfully");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  const approveCommentHandler = ({ commentId, token }): void => {
    mutateApproveComment({ commentId, token });
  };

  const deletePostHandler = ({ commentId, token }): void => {
    mutateDeletePost({ commentId, token });
  };

  const searchKeywordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const handleSelectChange = (event) => {
    setCommentStatus(event.target.value);
  };

  const submitSearchKeywordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handlePopupOpen = (value: boolean, content) => {
    setPopupContent(content);
    setIsPopupOpen(value);
  };

  const handlePopupClose = (value) => {
    setPopupContent("");
    setIsPopupOpen(value);
  };
  console.log(popupContent);
  useEffect(() => {
    refetch();
  }, [commentStatus]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Manage Comments</h1>
      <div className="w-full px-4 mx-auto ">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <div className=" flex items-center gap-x-5">
              <h2 className="text-2xl leading-tight">Comments</h2>

              <select name="" id="" onChange={handleSelectChange}>
                <option value="">overall</option>
                <option value={"true"}>checked</option>
                <option value={"false"}>pending</option>
              </select>
            </div>
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
                    placeholder="Comment author..."
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
                      Post
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
                      Author
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Check
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
                  ) : comments?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        No comments found
                      </td>
                    </tr>
                  ) : (
                    comments?.map((comment) => {
                      return (
                        <tr>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <a href="/" className="relative block">
                                  {comment?.post?.photo ? (
                                    <img
                                      alt={comment.post?.title}
                                      src={comment?.post?.photo}
                                      className="mx-auto object-cover rounded-lg h- w-10 aspect-square "
                                    />
                                  ) : (
                                    <img
                                      className="mx-auto object-cover rounded-lg h- w-10 aspect-square"
                                      alt={comment?.post?.title}
                                      src={images.Post3}
                                    />
                                  )}
                                </a>
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {comment?.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {new Date(comment?.createdAt).toLocaleDateString(
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
                              <img
                                className="w-10 h-auto rounded-full object-cover object-center"
                                src={comment?.user?.avatar || images?.userImage}
                                alt="avatar"
                              />
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
                            <div className="text-gray-900 whitespace-no-wrap text-xs">
                              {comment?.check === true ? (
                                <button
                                  disabled={comment?.check}
                                  className="bg-emerald-600  text-white font-bold py-2 px-4 rounded-lg "
                                >
                                  Accepted
                                </button>
                              ) : (
                                <button
                                  className="bg-blue-400 hover:bg-blue-700 text-slate-100 font-bold py-2 px-4 rounded-lg transition ease-in-out delay-0.4 "
                                  disabled={comment?.check}
                                  onClick={() =>
                                    approveCommentHandler({
                                      commentId: comment?._id,
                                      token: userState?.token,
                                    })
                                  }
                                >
                                  Confirm
                                </button>
                              )}
                            </div>
                          </td>
                          <td className=" gap-4 px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5 text-center ">
                            <button
                              onClick={() =>
                                deletePostHandler({
                                  postId: comment?._id,
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
                              to={`/admin/posts/manage/edit/${comment._id}`}
                              className="text-green-600 hover:text-green-900"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => {
                                handlePopupOpen(true, {
                                  text: comment?.description,
                                  name: comment?.user.name,
                                  createdAt: comment?.createdAt,
                                  avatar: comment?.user?.avatar,
                                });
                              }}
                              className="bg-violet-600 text-slate-200 px-2 py-1 rounded-lg text-sm font-semibold"
                            >
                              View
                            </button>
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
      <Popup handlePopupClose={handlePopupClose} isPopupOpen={isPopupOpen}>
        <div className="flex flex-col md:flex-row px-5 h-fit ">
          <div className="flex flex-col md:pt-10">
            <img
              className="w-40 h-auto mx-auto rounded-lg md:min-w-[100px] md-h-auto lg:min-w-[140px]"
              src={popupContent?.avatar || images?.userImage}
            />
            <span className="border-2 text-center">{popupContent?.name}</span>
          </div>
          <div className="flex flex-col gap-5 w-full ">
            <span className="text-blue-500 text-sm font-semibold font-roboto text-right">
              {" "}
              {new Date(popupContent?.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="px-4 md:px-10 ">{popupContent?.text}</span>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Comments;
