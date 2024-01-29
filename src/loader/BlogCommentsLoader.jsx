export const BlogCommentsLoader = async({params}) => {
    const _id = parseInt(params._id);
    // const { blogs } = useContext(BlogContext);

    const responseBlog = await fetch('http://localhost:5000/blogs');
    const resultBlog = await responseBlog.json();
    const blog = resultBlog?.find(blog => blog.id === _id);

    const response = await fetch(`http://localhost:5000/comments/${_id}`);
    const comments = await response.json();
    // console.log(blog, result);
  

    return { blog, comments };
}