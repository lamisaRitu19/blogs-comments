import React, { useEffect, useState } from 'react';
import useBlogs from '../hooks/useBlogs';
import { useParams } from 'react-router-dom';
import heart from '../assets/heart.png';
import Comment from '../components/Comment';

const BlogComments = () => {
    const [blogs, comments, loading, setLoading] = useBlogs();
    const {_id} = useParams();
    let blog, blogComments;
    if (!loading){
        blog = blogs?.find(blog => blog.id === parseInt(_id));
        blogComments = comments.filter(comment => comment.blogId === parseInt(_id));
    };
    

    console.log(_id, loading, blogs, comments);
    
    return (
        !loading && <div className='pt-6'>   
            <div className='bg-white border border-slate-200 rounded-xl drop-shadow-xl px-12 py-6 mb-8'>
                <h3 className='text-slate-800 text-3xl font-semibold mb-2'>{blog.title}</h3>
                <p className='text-slate-500 text-xl font-medium mb-4'>{blog.body}</p>
                <hr /> 
                <button className='flex items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1 my-5'><img src={heart} alt="heart" className='w-4' /><span className='text-lg font-semibold'>Add to favorite</span></button>
                <div className=''>
                    {
                        blogComments.map(comment => <Comment key={comment.id} comment={comment}></Comment>)
                    }
                </div>
            </div> 
        </div>
    );
};

export default BlogComments;