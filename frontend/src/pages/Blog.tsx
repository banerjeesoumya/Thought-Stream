import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { FullBlog } from "../component/FullBlog"
import { Loader } from "../component/Loader"
import { Appbar } from "../component/Appbar"
import { Footer } from "./Blogs"

export const Blog = () => {
    const { id } = useParams()

    const { loading, blog } = useBlog({
        id: id || ""
    })

    if (loading || !blog) {
        return <div>
            <Appbar />
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Loader />
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    }

    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    )
}