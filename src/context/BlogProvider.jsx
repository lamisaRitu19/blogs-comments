import React, { createContext, useEffect, useState } from 'react';

export const BlogContext = createContext();

const BlogProvider = ({children}) => {
    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/blogs')
        .then(res => res.json())
        .then(data => {
            setBlogs(data);
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/comments')
        .then(res => res.json())
        .then(data => {
            setComments(data);
            setLoading(false);
        })
    }, [])
    
    const blogInfo = {blogs, loading};
    
    return (
        <BlogContext.Provider value={blogInfo}>{children}</BlogContext.Provider>
    );
};

export default BlogProvider;