import React from 'react';
import logo from '../assets/doodle.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='bg-white'>
            <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl flex justify-between px-10 py-2 mx-auto">
                <img src={logo} alt="DoodleLogo" className='w-28' />
                <div className="hidden lg:flex">
                    <ul className="flex items-center gap-20 text-xl font-semibold">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/favorites'>Favorites</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;