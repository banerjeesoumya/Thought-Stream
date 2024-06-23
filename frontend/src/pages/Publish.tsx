import axios from "axios"
import { Appbar } from "../component/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const Publish = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate();

    let token = null;
    if (localStorage.getItem("SignInToken") !== null) {
        token = localStorage.getItem("SignInToken");
    } else {
        token = localStorage.getItem("SignUpToken");
    }

    useEffect(() => {
        if (token === null) {
            alert (`You are not logged into ThoughtStream especially in publishing section`);
            navigate(`/signin`);
        }
    }, [token, navigate]);

    if (token === null) {
        return null;
    }

    const handleBlogPost = async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog/publish`, {
            title,
            content : description
        }, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        navigate(`/blog/${response.data.message}`)
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8 mb-64">
                <div className="max-w-screen-lg w-full">
                    <input onChange={(e) => {
                        setTitle(e.target.value)
                    }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title"  />

                    <TextEditor onChange = {(e) => {
                        setDescription(e.target.value)
                    }} />
                    <button onClick={handleBlogPost} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    )
}
 

function TextEditor({ onChange } : { onChange : (e : ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <div>
            <div>
            <div className="w-full mb-4">
                <div className="flex items-center justify-between rounded-b-lg  border-b">
                    <div className="my-2 py-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea onChange={onChange} id="editor" rows = {8} className="focus:outline-none pl-2 block w-full px-0 text-sm text-gray-800 bg-white border-0" placeholder="Write an article..." required ></textarea>
                    </div> 
                </div>
            </div>
        </div>

        </div>
    )
}