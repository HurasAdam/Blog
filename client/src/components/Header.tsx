import React, { useState } from 'react'
import { images } from '../constants'
import { MdKeyboardArrowDown, MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { headerLinks } from '../constants'
import { INavItemProps, IRootUserState } from '../types';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { logout } from '../store/actions/user';








const NavItem: React.FC<INavItemProps> = ({ item }) => {
    const [dropdown, setDrop] = useState<boolean>(false)


    const toggleDropdownHandler = (): void => {
        setDrop((prevState) => !prevState)
    }

    return (
        <li className=' relative group'>
            {item.type === "link" ? (<>
                <a href="/" className='px-4 py-2'>{item.name}</a>
                <span className=' cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100'>/</span>
            </>) : (
                <div className='flex flex-col items-center'>
                    <button className='px-4 py-2 flex gap-x-1 items-center' onClick={toggleDropdownHandler}>
                        <span>
                            {item.name}
                        </span>
                        <MdKeyboardArrowDown />
                    </button>

                    <div className={`${dropdown ? "block" : "hidden"
                        } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-[-85px] lg:right-[-10] lg:transform lg:traslate-y-full lg:group-hover:block w-max`}>
                        <ul className='bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden'>
                            {item.items?.map((page, index) => {
                                return (

                                    <a key={index} href="/" className='hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft'>
                                        {page}
                                    </a>

                                )
                            })}
                        </ul>
                    </div>
                </div>)}

        </li>
    )
}

const Header: React.FC = () => {
    const [navIsVisible, setNavIsVisible] = useState<boolean>(false);
    const [profileDrowpdown, setProfileDrowpdown] = useState<boolean>(false);
    const userState = useSelector((state: IRootUserState) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const navVisibilityHandler = (): void => {
        setNavIsVisible((prevState) => !prevState)
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <section className='sticky top-0 left-0 right-0 z-50 bg-white'>
            <header className='container mx-auto px-5 flex justify-between py-4 items-center'>
                <div>
                    <img className='w-16' src={images.Logo} alt="logo" />
                </div>

                <div className=' lg:hidden z-[50]'>
                    {navIsVisible ? <IoMdClose className='w-6 h-6' onClick={navVisibilityHandler} /> : <MdOutlineMenu onClick={navVisibilityHandler} className='w-6 h-6' />}
                </div>

                <div className={`${navIsVisible ? "right-0" : "-right-full"} flex flex-col w-full lg:w-auto  justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0  lg:static  gap-x-9 items-center z-[49] mt-[56px] transition-all duration-300  lg:mt-0 bg-dark-hard lg:bg-transparent`}>
                    <ul className='text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold'>
                        {headerLinks.map((item) => {
                            return (
                                <NavItem key={item.name} item={item} />
                            )
                        })}
                    </ul>
                    {userState.userInfo ? (
                        <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
                            <div className="relative group">
                                <div className="flex flex-col items-center">
                                    <button
                                        className="flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                                        onClick={() => setProfileDrowpdown(!profileDrowpdown)}
                                    >
                                        <span>Account</span>
                                        <MdKeyboardArrowDown />
                                    </button>
                                    <div
                                        className={`${profileDrowpdown ? "block" : "hidden"
                                            } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                                    >
                                        <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                                            {userState?.userInfo?.admin && (
                                                <button
                                                    onClick={() => navigate("/admin")}
                                                    type="button"
                                                    className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                                                >
                                                    Admin Dashboard
                                                </button>
                                            )}

                                            <button
                                                onClick={() => navigate("/profile")}
                                                type="button"
                                                className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                                            >
                                                Profile Page
                                            </button>
                                            <button
                                                onClick={logoutHandler}
                                                type="button"
                                                className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                                            >
                                                Logout
                                            </button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </header>
        </section>
    )
}

export default Header