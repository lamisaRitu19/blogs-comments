import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import heart from '../assets/heart.png';
import edit from '../assets/edit.png';
import del from '../assets/delete.png';
import Comment from '../components/Comment';
import { BlogContext } from '../context/BlogProvider';
import Swal from 'sweetalert2';

const BlogComments = () => {
    const { blogs, comments, loading, handleEditBlog } = useContext(BlogContext);
    const {_id} = useParams();
    const navigate = useNavigate();
    let blog, blogComments;
    if (!loading){
        blog = blogs?.find(blog => blog.id === parseInt(_id));
        blogComments = comments.filter(comment => comment.blogId === parseInt(_id));
    };
    
    const handleDeleteBlog = async() =>{
        try {
            const deleteBlog = {
                deleteId: _id,
            };

            const response = await fetch(
                `http://localhost:5000/blogs`, {
                    method: "Delete",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(deleteBlog),
                }
            );

            const result = await response.json();
            Swal.fire({
                position: "bottom-end",
                width: 400,
                icon: "success",
                text: "Blog deleted successfully!",
                showConfirmButton: false,
                timer: 2500,
            });
            navigate('/');
            console.log("Successfully deleted message", result);
        } catch (error) {
            console.error("Blog delete error", error);
        }
    }
    // console.log(_id, loading, blogs, comments);
    
    return (
        !loading && <div className='screen-height pt-28'>   
            <div className='bg-white border border-slate-200 rounded-xl drop-shadow-xl px-12 py-6 mb-8'>
                <h3 className='text-slate-800 text-3xl font-semibold mb-2'>{blog?.title}</h3>
                <p className='text-slate-500 text-xl font-medium mb-4'>{blog?.body}</p>
                <hr /> 
                <div className='flex items-center gap-6'>
                    <button className='flex items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1 my-5'>
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
                        blogComments.map(comment => <Comment key={comment.id} comment={comment}></Comment>)
                    }
                </div>
            </div> 
        </div>
    );
};

export default BlogComments;