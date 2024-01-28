import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import BlogComments from "../pages/BlogComments";

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
                path: "/favorites",
                element: <Favorites></Favorites>
            },
            {
                path: "/blogs/:_id",
                element: <BlogComments></BlogComments>
            }
        ]
    },
]);

export default router;