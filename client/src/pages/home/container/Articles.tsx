import React from 'react'
import ArticleCard from '../../../components/ArticleCard'
import { FaArrowRight } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../../../services/postApi'
import toast from 'react-hot-toast'
import ArticleCardSkeleton from '../../../components/comments/ArticleCardSkeleton'
import ErrorMessage from '../../../components/comments/ErrorMessage'

const Articles: React.FC = () => {

    const { data: posts, isLoading, isError } = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"],
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
    return (
        <section
            className='flex flex-col container mx-auto px-5 py-10 '>

            <div className='flex flex-wrap md:gap-x-5 gap-y-5 pb-10'>
                {isLoading ? (

                    [...Array(6)].map((item, index) => {
                        return (
                            <ArticleCardSkeleton
                                key={index}
                                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                            />
                        )
                    })
                ) : isError ? <ErrorMessage message="Something went wrong..." /> : (posts.map((post) => {
                    return (
                        <ArticleCard
                            key={post._id}
                            post={post}
                            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                    )
                }))}



            </div>
            <button
                className='mx-auto flex items-center gap-x-2 font-bold 
            border-2 border-primary px-6 py-3 rounded-lg text-primary'>
                <span>More articles</span>
                <FaArrowRight className='w-3 h-3' />
            </button>

        </section>
    )
}

export default Articles