import React from 'react';
import blog from '../assets/blog.png';

const NewBlog = () => {
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

            const response = await fetch("http://localhost:5000/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            form.reset();
            console.log("Success:", result);
        }catch (error) {
            console.error("From create blog", error);
        }
    }
    
    return (
        <div className='screen-height pt-32'>
            <h1 className='flex justify-center items-center gap-3 text-slate-800 text-4xl text-center font-bold mb-6'><img src={blog} alt="blog" className='w-10' /><span>Create</span><span> Blog</span></h1>
            <form onSubmit={handleCreateBlog} className='w-1/2 bg-white border border-slate-200 rounded-xl drop-shadow-xl px-12 py-6 mx-auto mb-4'>
                <div className='mb-2'>
                    <label className="label">
                        <span className="text-xl font-bold leading-5">
                            User ID
                        </span>
                    </label>
                    <input
                        type="number"
                        name="userId"
                        // defaultValue={fstname}
                        // disabled={editable === 0}
                        placeholder="Your id..."
                        className="input bg-slate-200 border border-slate-300 w-full"
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
                        // defaultValue={fstname}
                        // disabled={editable === 0}
                        placeholder="Title of blog..."
                        className="input bg-slate-200 border border-slate-300 w-full"
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
                        // defaultValue={fstname}
                        // disabled={editable === 0}
                        placeholder="Body of blog..."
                        className="input bg-slate-200 border border-slate-300 w-full py-2"
                    ></textarea>
                </div>
                <button className='bg-slate-500 text-white text-xl font-medium rounded-md px-6 py-2'>Save</button>
            </form>
        </div>
    );
};

export default NewBlog;