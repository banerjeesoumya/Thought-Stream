import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpSchema } from "@rickcodes2026/thought-stream-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

localStorage.removeItem("SignUpToken");
localStorage.removeItem("SignInToken");

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignUpSchema>({
        fullname: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function sendRequest() {
        setLoading(true);
        setError("");
        if (!postInputs) {
            setError("All fields are required");
            return;
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            console.log(response);
            if (response.data.token) {
                type === "signup" ? localStorage.setItem("SignUpToken", response.data.token) : localStorage.setItem("SignInToken", response.data.token);
                alert(response.data.message);
                localStorage.setItem("Name", response.data.name);
                navigate("/blogs");
            } else {
                setError(response.data.message);
            }
        } catch (e) {
            setError("An error occurred while processing your request.");
        }
        setLoading(false);
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-bold">
                            {type === "signin" ? "Login to your account" : "Create an account"}
                        </div>
                        <div className="text-slate-400">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign Up" : "Sign In"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        {type === "signup" && (
                            <LabelledInput
                                id="name"
                                title="Name"
                                placeholder="Soumya Banerjee..."
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        fullname: e.target.value
                                    });
                                }}
                            />
                        )}
                        <LabelledInput
                            id="email"
                            title="Username"
                            placeholder="something@gmail.com"
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    email: e.target.value
                                });
                            }}
                        />
                        <LabelledInput
                            id="password"
                            title="Password"
                            type="password"
                            placeholder="Soumya Banerjee..."
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    password: e.target.value
                                });
                            }}
                        />
                        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                        <button 
                            onClick={sendRequest} 
                            aria-label={type === "signup" ? (loading ? "Signing up..." : "Sign up") : (loading ? "Signing in..." : "Sign in")} 
                            type="button" 
                            className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            {type === "signup" ? (loading ? "Signing up..." : "Sign Up") : (loading ? "Signing in..." : "Sign In")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface LabelledInputType {
    title: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    id?: string;
}

function LabelledInput({ title, placeholder, onChange, type, id }: LabelledInputType) {
    return (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-semibold text-black pt-4">{title}</label>
            <input onChange={onChange} type={type || "text"} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    );
}
