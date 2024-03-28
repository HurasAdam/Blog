import React, { useState } from 'react'
import MainLayout from '../../components/MainLayout'
import BreadCrumbs from '../../components/BreadCrumbs'
import { images } from '../../constants';
import { Link, useParams } from 'react-router-dom';
import SuggestedPosts from './container/SuggestedPosts';
import CommentContainer from '../../components/comments/CommentContainer';
import SoscialShareButtons from '../../components/comments/SoscialShareButtons';
import * as types from "../../types/index"
import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getPost } from '../../services/postApi';
import toast from 'react-hot-toast';
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton';
import ErrorMessage from '../../components/comments/ErrorMessage';
import { useSelector } from 'react-redux';
import { IRootUserState } from '../../types/index';




const ArticleDetailPage: React.FC = () => {
    const { id } = useParams();
    const userState = useSelector((state: IRootUserState) => state.user.userInfo)

    const [breadCrumbsData, setBreadCrumbsData] = useState([])

    const { data: postDetails, isLoading, isError } = useQuery({
        queryFn: () => getPost({ id }),
        queryKey: ["post", id],
        onError: (error: Error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            setBreadCrumbsData(
                [
                    { name: "Home", link: "/" },
                    { name: "Blog", link: "/blog" },
                    { name: "Article title", link: `/blog/${postDetails?._id}` },
                ]
            )
        },
    })

    const { data: postsData, } = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"],
        onError: (error: Error) => {
            toast.error(error.message)
        },

    })

    if (isLoading) {
        return (
            <MainLayout >
                <ArticleDetailSkeleton />
            </MainLayout>)

    }

    if (isError) {
        return (
            <MainLayout >
                <ErrorMessage message="Something went wrong..." />
            </MainLayout>)
    }

    return (
        <MainLayout >


            <section className='container  mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start'>
                <article className='flex-1'>
                    <BreadCrumbs data={breadCrumbsData} />
                    <img
                        className='rounded-xl w-full '
                        src={postDetails?.photo ? postDetails?.photo : images.Post3}
                        alt={postDetails?.title} />

                    <div className='mt-4 flex gap-2'>
                        {postDetails?.categories.map((category) => {
                            return (
                                <Link
                                    to={`/blog?category=${category.name}`}
                                    className='text-primary text-sm font-roboto inline-block  md:text-base'
                                >
                                    {category.name}
                                </Link>
                            )
                        })}
                    </div>


                    <h1
                        className='text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]'
                    >{postDetails?.title}</h1>

                    <div className='mt-4 text-dark-soft'>
                        <p className='leading-7'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
                            corrupti quis nesciunt, dolore cupiditate voluptatem voluptate officiis
                            iusto nulla. Nostrum hic commodi blanditiis nulla unde debitis accusamus.
                            Eum, laborum enim.
                            Sint provident similique adipisci natus at, recusandae quidem doloribus
                            rerum non nihil quas deserunt quibusdam tempora qui possimus voluptatum
                            voluptas, id totam sit consectetur aliquam ad commodi dicta! Quibusdam, iste.
                            Ipsam fugiat porro voluptas quaerat maiores animi in tempore expedita rerum
                            exercitationem doloribus maxime quos dolorem modi libero perferendis enim
                            velit ad, eaque quam placeat. Modi illo unde a eius.
                        </p>
                    </div>
                    <CommentContainer
                        comments={postDetails?.comments}
                        className="mt-10"
                        logginedUserId={userState?._id}
                        postId={id}
                    />
                </article>

                <div>
                    <SuggestedPosts
                        header="Latest Article"
                        posts={postsData}
                        tags={postDetails?.tags}
                        className="mt-8 lg:mt-0 lg:max-w-xs"
                    />
                    <div className='mt-7'>
                        <h2
                            className='font-robot font-medium text-dark-hard 
                        mb-4 md:text-xl'>
                            share on
                        </h2>
                        <SoscialShareButtons
                            url={encodeURI("https://docs.kiszczyc.pl/")}
                            title={encodeURIComponent("Monsters-docs")}
                        />
                    </div>
                </div>


            </section>


        </MainLayout>
    )
}

export default ArticleDetailPage