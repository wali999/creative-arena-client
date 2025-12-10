import React from 'react';
import logoImg from '../assets/Creative-Arena-logo.png'
import logImg from '../assets/LogImg.png'
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Link to='/'>
                <div className='flex items-center'>
                    <img src={logoImg} className="inline-block fill-current w-[50px] h-[50px]" alt="" />
                    <h3 className='text-3xl font-bold ml-2'>creativeArena</h3>
                </div>
            </Link>
            <div className='flex items-center mt-5'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={logImg} className="inline-block fill-current h-[450px]" alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;