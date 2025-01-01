import { useState } from "react";
import { NavLink } from "react-router";
import Astriek from "../../components/Common/Astriek";
import { forgotPassword } from "../../services/userServices";

type ForgotPasswordProps = {};

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {

    const [email, setEmail] = useState("");
    const [displayResetText, setDisplayResetText] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e: any) => {
        const value = e.target.value;
        setEmail(value);
    }

    const handleEnterEmailClick = () => {
        setDisplayResetText(false);
    }

    const handleOnError = (error: any) => {
        setError(error.message);
        setTimeout(() => {
            setError("")
        }, 5000);
    }

    const handleOnSuccess = () => {
        setDisplayResetText(true);
    }

    const handleSubmitResetPassword = (e: any) => {
        e.preventDefault();
        forgotPassword({ email }, { onSuccess: handleOnSuccess, onError: handleOnError })
    }

    if (displayResetText) {
        return (
            <div className="text-white flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-2 w-[450px]">
                    <div className="font-bold text-2xl">Password Reset Email Sent</div>

                    <div className="text-sm">If the email address you provided is associated with an account, you will receive a password reset email shortly. Please check your inbox (and spam folder) for instructions on how to reset your password.</div>

                    <div className="text-sm">If you don't see the email within a few minutes, try submitting your email <span className="underline text-blue-600 cursor-pointer" onClick={handleEnterEmailClick}>again</span> or contact our support team for assistance.</div>
                </div>
            </div>
        )
    }

    return (
        <div className="text-white flex flex-col gap-y-6">
            <div className="text-center text-4xl font-bold text-green-700 italic">Forgot Password</div>

            <div className="flex flex-col w-[400px] gap-y-2">
                <label>Email <Astriek /></label>
                <input value={email} name="email" onChange={handleInputChange} className="h-10 rounded-lg px-4 text-black" placeholder="Enter email" />
            </div>

            <div className="flex items-center justify-end">
                <span>Have an account?</span><NavLink to="/login" className="underline text-blue-400 ml-1" >Sign in</NavLink>
            </div>

            <div className="w-full flex flex-col">
                <button className="rounded-lg py-2 bg-emerald-500 font-bold text-lg tracking-[1px]" onClick={handleSubmitResetPassword}>Submit</button>
                <p className="text-red-600 text-xs mt-2 h-4">{error}</p>
            </div>
        </div>
    );
};

export default ForgotPassword;
