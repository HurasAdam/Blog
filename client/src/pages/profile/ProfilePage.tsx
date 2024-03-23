import React, { useEffect } from 'react';
import MainLayout from "../../components/MainLayout";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootUserState } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../../services/usersApi';
import ProfilePicture from '../../components/ProfilePicture';

const ProfilePage = () => {

    const dispatch = useDispatch()
    const userState = useSelector((state: IRootUserState) => state.user.userInfo)
    const navigate = useNavigate();

    const { data: profileData, isError, isLoading } = useQuery({
        queryFn: () => {
            return getUserProfile({ token: userState.token });
        },
        queryKey: ['profile']
    })

    useEffect(() => {
        if (!userState) {
            navigate("/")
        }
    }, [userState, navigate])


    console.log(userState)

    const {
        register, handleSubmit, formState: { errors, isValid } } = useForm({
            defaultValues: {
                name: "",
                email: "",
                password: "",

            },
            values: {
                name: isLoading ? "" : profileData.name,
                email: isLoading ? "" : profileData.email,

            },
            mode: "onChange",
        });

    const submitHandler = (data) => {

    }

    return (

        <MainLayout>
            <section className='container mx-auto px-5 py-10'>
                <div className='w-full max-w-sm mx-auto'>
                    <ProfilePicture avatar={profileData?.avatar} />
                    <form onSubmit={handleSubmit(submitHandler)}>

                        <div className='flex flex-col mb-6 w-full'>
                            <label
                                htmlFor="name"
                                className='text-[#5a7184] font-semibold block'>
                                Name
                            </label>
                            <input
                                {...register("name", {
                                    minLength: {
                                        value: 3,
                                        message: "Name must be at least 3 characters"
                                    },
                                    required: {
                                        value: true,
                                        message: "Name is required"
                                    }
                                })}
                                type="text"
                                id='name'
                                placeholder='Eneter your name'
                                className={`placeholder:text-[#959ead] text-dark-hard mb-3 rounded-lg 
                                px-5 py-4 font-semibold block outline-none border ${errors.name ? "border-red-500" : "border-[#c3cad9]"}`}

                            />
                            {errors.name?.message && (
                                <span className='text-red-500 text-xs mt-1'>{errors.name.message}</span>
                            )}
                        </div>

                        <div className='flex flex-col mb-6 w-full'>
                            <label
                                htmlFor="email"
                                className='text-[#5a7184] font-semibold block'>
                                Email
                            </label>
                            <input
                                {...register("email", {
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please enter a valid email',
                                    },
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                })}
                                type="email"
                                id='email'
                                placeholder='Eneter your email'
                                className={`placeholder:text-[#959ead] text-dark-hard mb-3 rounded-lg 
                                px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${errors.email ? "border-red-500" : "border-[#c3cad9]"}`}

                            />
                            {errors.email?.message && (
                                <span className='text-red-500 text-xs mt-1'>{errors.email.message}</span>
                            )}
                        </div>

                        <div className='flex flex-col mb-6 w-full'>
                            <label
                                htmlFor="password"
                                className='text-[#5a7184] font-semibold block'>
                                Password
                            </label>
                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Password lenght must be at least 6 characters"
                                    }
                                })}
                                type="password"
                                id='password'
                                placeholder='Eneter your password'
                                className={`placeholder:text-[#959ead] text-dark-hard mb-3 rounded-lg 
                                px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${errors.password ? "border-red-500" : "border-[#c3cad9]"}`}

                            />
                            {errors.password?.message && (
                                <span className='text-red-500 text-xs mt-1'>{errors.password.message}</span>
                            )}
                        </div>


                        <button
                            type='submit'
                            disabled={!isValid || isLoading}
                            className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed'>
                            Register
                        </button>

                    </form>

                </div>

            </section>
        </MainLayout>
    )
}

export default ProfilePage