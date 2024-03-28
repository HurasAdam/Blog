import { useState } from "react";


import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment, updateComment } from "../../services/commentApi";
import { useSelector } from "react-redux";
import { IRootUserState } from "../../types";
import toast from "react-hot-toast";

const CommentsContainer = ({ className, logginedUserId, comments, postId }) => {

    const [affectedComment, setAffectedComment] = useState(null);
    const userState = useSelector((state: IRootUserState) => state.user.userInfo)
    const queryClient = useQueryClient()

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ token, description, postId, parent, replyOnUser }) => {
            return createComment({ token, description, postId, parent, replyOnUser })
        },
        onSuccess: () => {
            toast.success("Your comment sent sucessfully, it become visible after the admin confirmation");

        },
        onError: (error: Error) => {
            toast.error(error.message);
            console.log(error)
        }
    })


    const { mutate: mutateUpdateComment } = useMutation({
        mutationFn: ({ token, description, commentId }) => {
            return updateComment({ token, description, commentId })
        },
        onSuccess: () => {
            toast.success("Comment updated sucessfully");
            queryClient.invalidateQueries(["post", postId])
        },
        onError: (error: Error) => {
            toast.error(error.message);
            console.log(error)
        }
    })

    const { mutate: mutateDeleteComment } = useMutation({
        mutationFn: ({ token, commentId }) => {
            return deleteComment({ token, commentId })
        },
        onSuccess: () => {
            toast.success("Comment deleted sucessfully");
            queryClient.invalidateQueries(["post", postId])
        },
        onError: (error: Error) => {
            toast.error(error.message);
            console.log(error)
        }
    })

    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
        mutate({ token: userState?.token, description: value, postId, parent, replyOnUser })
        setAffectedComment(null);
    };

    const updateCommentHandler = (value, commentId) => {
        mutateUpdateComment({ token: userState?.token, description: value, commentId })
        setAffectedComment(null);
    };

    const deleteCommentHandler = (commentId) => {
        mutateDeleteComment({ token: userState?.token, commentId })
    };



    return (
        <div className={`${className}`}>
            <CommentForm
                btnLabel="Send"
                formSubmitHanlder={(value) => addCommentHandler(value)}
                loading={isLoading}
            />
            <div className="space-y-4 mt-8">
                {comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        logginedUserId={logginedUserId}
                        affectedComment={affectedComment}
                        setAffectedComment={setAffectedComment}
                        addComment={addCommentHandler}
                        updateComment={updateCommentHandler}
                        deleteComment={deleteCommentHandler}
                        replies={comment.replies}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentsContainer;