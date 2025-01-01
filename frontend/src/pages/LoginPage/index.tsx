import { useState } from "react";
import Astriek from "../../components/Common/Astriek";
import { NavLink, useNavigate } from "react-router";
import { userLogin } from "../../services/userServices";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/reducers/userSlice";

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {

    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setLoginDetails({
            ...loginDetails,
            [name]: value
        });
    }

    const onUserLoginSuccess = (data: any) => {
        dispatch(setUserDetails(data));
        navigate("/");
    };

    const onUserLoginError = (error: any) => {
        setError(error.message);
        setTimeout(() => {
            setError("")
        }, 4000);
    };

    const handleUserLogin = () => {
        userLogin({ ...loginDetails }, { onSuccess: onUserLoginSuccess, onError: onUserLoginError });
    }

    return (
        <div className="text-white flex flex-col gap-y-6">

            <div className="text-center text-4xl font-bold text-green-700 italic">Login</div>

            <div className="flex flex-col w-[400px] gap-y-2">
                <label>Username <Astriek /></label>
                <input value={loginDetails.username} name="username" onChange={handleInputChange} className="h-10 rounded-lg text-black px-4" placeholder="Enter Username or email" />
            </div>
            
            <div className="flex flex-col w-[400px] gap-y-2">
                <label>Password <Astriek /></label>
                <input value={loginDetails.password} name="password" onChange={handleInputChange} className="h-10 rounded-lg text-black px-4" placeholder="Enter Password" />
            </div>

            <div className="flex items-center justify-between">
                <span>Create an account?</span> <NavLink to="/register" className="underline text-blue-400 ml-1">Sign up</NavLink>
                <NavLink to="/forgot-password" className="hover:underline hover:text-blue-400 ml-auto">Forgot Password?</NavLink>
            </div>

            <div className="w-full flex flex-col">
                <button className="rounded-lg py-2 bg-emerald-500 font-bold text-lg tracking-[1px]" onClick={handleUserLogin}>Login</button>
                <p className="text-red-600 text-xs mt-2 h-4">{error}</p>
            </div>
        </div>
    );
};

export default LoginPage;
 