import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import logoImg from '../../../assets/Creative-Arena-logo.png'
import avatarImg from '../../../assets/avatar.jpg'
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {

    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error);

            })
    }

    const links = <>
        <li><NavLink to=''>Home</NavLink></li>
        <li><NavLink to='/all-contests'>All Contests</NavLink></li>
        <li><NavLink to='/extra'>Xtra</NavLink></li>
        <li><NavLink to=''>About Us</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <div>
                    <Link to='/'>
                        <div className='flex justify-center items-center'>
                            <img src={logoImg} className="inline-block fill-current w-[50px] h-[50px]" alt="" />
                            <h3 className='text-3xl font-bold ml-2'>creativeArena</h3>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end relative">
                <div className='flex flex-row items-center gap-3'>
                    {/* Dropdown btn */}
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className='p-4 md:py-1 md:px-2  flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                    >

                        <div className='hidden md:block'>
                            {/* Avatar */}
                            <img
                                className='rounded-full'
                                referrerPolicy='no-referrer'
                                src={user && user.photoURL ? user.photoURL : avatarImg}
                                alt='profile'
                                height='40'
                                width='40'
                            />
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[7vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                        <div className='flex flex-col cursor-pointer'>
                            {user ? (
                                <>
                                    <div className='px-4 py-2 text-center  font-bold'>
                                        {user.displayName}
                                    </div>
                                    <Link
                                        to='/dashboard'
                                        className='px-4 py-2 hover:bg-neutral-100 transition font-semibold'
                                    >
                                        Dashboard
                                    </Link>
                                    <div
                                        onClick={handleLogout}
                                        className='px-4 py-2 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                    >
                                        Logout
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to='/login'
                                        className='px-4 py-2 hover:bg-neutral-100 transition font-semibold'
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to='/register'
                                        className='px-4 py-2 hover:bg-neutral-100 transition font-semibold'
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Navbar;