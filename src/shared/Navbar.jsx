import React from 'react';
import logo from '../assets/doodle.png';
import { Link } from 'react-router-dom';
import plus from '../assets/plus.png';

const Navbar = () => {
    return (
        <div className='bg-white fixed top-0 left-0 right-0 z-10'>
            <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl flex justify-center md:justify-between px-10 py-2 mx-auto">
                <img src={logo} alt="DoodleLogo" className='w-28 hidden md:block' />
                <div className="flex text-slate-800">
                    <ul className="flex items-center gap-6 lg:gap-20 text-xl font-bold">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/favorites'>Favorites</Link></li>
                        <li className='bg-slate-300 hover:bg-slate-600 hover:text-white rounded-md px-2 py-1'><Link to='/blog' className='flex items-center gap-1'><img src={plus} alt="plus" className='w-6' />New Blog</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;