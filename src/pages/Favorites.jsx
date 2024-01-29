import React, { useEffect, useState } from 'react';
import blog from '../assets/blog.png';
import Blog from '../components/Blog';

const Favorites = () => {
    const [favBlogs, setFavBlogs] = useState([]);
    useEffect(() => {
        //get the favorite-blog from session storage
        const storedBlog = sessionStorage.getItem('favorite-blog');
        if (storedBlog) {
            setFavBlogs(JSON.parse(storedBlog));
        }
    }, [])
    
    return (
        <div className='screen-height pt-32'>
            <h1 className='flex justify-center items-center gap-3 text-slate-800 text-4xl text-center font-bold mb-6'><img src={blog} alt="blog" className='w-10' /><span>Favorite Blogs</span></h1>
            {
                favBlogs.map(blog => <Blog key={blog.id} blog={blog}></Blog>)
            }
            {
                favBlogs.length === 0 && <p className='text-lg text-center font-medium mt-10'>------ There are no favorite blogs! ------</p>
            }
        </div>
    );
};

export default Favorites;