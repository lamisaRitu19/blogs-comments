import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import BlogComments from "../pages/BlogComments";
import NewBlog from "../pages/NewBlog";
import { BlogCommentsLoader } from "../loader/BlogCommentsLoader";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/blog",
                element: <NewBlog></NewBlog>
            },
            {
                path: "/blog/:_id",
                element: <NewBlog></NewBlog>
            },
            {
                path: "/favorites",
                element: <Favorites></Favorites>
            },
            {
                path: "/blogs/:_id",
                loader: BlogCommentsLoader,
                element: <BlogComments></BlogComments>
            }
        ]
    },
]);

export default router;