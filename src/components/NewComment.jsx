import React from 'react';
import save from '../assets/save.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const NewComment = ({_id}) => {
    const navigate = useNavigate();

    const handleCreateComment = async(event) => {
        try{
            event.preventDefault();
            const form = event.target;
            const blogId = parseInt(_id);
            const id = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
            const name = form.name.value;
            const email = form.email.value;
            const body = form.body.value;
            const data = {blogId, id, name, email, body};

            const response = await fetch("http://localhost:5000/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            Swal.fire({
                position: "bottom-end",
                width: 400,
                icon: "success",
                text: "Successfully created a new comment!",
                showConfirmButton: false,
                timer: 2500,    
            });
            await form.reset();
            navigate('/');
        }catch (error) {
            console.error("From create comment", error);
        }
    }

    return (
        <form onSubmit={handleCreateComment} className='flex items-center gap-6 text-slate-500 mx-8 mb-4'>
            <div>
                <div className='flex items-center gap-1 mb-1'>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="input bg-slate-200 border border-slate-100 w-96 h-10 rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="input bg-slate-200 border border-slate-100 w-96 h-10 rounded-md"
                        required
                    />
                </div>
                <input
                    type="text"
                    name="body"
                    placeholder="Body"
                    className="input bg-slate-200 border border-slate-100 w-[773px] h-10 rounded-md"
                    required
                />
            </div>
            <div>
                <button className='flex items-center gap-2 bg-slate-300 hover:bg-slate-600 text-slate-900 hover:text-white rounded-lg drop-shadow-md px-3 py-1 my-5'>
                    <img src={save} alt="save" className='w-6' />
                    <span className='text-lg font-semibold'>Save</span>
                </button>
            </div>
        </form>
    );
};

export default NewComment;