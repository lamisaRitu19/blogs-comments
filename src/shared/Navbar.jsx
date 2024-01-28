import React from 'react';
import logo from '../assets/doodle.png';

const Navbar = () => {
    return (
        <div className="flex justify-between py-2">
            <img src={logo} alt="DoodleLogo" className='w-28' />
            <div className="hidden lg:flex">
                <ul className="flex items-center gap-20 text-xl font-medium">
                    <li><a href='/'>Home</a></li>
                    <li><a href='/favorite'>Favorite</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;