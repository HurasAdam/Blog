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
import { deleteUser, getAllUsers } from "../../../services/usersApi";

const Users: React.FC = () => {
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state?.user?.userInfo);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [commentStatus, setCommentStatus] = useState("");
    const [popupContent, setPopupContent] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);




    const { data: users, isLoading, isFetching, refetch } = useQuery({
        queryFn: () => {
            return getAllUsers({ searchKeyword: searchKeyword, token: userState?.token });
        },
        queryKey: ["users"],
        refetchOnWindowFocus: false,
    });



    const { mutate: mutateDeleteUser, isLoading: isLoadingDeletePost } =
        useMutation({
            mutationFn: ({ userId, token }) => {
                return deleteUser({ userId, token });
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries("users");
                handlePopupClose({ type: "delete", value: false })
                toast.success("User deleted sucessfully");
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

    const deleteUserHandler = ({ userId, token }): void => {
        mutateDeleteUser({ userId, token });
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

    const handlePopupOpen = ({ value, content, type }) => {
        if (type === "userDetails") {
            setPopupContent(content);
            setIsPopupOpen(value);
        } else if (type === "delete") {
            setPopupContent(content);
            setIsDeletePopupOpen(value);
        }
    }

    const handlePopupClose = ({ type, value }) => {
        if (type === "delete") {
            setPopupContent("");
            setIsDeletePopupOpen(value);
        } else {
            setPopupContent("");
            setIsPopupOpen(value);
        }
    };
    console.log(popupContent);
    useEffect(() => {
        refetch();
    }, [commentStatus]);
    console.log(popupContent)
    return (
        <div>
            <h1 className="text-2xl font-semibold">Manage users</h1>
            <div className="w-full px-4 mx-auto ">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                        <div className=" flex items-center gap-x-5">
                            <h2 className="text-2xl leading-tight">Users</h2>

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
                                        placeholder="user name..."
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
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Verified
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Role
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
                                    ) : users?.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-10 w-full">
                                                No users found
                                            </td>
                                        </tr>
                                    ) : (
                                        users?.map((user) => {
                                            return (
                                                <tr>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0">
                                                                <a href="/" className="relative block">
                                                                    {user?.avatar ? (
                                                                        <img
                                                                            alt="avatar"
                                                                            src={user?.avatar}
                                                                            className="mx-auto object-cover rounded-lg h- w-10 aspect-square "
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            className="mx-auto object-cover rounded-lg h- w-10 aspect-square"
                                                                            alt="avatar"
                                                                            src={images.userImage}
                                                                        />
                                                                    )}
                                                                </a>
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {user?.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div className="flex gap-x-1.5 gap-y-1.5 flex-wrap">
                                                            <p>{user?.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p>
                                                            {user?.verified ? (<p className="text-base">✔️</p>) : (<p className="text-base">❌</p>)}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
                                                        <div className="text-gray-900 whitespace-no-wrap text-xs">
                                                            {user?.admin ? (<span className=" block text-sm bg-orange-400 w-fit py-1 px-1.5 rounded-lg text-white font-semibold">Admin</span>) : (<span className=" block text-sm bg-blue-400 w-fit py-1 px-3 rounded-lg text-white font-semibold">User</span>)}
                                                        </div>
                                                    </td>
                                                    <td className=" gap-4 px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5 text-center ">
                                                        <button
                                                            onClick={() => handlePopupOpen({ value: true, content: { userId: user?._id }, type: "delete" })}

                                                            type="button"
                                                            className="text-red-600 hover:red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                                                        >
                                                            Delete
                                                        </button>
                                                        <Link
                                                            to={`/admin/users/manage/edit/${user._id}`}
                                                            className="text-green-600 hover:text-green-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                handlePopupOpen({
                                                                    value: true,
                                                                    content: {
                                                                        name: user?.name,
                                                                        createdAt: user?.createdAt,
                                                                        email: user?.email,
                                                                        avatar: user?.avatar,
                                                                        admin: user?.admin
                                                                    },
                                                                    type: "userDetails"
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
            <Popup
                type="userDetails"
                handlePopupClose={handlePopupClose}
                isDeletePopupOpen={isDeletePopupOpen}
                isPopupOpen={isPopupOpen}>
                <h2 className="text-center mb-5 md:text-left text-xl md:text-2xl font-semibold text-blue-500">User Details</h2>
                <div className="flex flex-col md:flex-row px-2 gap-2 h-fit ">

                    <div className="flex flex-col md:pt-10 ">
                        <img
                            className="w-24 h-auto mx-auto rounded-lg sm:w-36 sm:h-auto md:min-w-[150px] md-h-auto lg:min-w-[140px]"
                            src={popupContent?.avatar || images?.userImage}
                        />

                    </div>
                    <div className="grid grid-cols-3 gap-1 w-full  sm:w-[80%]  sm:mx-auto mt-6">
                        <div className="col-span-1  p-2">
                            <span className="text-slate-500 text-xs md:text-base">name</span>
                        </div>
                        <div className="col-span-2 p-2 ">
                            <span className="text-sm font-semibold font-roboto md:text-lg">{popupContent?.name}</span>
                        </div>
                        <div className="col-span-1  p-2">
                            <span className="text-slate-500 text-xs md:text-base">email</span>
                        </div>
                        <div className="col-span-2  p-2">
                            <span className="  text-sm font-semibold font-roboto text-right md:text-lg">{popupContent?.email}</span>
                        </div>
                        <div className="col-span-1 p-2">
                            <span className="text-slate-500 text-xs md:text-base">role</span>
                        </div>
                        <div className="col-span-2  p-2">
                            <span className="text-sm font-semibold font-roboto text-right md:text-lg">
                                {popupContent?.admin ? "Admin" : "User"}
                            </span>
                        </div>
                        <div className="col-span-1  p-2">
                            <span className="text-slate-500 text-xs md:text-base">Joined</span>
                        </div>
                        <div className="col-span-2 p-2">        <span className=" text-sm font-semibold font-roboto text-right md:text-lg">
                            {" "}
                            {new Date(popupContent?.createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </span></div>
                    </div>

                </div>
            </Popup >
            <Popup
                type="delete"
                handlePopupClose={handlePopupClose}
                isPopupOpen={isPopupOpen}
                isDeletePopupOpen={isDeletePopupOpen}
            >
                <div className=" h-full flex flex-col  justify-between">
                    <span className="font-roboto text-2xl font-bold text-rose-700 md:px-2">Are you absolutely sure?</span>
                    <p className="font-roboto text-base md:p-2">This action cannot be undone.
                        This will permanently delete your account
                        and remove your data from our servers.</p>
                    <div className="flex justify-end  gap-x-2">
                        <button
                            className="border-2 border-slate-300 hover:bg-rose-700 hover:text-slate-100 hover:border-none py-1.5 px-4 rounded-lg font-semibold"
                            onClick={() => handlePopupClose({ type: "delete", value: false })}>
                            Cancel
                        </button>
                        <button
                            onClick={() =>
                                deleteUserHandler({
                                    userId: popupContent?.userId,
                                    token: userState?.token,
                                })
                            }
                            className="border-2  py-1.5 px-2 rounded-lg font-semibold bg-blue-500 text-slate-100"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </Popup>
        </div >
    );
};

export default Users;
