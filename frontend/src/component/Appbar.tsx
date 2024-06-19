import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {

    const name = localStorage.getItem("Name") || "Anonymous";

    return (
        <div className="border-b flex justify-between px-10 py-4">
            <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-bold" >
                ThoughtStream
            </Link>
            <div>
                <Link to={'/publish'}>
                    <button className="mr-8 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                            New Blog
                        </span>
                    </button>
                </Link>
                <Avatar 
                    name={name}
                    size={"big"}
                />
            </div>
        </div>
    )
}