import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const BlogContext = createContext();

const BlogProvider = ({children}) => {
    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://blogs-and-comments.onrender.com/blogs')
        .then(res => res.json())
        .then(data => {
            setBlogs(data);
            setLoading(false);
        })
    }, [blogs])

    useEffect(() => {
        fetch('https://blogs-and-comments.onrender.com/comments')
        .then(res => res.json())
        .then(data => {
            setComments(data);
            setLoading(false);
        })
    }, [])

    const handleAddFavorite = async(blog) => {
        let favoriteBlog = [];

        //get the favorite-blog from session storage
        const storedBlog = sessionStorage.getItem('favorite-blog');
        if (storedBlog) {
            favoriteBlog = JSON.parse(storedBlog);
        }
        // add blog
        favoriteBlog.push(blog);
        sessionStorage.setItem('favorite-blog', JSON.stringify(favoriteBlog));
        Swal.fire({
            position: "bottom-end",
            width: 400,
            icon: "success",
            text: "Successfully added to favorite!",
            showConfirmButton: false,
            timer: 2500,
        });
    }
    
    const blogInfo = {blogs, loading, handleAddFavorite};
    
    return (
        <BlogContext.Provider value={blogInfo}>{children}</BlogContext.Provider>
    );
};

export default BlogProvider;