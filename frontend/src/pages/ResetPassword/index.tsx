import { ChangeEvent, useState } from "react";
import Astriek from "../../components/Common/Astriek";
import { useNavigate, useParams } from "react-router";
import { passwordReset } from "../../services/userServices";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {

    const { resetToken } = useParams();
    const navigate = useNavigate();

    const [resetPassword, setResetPassword] = useState({
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResetPassword({
            ...resetPassword,
            [name]: value
        });
    };

    const handleOnSuccess = (_: any) => {
        console.log('===> SUCCESS!!');
        navigate("/login");
    }
    const handleOnError = (error: any) => {
        setError(error.message);
        setTimeout(() => {
            setError("")
        }, 5000);
    }

    const handleSubmitPassword = () => {
        console.log('====> PASSWORD RESET!');
        if (resetToken) {
            const payload = {
                ...resetPassword,
                resetToken
            }
            passwordReset(payload, { onSuccess: handleOnSuccess, onError: handleOnError })
        }
    };

    return (
        <div className="text-white flex flex-col gap-y-6">
            
            <div className="text-center text-4xl font-bold text-green-700 italic">Reset Password</div>

            <div className="flex flex-col w-[400px] gap-y-2">
                <label>Password <Astriek /></label>
                <input value={resetPassword.password} name="password" onChange={handleInputChange} className="h-10 rounded-lg px-4 text-black" placeholder="Enter password" />
            </div>

            <div className="flex flex-col w-[400px] gap-y-2">
                <label>Confirm Password <Astriek /></label>
                <input value={resetPassword.confirmPassword} name="confirmPassword" onChange={handleInputChange} className="h-10 rounded-lg px-4 text-black" placeholder="Enter Confirm Password" />
            </div>

            <div className="w-full flex flex-col">
                <button className="rounded-lg py-2 bg-emerald-500 font-bold text-lg tracking-[1px]" onClick={handleSubmitPassword}>Submit</button>
                <p className="text-red-600 text-xs mt-2 h-4">{error}</p>
            </div>
        </div>
    );
};

export default ResetPassword;
