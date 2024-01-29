export const BlogCommentsLoader = async({params}) => {
    const _id = parseInt(params._id);

    let blogComArr = [], blog, comments;
    //get the blog-comments from session storage
    const storedBlog = sessionStorage.getItem('blog-comments');
    if (storedBlog) {
        blogComArr = JSON.parse(storedBlog);
    }

    if (blogComArr.length === 0){
        // fetching the blog data from the given id 
        const responseBlog = await fetch(`http://localhost:5000/blogs/${_id}`);
        blog = await responseBlog.json();
        // fetching the blog comments from the given id of blog 
        const response = await fetch(`http://localhost:5000/comments/${_id}`);
        comments = await response.json();

        // add blog
        const blogObj = {blogDetails: blog, blogComments: comments};
        blogComArr.push(blogObj);
        sessionStorage.setItem('blog-comments', JSON.stringify(blogComArr));
    }
    else{
        const selectedBlog = blogComArr.find(b => b.blogDetails.id === _id);
        if (selectedBlog){
            blog = selectedBlog.blogDetails;
            comments = selectedBlog.blogComments;
        }
        else{
            // fetching the blog data from the given id 
            const responseBlog = await fetch(`http://localhost:5000/blogs/${_id}`);
            blog = await responseBlog.json();
            // fetching the blog comments from the given id of blog 
            const response = await fetch(`http://localhost:5000/comments/${_id}`);
            comments = await response.json();

            // add blog
            const blogObj = {blogDetails: blog, blogComments: comments};
            blogComArr.push(blogObj);
            sessionStorage.setItem('blog-comments', JSON.stringify(blogComArr));
        }
    }

    return { blog, comments };
}