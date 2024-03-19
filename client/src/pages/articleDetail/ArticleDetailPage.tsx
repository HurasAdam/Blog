import React from 'react'
import MainLayout from '../../components/MainLayout'
import BreadCrumbs from '../../components/BreadCrumbs'
import { images } from '../../constants';
import { Link } from 'react-router-dom';
import SuggestedPosts from './container/SuggestedPosts';
import CommentContainer from '../../components/comments/CommentContainer';

type IbreadCrumb = {
    name: string;
    link: string;
}

const breadCrumbsData: IbreadCrumb[] = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blog" },
    { name: "Article title", link: "/blog/1" },
]

const postsData = [
    {
        _id: "1",
        image: images.Post1,
        title: "Help children get better education",
        createdAt: "2024-01-28T15:35:53.607+0000",
    },
    {
        _id: "2",
        image: images.Post1,
        title: "Help children get better education",
        createdAt: "2024-01-28T15:35:53.607+0000",
    },
    {
        _id: "3",
        image: images.Post1,
        title: "Help children get better education",
        createdAt: "2024-01-28T15:35:53.607+0000",
    },
    {
        _id: "4",
        image: images.Post1,
        title: "Help children get better education",
        createdAt: "2024-01-28T15:35:53.607+0000",
    },

]

const tagsData = [
    "Medical",
    "Lifestyle",
    "Learn",
    "Healthy",
    "Food",
    "Diet",
    "Education"
]

const ArticleDetailPage: React.FC = () => {
    return (
        <MainLayout >
            <section className='container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start'>
                <article className='flex-1'>
                    <BreadCrumbs data={breadCrumbsData} />
                    <img
                        className='rounded-xl w-full'
                        src={images.Post1}
                        alt="laptop" />
                    <Link
                        to='/blog?category=selectedCategory'
                        className='text-primary text-sm font-roboto inline-block mt-4 md:text-base'
                    >
                        Education
                    </Link>

                    <h1
                        className='text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]'
                    >Help children et better education</h1>

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
                    <CommentContainer className="mt-10" />
                </article>
                <SuggestedPosts
                    header="Latest Article"
                    posts={postsData}
                    tags={tagsData}
                    className="mt-8 lg:mt-0 lg:max-w-xs"
                />
            </section>


        </MainLayout>
    )
}

export default ArticleDetailPage