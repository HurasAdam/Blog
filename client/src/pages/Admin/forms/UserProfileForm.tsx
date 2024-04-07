import React, { useMemo } from 'react';

import { useForm } from "react-hook-form";

import * as types from "../../types/index"
import { useDispatch, useSelector } from 'react-redux';
import { IRootUserState } from '../../types';
import { useQueryClient } from '@tanstack/react-query';


import { userActions } from '../../store/reducers/userReducers';
import toast from 'react-hot-toast';
import ProfilePicture from '../../../components/ProfilePicture';

const UserProfileForm: React.FC = ({ userProfileData, isProfileDataLoading, isAdmin, handleSave }) => {

    const dispatch = useDispatch()
    const userState = useSelector((state: IRootUserState) => state.user.userInfo)

    const queryClient = useQueryClient();






    const {
        register, handleSubmit, watch, getValues, formState: { errors, isValid } } = useForm({
            defaultValues: {
                name: isAdmin ? (userProfileData ? userProfileData?.name : "") : "",
                email: isAdmin ? (userProfileData ? userProfileData?.email : "") : "",
                password: "",
                ...(isAdmin && userProfileData && { verified: userProfileData.verified }),
                ...(isAdmin && userProfileData && { admin: userProfileData.admin }),
            }, values: useMemo(() => {

                if (isAdmin)
                    return {
                        name: userProfileData ? userProfileData?.name : "",
                        email: userProfileData ? userProfileData?.email : "",
                        password: "",
                        verified: userProfileData ? userProfileData?.verified : "",
                        admin: userProfileData ? userProfileData?.admin : "",

                    }
                else {
                    return {
                        name: userProfileData ? userProfileData?.name : "",
                        email: userProfileData ? userProfileData?.email : "",
                        password: ""
                    }
                }
            }, [userProfileData?.name, userProfileData?.email, isProfileDataLoading]),

            mode: "onChange",
        });
    const val = getValues()

    console.log(userProfileData)

    const submitHandler = (data: types.IRegisterFormData) => {

        const reqestData = { ...data }

        if (isAdmin) {
            reqestData.userId = userProfileData?._id
        }
        console.log(reqestData)
        console.log("reqestData")
        handleSave({ formData: reqestData, token: userState?.token })
    }
    if (isAdmin) {
        return (


            <div className='w-full max-w-sm mx-auto'>
                <ProfilePicture avatar={userProfileData?.avatar} />
                <form onSubmit={handleSubmit(submitHandler)} >

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
                    <div className='flex justify-between mb-6 w-full'>
                        <span className='text-[#5a7184] font-semibold block'>Admin Permissions</span>
                        <label className='flex cursor-pointer select-none items-center'>
                            <div className='relative'>
                                <input
                                    type='checkbox'
                                    defaultChecked={watch("admin")}
                                    {...register("admin")}
                                    className='sr-only'
                                />
                                <div
                                    className={`box block h-8 w-14 rounded-full ${watch("admin") ? 'bg-primary' : 'bg-slate-300'
                                        }`}
                                ></div>
                                <div
                                    className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${watch("admin") ? 'translate-x-full' : ''
                                        }`}
                                ></div>
                            </div>
                        </label>
                    </div>
                    {/* verified */}
                    <div className='flex justify-between  mb-6 w-full'>
                        <span className='text-[#5a7184] font-semibold block'>Profile verified</span>
                        <label className='flex cursor-pointer select-none items-center'>
                            <div className='relative'>
                                <input
                                    type='checkbox'
                                    defaultChecked={watch("verified")}
                                    {...register("verified")}
                                    className='sr-only'
                                />
                                <div
                                    className={`box block h-8 w-14 rounded-full ${watch("verified") ? 'bg-primary' : 'bg-slate-300'
                                        }`}
                                ></div>
                                <div
                                    className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${watch("verified") ? 'translate-x-full' : ''
                                        }`}
                                ></div>
                            </div>
                        </label>
                    </div>


                    <button
                        type='submit'
                        disabled={!isValid || isProfileDataLoading}
                        className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed'>
                        Update
                    </button>

                </form>

            </div>


        )
    }
    return (


        <div className='w-full max-w-sm mx-auto'>
            <ProfilePicture avatar={userProfileData?.avatar} />
            <form >

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
                    disabled={!isValid || isProfileDataLoading}
                    className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed'>
                    Update
                </button>

            </form>

        </div>


    )
}

export default UserProfileForm