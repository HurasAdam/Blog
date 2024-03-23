import React, { useEffect } from 'react';
import MainLayout from "../../components/MainLayout";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/usersApi"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/reducers/userReducers';
import { IRootUserState } from '../../types';

const LoginPage = () => {

    const dispatch = useDispatch()
    const userState = useSelector((state: IRootUserState) => state.user.userInfo)
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ name, email, password }) => login({ email, password }),
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })
    console.log(userState)
    useEffect(() => {
        if (userState) {
            navigate("/")
        }
    }, [userState, navigate])


    console.log(userState)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const { email, password } = data;
        mutate({ email, password })
    }

    return (

        <MainLayout>
            <section className='container mx-auto px-5 py-10'>
                <div className='w-full max-w-sm mx-auto'>
                    <h1 className='font-robot text-2xl font-bold text-center text-dark-hards mb-8'>
                        Login
                    </h1>
                    <form onSubmit={handleSubmit(submitHandler)}>



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


                        <Link
                            to="/forget-password"
                            className='text-sm font-semibold text-primary'>
                            Forgot Password?
                        </Link>
                        <button
                            type='submit'
                            disabled={!isValid || isLoading}
                            className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed'>
                            Sign In
                        </button>
                        <p
                            className='text-sm font-semibold text-[#5a7184]'
                        >
                            Dont have an account?
                            <Link
                                to="/register"
                                className='text-primary ml-1'
                            >

                                Register now</Link>
                        </p>
                    </form>

                </div>

            </section>
        </MainLayout>
    )
}

export default LoginPage