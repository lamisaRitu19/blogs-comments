import React, { useContext, useEffect, useState } from 'react';
import { Link, useActionData, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import heart from '../assets/heart.png';
import edit from '../assets/edit.png';
import del from '../assets/delete.png';
import Comment from '../components/Comment';
import { BlogContext } from '../context/BlogProvider';
import Swal from 'sweetalert2';
import NewComment from '../components/NewComment';

const BlogComments = () => {
    const {blog, comments} = useLoaderData();
    const {_id} = useParams();
    const { handleAddFavorite } = useContext(BlogContext);
    const navigate = useNavigate();
    
    const handleDeleteBlog = async() =>{
        try {
            const deleteBlog = {
                deleteId: _id,
            };

            const response = await fetch(
                `https://blogs-and-comments.onrender.com/blogs`, {
                    method: "Delete",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(deleteBlog),
                }
            );

            await response.json();

            // blog data edit in session storage
            let blogComArr = [];
            const storedBlog = sessionStorage.getItem('blog-comments');
            if (storedBlog) {
                blogComArr = JSON.parse(storedBlog);
            }
            const otherBlogs = blogComArr.filter(b => b.blogDetails.id !== parseInt(_id));
            sessionStorage.setItem('blog-comments', JSON.stringify(otherBlogs));

            Swal.fire({
                position: "bottom-end",
                width: 400,
                icon: "success",
                text: "Blog deleted successfully!",
                showConfirmButton: false,
                timer: 2500,
            });
            navigate('/');
        } catch (error) {
            console.error("Blog delete error", error);
        }
    }
    
    return (
        <div className='screen-height pt-20 md:pt-28'>   
            <div className='bg-white border border-slate-200 rounded-xl drop-shadow-xl px-12 py-6 mb-8'>
                <h3 className='text-slate-800 text-3xl font-semibold mb-2'>{blog?.title}</h3>
                <p className='text-slate-500 text-xl font-medium mb-4'>{blog?.body}</p>
                <hr /> 
                <div className='flex items-center gap-6'>
                    <button onClick={() => handleAddFavorite(blog)} className='flex items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1 my-5'>
                        <img src={heart} alt="heart" className='w-4' />
                        <span className='text-lg font-semibold'>Add to favorite</span>
                    </button>
                    <button className='bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1 my-5'>
                        <Link to={`/blog/${blog?.id}`} className='flex items-center gap-2'>
                            <img src={edit} alt="edit" className='w-5' />
                            <span className='text-lg font-semibold'>Edit</span>
                        </Link>
                    </button>
                    <button onClick={handleDeleteBlog} className='flex items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1 my-5'>
                        <img src={del} alt="delete" className='w-6' />
                        <span className='text-lg font-semibold'>Delete</span>
                    </button>
                </div>
                <div className=''>
                    {
                        comments?.map(comment => <Comment key={comment.id} comment={comment} blogId={_id}></Comment>)
                    }
                    <NewComment _id={_id}></NewComment>
                </div>
            </div> 
        </div>
    );
};

export default BlogComments;