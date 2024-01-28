import Blog from '../components/Blog';
import blog from '../assets/blog.png';
import useBlogs from '../hooks/useBlogs';

const Home = () => {
    const [blogs] = useBlogs();
    
    return (
        <div className='pt-6'>
            <h1 className='flex justify-center items-center gap-3 text-4xl text-center font-bold mb-6'><img src={blog} alt="blog" className='w-10' /><span>All Blogs</span></h1>
            {
                blogs.map(blog => <Blog key={blog.id} blog={blog}></Blog>)
            }
        </div>
    );
};

export default Home;