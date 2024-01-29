import React, { useContext } from 'react';
import blog from '../assets/blog.png';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogProvider';
import Swal from 'sweetalert2';

const NewBlog = () => {
    const {_id} = useParams();
    const { blogs, loading } = useContext(BlogContext);
    const navigate = useNavigate();
    let uId, bTitle, bBody;

    if (_id && !loading){
        const blog = blogs?.find(blog => blog.id === parseInt(_id));
        uId = blog.userId;
        bTitle = blog.title;
        bBody = blog.body;
    }
    
    const handleUpdateBlog = async(event) => {
        try{
            event.preventDefault();
            const form = event.target;
            const userId = uId;
            const title = form.title.value;
            const body = form.body.value;
            const id = parseInt(_id);
            const data = {userId, id, title, body};

            const response = await fetch(`https://blogs-and-comments.onrender.com/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            await response.json();

            // blog data edit in session storage
            let blogComArr = [];
            const storedBlog = sessionStorage.getItem('blog-comments');
            if (storedBlog) {
                blogComArr = JSON.parse(storedBlog);
            }
            const otherBlogs = blogComArr.filter(b => b.blogDetails.id !== id);
            const selectedBlog = blogComArr.find(b => b.blogDetails.id === id);
            selectedBlog.blogDetails.title = title;
            selectedBlog.blogDetails.body = body;
            otherBlogs.push(selectedBlog);
            sessionStorage.setItem('blog-comments', JSON.stringify(otherBlogs));

            Swal.fire({
                position: "bottom-end",
                width: 400,
                icon: "success",
                text: "Successfully updated the blog!",
                showConfirmButton: false,
                timer: 2500,
            });
            navigate(`/blogs/${_id}`);
        }catch (error) {
            console.error("From update blog", error);
        }
    }

    const handleCreateBlog = async(event) => {
        try{
            event.preventDefault();
            const form = event.target;
            const userId = parseInt(form.userId.value);
            const title = form.title.value;
            const body = form.body.value;
            const id = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
            const data = {userId, id, title, body};
            console.log(data);

            const response = await fetch("https://blogs-and-comments.onrender.com/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            await response.json();
            Swal.fire({
                position: "bottom-end",
                width: 400,
                icon: "success",
                text: "Successfully created a new blog!",
                showConfirmButton: false,
                timer: 2500,    
            });
            await form.reset();
            navigate('/');
        }catch (error) {
            console.error("From create blog", error);
        }
    }
    
    return (
        <div className='screen-height pt-32'>
            <h1 className='flex justify-center items-center gap-3 text-slate-800 text-4xl text-center font-bold mb-6'><img src={blog} alt="blog" className='w-10' />
                {
                    _id ? <span>Update</span> : <span>Create</span>
                }
                <span> Blog</span>
            </h1>
            <form onSubmit={_id ? handleUpdateBlog : handleCreateBlog} className='lg:w-1/2 bg-white border border-slate-200 rounded-xl drop-shadow-xl px-12 py-6 mx-auto mb-4'>
                <div className='mb-2'>
                    <label className="label">
                        <span className="text-xl font-bold leading-5">
                            User ID
                        </span>
                    </label>
                    <input
                        type="number"
                        name="userId"
                        defaultValue={uId}
                        disabled={uId}
                        placeholder="Your id..."
                        className="input bg-slate-200 border border-slate-300 w-full"
                        required
                    />
                </div>
                <div className='mb-2'>
                    <label className="label">
                        <span className="text-xl font-bold leading-5">
                            Title
                        </span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={bTitle}
                        placeholder="Title of blog..."
                        className="input bg-slate-200 border border-slate-300 w-full"
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className="label">
                        <span className="text-xl font-bold leading-5">
                            Body
                        </span>
                    </label>
                    <textarea
                        type="text"
                        name="body"
                        rows="20"
                        defaultValue={bBody}
                        placeholder="Body of blog..."
                        className="input bg-slate-200 border border-slate-300 w-full py-2"
                        required
                    ></textarea>
                </div>
                <button className='bg-slate-500 text-white text-xl font-medium rounded-md px-6 py-2'>Save</button>
            </form>
        </div>
    );
};

export default NewBlog;