/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface Blog {
    content: string
    title : string
    id: number
    author: {
        name: string
    }
    createdAt: string
}

export const useBlog = ({ id } : { id : string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    let token = null;
    if (localStorage.getItem("SignInToken") !== null) {
        token = localStorage.getItem("SignInToken");
    } else {
        token = localStorage.getItem("SignUpToken");
    }

    
    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true)
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}` , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setBlog(response.data.message)
            setLoading(false)
        };
        fetchBlog()
    }, [])

    return {
        loading, 
        blog
    }
}








export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const navigate = useNavigate();

    let token = null;
    if (localStorage.getItem("SignInToken") !== null) {
        token = localStorage.getItem("SignInToken");
    } else {
        token = localStorage.getItem("SignUpToken");
    }

    useEffect(() => {
        const fetching = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const fetchedBlogs = response.data.message.map((blog: Blog) => ({
                    id: blog.id,
                    title: blog.title,
                    content: blog.content,
                    author: {
                        name: blog.author.name
                    },
                    createdAt: blog.createdAt 
                }));
                setBlogs(fetchedBlogs);
                setLoading(false);
            } catch (e) {
                alert("You are not logged in to ThoughtStream")
                navigate('/signin')
            }
        }
        fetching()
    }, []); 

    return {
        loading,
        blogs,
    };
};



// let token = null;
//     if (localStorage.getItem("SignInToken") !== null) {
//         token = localStorage.getItem("SignInToken");
//     } else {
//         token = localStorage.getItem("SignUpToken");
//     }