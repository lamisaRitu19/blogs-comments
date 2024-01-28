import React from 'react';
import heart from '../assets/heart.png';
import zoom from '../assets/zoom.png';
import { Link } from 'react-router-dom';

const Blog = ({blog}) => {
    const {id, title, body} = blog;

    const shortBody = body.slice(0, 120) + (body.length > 120 ? "..." : "");

    return (
        <div className='flex justify-between items-center bg-white border border-slate-200 rounded-xl drop-shadow-xl px-8 py-6 mb-8'>
            <div>
                <h3 className='text-slate-800 text-2xl font-semibold mb-2'>{title}</h3>
                <p className='text-slate-500 text-lg font-medium'>{shortBody}</p>
            </div>
            <div className='flex flex-col'>
                <button className='flex items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1 mb-3'><img src={heart} alt="heart" className='w-4' /><span className='text-lg font-semibold'>Add to favorite</span></button>
                <Link to={`/blogs/${id}`} className='flex justify-center items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1'><img src={zoom} alt="zoom" className='w-6' /><span className='text-lg font-semibold'>Details</span></Link>
            </div>
        </div>
    );
};

export default Blog;