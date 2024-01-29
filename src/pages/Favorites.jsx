import React from 'react';
import blog from '../assets/blog.png';

const Favorites = () => {
    return (
        <div className='screen-height pt-32'>
            <h1 className='flex justify-center items-center gap-3 text-slate-800 text-4xl text-center font-bold mb-6'><img src={blog} alt="blog" className='w-10' /><span>Favorite Blogs</span></h1>
        </div>
    );
};

export default Favorites;