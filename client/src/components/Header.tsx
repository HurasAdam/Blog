import React, { useState } from 'react'
import { images } from '../constants'
import { MdKeyboardArrowDown, MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { headerLinks } from '../constants'





enum ItemType {
    Link = 'link',
    Dropdown = 'dropdown',
}

type INavItemProps = {
    item: {
        name: string;
        type: ItemType | string;
        items?: string[];
    }
}


const NavItem: React.FC<INavItemProps> = ({ item }) => {
    return (
        <li className=' relative group'>
            {item.type === "link" ? <>
                <a href="/" className='px-4 py-2'>{item.name}</a>
                <span className='text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100'>/</span>
            </> : <>
                <a href="/" className='px-4 py-2 flex gap-x-1 items-center'>
                    <span>
                        {item.name}
                    </span>
                    <MdKeyboardArrowDown />
                </a>
                <div className='hidden transition-all duration-500 pt-4 absolute bottom-[-20] right-[-10] transform traslate-y-full group-hover:block w-max'>
                    <ul className='flex flex-col shadow-lg rounded-lg overflow-hidden'>
                        {item.items?.map((page) => {
                            return (

                                <a href="/" className='hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft'>
                                    {page}
                                </a>

                            )
                        })}
                    </ul>
                </div>
            </>}

        </li>
    )
}

const Header: React.FC = () => {
    const [navIsVisible, setNavIsVisible] = useState<boolean>(false);

    const navVisibilityHandler = (): void => {
        setNavIsVisible((prevState) => !prevState)
    }

    return (
        <section>
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
                    <button
                        className='mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300'

                    >Sign in</button>
                </div>
            </header>
        </section>
    )
}

export default Header