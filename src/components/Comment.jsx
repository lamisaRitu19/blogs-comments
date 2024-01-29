import React, { useState } from 'react';
import save from '../assets/save.png';
import edit from '../assets/edit.png';
import del from '../assets/delete.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Comment = ({comment, blogId}) => {
    const {id, name, email, body} = comment;
    const [editable, setEditable] = useState(false);
    const navigate = useNavigate();

    const handleEditComment = async(event) => {
        try{
            event.preventDefault();
            const form = event.target;
            const comName = form.comName.value;
            const comEmail = form.comEmail.value;
            const comBody = form.comBody.value;
            const data = {blogId, id, name: comName, email: comEmail, body: comBody};

            const response = await fetch(`https://blogs-and-comments.onrender.com/comments/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            await response.json();

            // comment data edit in session storage
            // let blogComArr = [];
            // const storedBlog = sessionStorage.getItem('blog-comments');
            // if (storedBlog) {
            //     blogComArr = JSON.parse(storedBlog);
            // }
            // const otherBlogs = blogComArr.filter(b => b.blogDetails.id !== blogId);
            // const selectedBlog = blogComArr.find(b => b.blogDetails.id === blogId);
            // const otherComments = selectedBlog?.blogComments?.filter(b => b.id !== id);
            // let selectedComment = selectedBlog?.blogComments?.find(b => b.id === id);
            // selectedComment.name = comName;
            // selectedComment.email = comEmail;
            // selectedComment.body = comBody;
            // otherComments.push(selectedComment);
            // otherBlogs.push(selectedBlog)
            // sessionStorage.setItem('blog-comments', JSON.stringify(otherBlogs));

            Swal.fire({
                position: "bottom-end",
                width: 400,
                icon: "success",
                text: "Successfully updated the comment!",
                showConfirmButton: false,
                timer: 2500,
            });
            setEditable(false);
        }catch (error) {
            console.error("From update comment", error);
        }
    }

    const handleDeleteComment = async() =>{
        try {
            const deleteComment = {
                deleteId: id,
            };

            const response = await fetch(
                `https://blogs-and-comments.onrender.com/comments`, {
                    method: "Delete",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(deleteComment),
                }
            );

            await response.json();

            // comment data edit in session storage
            // let blogComArr = [];
            // const storedBlog = sessionStorage.getItem('blog-comments');
            // if (storedBlog) {
            //     blogComArr = JSON.parse(storedBlog);
            // }
            // const otherBlogs = blogComArr.filter(b => b.blogDetails.id !== blogId);
            // const selectedBlog = blogComArr.find(b => b.blogDetails.id === blogId);
            // const otherComments = selectedBlog?.blogComments?.filter(b => b.id !== id);
            // otherBlogs.push(selectedBlog)
            // sessionStorage.setItem('blog-comments', JSON.stringify(otherBlogs));

            Swal.fire({
                position: "bottom-end",
                width: 400,
                icon: "success",
                text: "Comment deleted successfully!",
                showConfirmButton: false,
                timer: 2500,
            });
            navigate('/');
        } catch (error) {
            console.error("Comment delete error", error);
        }
    }
    
    return (
        <div className='mx-4 lg:mx-8 mb-4'>
            <form onSubmit={handleEditComment} className='xl:flex items-center gap-6 text-slate-500 mb-2'>
                <div>
                    <div className='lg:flex items-center gap-1 mb-1'>
                        <input
                            type="text"
                            name="comName"
                            defaultValue={name}
                            disabled={!editable}
                            placeholder="Name"
                            className="input bg-slate-200 text-slate-800 text-lg font-medium disabled:text-slate-800 disabled:text-lg disabled:font-medium border border-slate-100 w-full lg:w-96 h-10 rounded-md"
                        />
                        <input
                            type="text"
                            name="comEmail"
                            defaultValue={email}
                            disabled={!editable}
                            placeholder="Email"
                            className="input bg-slate-200 font-medium disabled:font-medium border border-slate-100 w-full lg:w-96 h-10 rounded-md"
                        />
                    </div>
                    <input
                        type="text"
                        name="comBody"
                        defaultValue={body}
                        disabled={!editable}
                        placeholder="Body"
                        className="input bg-slate-200 font-medium disabled:font-medium border border-slate-100 w-full lg:w-[773px] h-10 rounded-md"
                    />
                </div>
                <div className='flex gap-3'>
                    {
                        editable && <button className='flex items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1 my-5'>
                            <img src={save} alt="save" className='w-6' />
                            <span className='text-lg font-semibold'>Save</span>
                        </button>
                    }
                    {
                        editable || <>
                            <button onClick={() => setEditable(true)} type='button' className='flex items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1 my-5'>
                                <img src={edit} alt="edit" className='w-5' />
                                <span className='text-lg font-semibold'>Edit</span>
                            </button>
                            <button onClick={handleDeleteComment} type='button' className='flex items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1 my-5'>
                                <img src={del} alt="delete" className='w-6' />
                                <span className='text-lg font-semibold'>Delete</span>
                            </button>
                        </>
                    }
                </div>
            </form>
            <hr />
        </div>
    );
};

export default Comment;