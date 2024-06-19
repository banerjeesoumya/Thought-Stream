import { Appbar } from "../component/Appbar";
import { BlogCard } from "../component/BlogCard";
import { BlogsLoader } from "../component/BlogsLoader";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div>
                        <BlogsLoader />
                        <BlogsLoader />
                        <BlogsLoader />
                        <BlogsLoader />
                        <BlogsLoader />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center mb-20">
                <div>
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog.id} // Ensure each BlogCard has a unique key
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.createdAt}
                        />
                    ))}
                </div>
            </div>
            <div className="bottom-0.5">
                <Footer />
            </div>
        </div>
    );
};

export const Footer = () => {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 ThoughtStream. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <a href="#" className="text-xs hover:underline underline-offset-4">
                    Terms of Service
                </a>
                <a href="#" className="text-xs hover:underline underline-offset-4">
                    Privacy
                </a>
            </nav>
        </footer>
    );
};
