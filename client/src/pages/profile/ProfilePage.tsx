import React, { useEffect } from 'react';
import MainLayout from "../../components/MainLayout";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import * as types from "../../types/index"
import { useDispatch, useSelector } from 'react-redux';
import { IRootUserState } from '../../types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateProfile } from '../../services/usersApi';
import ProfilePicture from '../../components/ProfilePicture';
import { userActions } from '../../store/reducers/userReducers';
import toast from 'react-hot-toast';

const ProfilePage = () => {

    const dispatch = useDispatch()
    const userState = useSelector((state: IRootUserState) => state.user.userInfo)
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: profileData, isError, isLoading } = useQuery({
        queryFn: () => {
            return getUserProfile({ token: userState.token });
        },
        queryKey: ['profile']
    })


    const { mutate, isLoading: isUpdating } = useMutation({
        mutationFn: ({ name, email, password }: { name: string, email: string, password: string }) => {
            return updateProfile({
                token: userState.token,
                userData: { name, email, password }
            })
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
            queryClient.invalidateQueries(["profile"]);
            toast.success("Profile updated sucessfully")

        },
        onError: (error) => {

        }
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

    const submitHandler = (data: types.IRegisterFormData) => {
        const { name, email, password } = data;
        mutate({ name, email, password });
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
                                New Password (optional)
                            </label>
                            <input
                                {...register("password")}
                                type="password"
                                id='password'
                                placeholder='Eneter new password'
                                className={`placeholder:text-[#959ead] text-dark-hard mb-3 rounded-lg 
                                px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${errors.password ? "border-red-500" : "border-[#c3cad9]"}`}

                            />
                            {errors.password?.message && (
                                <span className='text-red-500 text-xs mt-1'>{errors.password.message}</span>
                            )}
                        </div>


                        <button
                            type='submit'
                            disabled={!isValid || isLoading || isUpdating}
                            className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed'>
                            Update
                        </button>

                    </form>

                </div>

            </section>
        </MainLayout>
    )
}

export default ProfilePage