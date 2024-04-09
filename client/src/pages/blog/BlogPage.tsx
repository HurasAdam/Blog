import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../services/postApi';
import toast from 'react-hot-toast';
import ArticleCardSkeleton from '../../components/comments/ArticleCardSkeleton';
import ErrorMessage from '../../components/comments/ErrorMessage';
import ArticleCard from '../../components/ArticleCard';
import MainLayout from '../../components/MainLayout';
import Pagination from '../../components/Pagination';
import { useSearchParams } from 'react-router-dom';

const BlogPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();


    const searchParamsValue = Object.fromEntries([...searchParams]);

    const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParamsValue?.page) || 1);
    const { data: posts, isLoading, isError } = useQuery({
        queryFn: () => getAllPosts({ searchKeyword: "", page: currentPage, limit: 12 }),
        queryKey: ["posts", currentPage],
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })

    const pageChangeHandler = (page) => {
        setCurrentPage(page);
        setSearchParams({ page })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentPage])

    return (
        <MainLayout>
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
                    ) : isError ? <ErrorMessage message="Something went wrong..." /> : (posts?.data.map((post) => {
                        return (
                            <ArticleCard
                                key={post._id}
                                post={post}
                                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                        )
                    }))}



                </div>
                {!isLoading && (
                    <Pagination
                        onPageChange={(page) => pageChangeHandler(page)}
                        currentPage={currentPage}
                        totalPageCount={parseInt(
                            posts?.headers?.["x-totalpagecount"]
                        )}
                    />
                )}

            </section>
        </MainLayout>)
}

export default BlogPage