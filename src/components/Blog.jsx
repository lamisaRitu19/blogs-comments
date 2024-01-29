import React, { useContext } from 'react';
import heart from '../assets/heart.png';
import remove from '../assets/remove.png';
import zoom from '../assets/zoom.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BlogContext } from '../context/BlogProvider';

const Blog = ({blog}) => {
    const {id, title, body} = blog;
    const { handleAddFavorite } = useContext(BlogContext);
    const shortBody = body.slice(0, 120) + (body.length > 120 ? "..." : "");
    const location = useLocation();
    const navigate = useNavigate();

    const handleRemoveFavorite = async(id) => {
        let favoriteBlog = [];

        //get the favorite-blog from session storage
        const storedBlog = sessionStorage.getItem('favorite-blog');
        if (storedBlog) {
            favoriteBlog = JSON.parse(storedBlog);
        }
        // remove blog
        const newFavoriteBlog = favoriteBlog.filter(blog => blog.id !== id);
        sessionStorage.setItem('favorite-blog', JSON.stringify(newFavoriteBlog));
        Swal.fire({
            position: "bottom-end",
            width: 400,
            icon: "success",
            text: "Successfully removed from favorite!",
            showConfirmButton: false,
            timer: 2500,
        });
        navigate('/');
    }

    return (
        <div className='lg:flex justify-between items-center gap-6 bg-white border border-slate-200 rounded-xl drop-shadow-xl px-8 py-6 mb-8'>
            <div className='mb-3 lg:mb-0'>
                <h3 className='text-slate-800 text-2xl font-semibold mb-2'>{title}</h3>
                <p className='text-slate-500 text-lg font-medium'>{shortBody}</p>
            </div>
            <div className=''>
                {
                    location.pathname.includes('/favorites') ? <button onClick={() => handleRemoveFavorite(id)} className='w-full flex justify-center items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1 mb-3'><img src={remove} alt="remove" className='w-6' /><span className='text-lg font-semibold'>Remove from favorite</span></button> : <button onClick={() => handleAddFavorite(blog)} className='w-full flex justify-center items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1 mb-3'><img src={heart} alt="heart" className='w-4' /><span className='text-lg font-semibold'>Add to favorite</span></button>
                }
                <Link to={`/blogs/${id}`} className='flex justify-center items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1'><img src={zoom} alt="zoom" className='w-6' /><span className='text-lg font-semibold'>Details</span></Link>
            </div>
        </div>
    );
};

export default Blog;