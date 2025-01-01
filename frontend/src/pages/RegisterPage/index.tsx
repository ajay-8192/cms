import { useState } from "react";
import Astriek from "../../components/Common/Astriek";
import { NavLink, useNavigate } from "react-router";
import { createNewUser } from "../../services/userServices";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/reducers/userSlice";

type RegisterPageProps = {};

const RegisterPage: React.FC<RegisterPageProps> = () => {

    const [registerDetails, setRegsiterDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: ""
    });

    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setRegsiterDetails({
            ...registerDetails,
            [name]: value
        });
    }

    const onUserSignupSuccess = (data: any) => {
        dispatch(setUserDetails(data));
        navigate("/");
    };
    const onUserSignupError = (error: any) => {
        setError(error.message);
        setTimeout(() => {
            setError("")
        }, 4000);
    };

    const handleUserRegister = () => {
        createNewUser({ ...registerDetails }, { onSuccess: onUserSignupSuccess, onError: onUserSignupError });
    }

    return (
        <div className="text-white flex flex-col gap-y-6">

            <div className="text-center text-4xl font-bold text-green-700 italic">Register</div>

            <div className="flex flex-col w-[400px] gap-y-2">
                <label>First Name <Astriek /></label>
                <input value={registerDetails.firstname} name="firstname" onChange={handleInputChange} className="h-10 rounded-lg px-4 text-black" placeholder="First Name" />
            </div>
            
            <div className="flex flex-col w-[400px] gap-y-2">
                <label>Last Name <Astriek /></label>
                <input value={registerDetails.lastname} name="lastname" onChange={handleInputChange} className="h-10 rounded-lg px-4 text-black" placeholder="Last Name" />
            </div>

            <div className="flex flex-col w-[400px] gap-y-2">
                <label>email <Astriek /></label>
                <input value={registerDetails.email} name="email" onChange={handleInputChange} className="h-10 rounded-lg px-4 text-black" placeholder="Email address" />
            </div>
            
            <div className="flex flex-col w-[400px] gap-y-2">
                <label>Username <Astriek /></label>
                <input value={registerDetails.username} name="username" onChange={handleInputChange} className="h-10 rounded-lg px-4 text-black" placeholder="username" />
            </div>
            
            <div className="flex flex-col w-[400px] gap-y-2">
                <label>Password <Astriek /></label>
                <input value={registerDetails.password} name="password" onChange={handleInputChange} className="h-10 rounded-lg px-4 text-black" placeholder="Enter Password" />
            </div>

            <div className="flex items-center justify-end">
                <span>Have an account?</span><NavLink to="/login" className="underline text-blue-400 ml-1" >Sign in</NavLink>
            </div>

            <div className="w-full flex flex-col">
                <button className="rounded-lg py-2 bg-emerald-500 font-bold text-lg tracking-[1px]" onClick={handleUserRegister}>Register</button>
                <p className="text-red-600 text-xs mt-2 h-4">{error}</p>
            </div>
        </div>
    );
};

export default RegisterPage;
