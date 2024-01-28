import { useEffect, useState } from "react";

const useBlogs = () => {
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

    return [blogs, comments, loading, setLoading];
}

export default useBlogs;