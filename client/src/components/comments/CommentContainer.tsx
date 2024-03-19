import React, { useEffect, useState } from 'react'
import CommentForm from './CommentForm'

import { getCommentsData } from '../../data/comments'
import { current } from '@reduxjs/toolkit';
import Comment from "./Comment"

const CommentContainer: React.FC = ({ className }) => {

    const [comments, setComments] = useState([]);
    const mainComments = comments.filter((comment) => comment.parent === null);

    console.log(comments);

    useEffect(() => {

        getCommentsData().then((response) => setComments(response))

    }, [])


    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
        const newComment = {
            _id: "10",
            user: {
                _id: "a",
                name: "Anrew Rezaii",
            },
            desc: value,
            post: "1",
            parent: parent,
            replyOnUser: replyOnUser,
            createdAt: "2022-12-31T17:22:05.092+0000",
        };
        setComments((currentState) => {
            return [newComment, ...currentState]
        })
    }

    return (
        <div className={`${className}`}>
            <CommentForm btnLabel="Send" formSubmitHandler={(value) => addCommentHandler(value)} />

            <div className='space-y-4 mt-8'>
                {mainComments.map((comment) => {
                    return (
                        <Comment comment={comment} />
                    )
                })}
            </div>
        </div>
    )
}

export default CommentContainer