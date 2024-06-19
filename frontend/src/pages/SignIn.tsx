import { Auth } from "../component/Auth";
import { Quote } from "../component/Quote";

export const SignIn = () => {
    // Remove items from localStorage
    localStorage.removeItem("SignInToken");
    localStorage.removeItem("SignInToken");
    localStorage.removeItem("Name");

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <Auth type="signin" />
                </div>
                <div className="hidden lg:block">
                    <Quote />
                </div>
            </div>
        </div>
    );
};
