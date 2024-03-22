import React from 'react';
import MainLayout from "../../components/MainLayout";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

const RegisterPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const submitHandler = (data) => {
        console.log(data)
    }

    return (

        <MainLayout>
            <section className='container mx-auto px-5 py-10'>
                <div className='w-full max-w-sm mx-auto'>
                    <h1 className='font-robot text-2xl font-bold text-center text-dark-hards mb-8'>
                        Sign up
                    </h1>
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

                        <div className='flex flex-col mb-6 w-full'>
                            <label
                                htmlFor="confirmPassword"
                                className='text-[#5a7184] font-semibold block'>
                                Confirm Password
                            </label>
                            <input
                                {...register("confirmPassword", {
                                    required: {
                                        value: true,
                                        message: "Confirm Password is required"
                                    },
                                    validate: (value) => {
                                        const password = watch("password")
                                        if (value !== password) {
                                            return "Passwords do not match."
                                        }
                                    }
                                })}
                                type="password"
                                id='confirmPassword'
                                placeholder='Eneter confirm password'
                                className={`placeholder:text-[#959ead] text-dark-hard mb-3 rounded-lg 
                                px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"}`}
                            />
                            {errors.confirmPassword?.message && (
                                <span className='text-red-500 text-xs mt-1'>{errors.confirmPassword.message}</span>
                            )}
                        </div>
                        <Link
                            to="/forget-password"
                            className='text-sm font-semibold text-primary'>
                            Forgot Password?
                        </Link>
                        <button
                            type='submit'
                            disabled={!isValid}
                            className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed'>
                            Register
                        </button>
                        <p
                            className='text-sm font-semibold text-[#5a7184]'
                        >
                            Already have an account?
                            <Link
                                to="/login"
                                className='text-primary ml-1'
                            >

                                Login now</Link>
                        </p>
                    </form>

                </div>

            </section>
        </MainLayout>
    )
}

export default RegisterPage