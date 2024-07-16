import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Input from "@/components/Input";
import { userLogin } from "@/api/user";
import { setUserDetails } from "@/store/userSlice";

const LoginForm = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value, name } = e.target;

    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });

    e.stopPropagation();
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const { email, password } = loginDetails;

    const responseObj = await userLogin({ email, password });
    if (responseObj.validObj.isValid && responseObj.userDetails) {
      console.log("=======> Login", { responseObj });

      dispatch(setUserDetails(responseObj.userDetails));
    }

    e.stopPropagation();
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 w-1/2 overflow-hidden">
      <Image src={"/logo-black.png"} width={104} height={52} alt="CMS" />
      <div className="mb-6 font-bold w-2/3 text-3xl">
        Log in to your account
      </div>

      <label className="w-2/3 mt-6">Email</label>
      <Input
        type="email"
        onChange={handleChange}
        name="email"
        classes="w-2/3 mt-3 border rounded shadow h-10 px-4"
      />

      <label className="w-2/3 mt-6">Password</label>
      <Input
        type="password"
        onChange={handleChange}
        name="password"
        classes="w-2/3 mt-3 border rounded shadow h-10 px-4"
      />

      <div className="flex justify-between items-center w-2/3">
        <button
          onClick={handleSignup}
          className="mt-6 px-6 w-32 py-2 border rounded-xl bg-orange-400 active:bg-orange-700 text-primary-white"
        >
          Sign up
        </button>
        <button
          onClick={handleLogin}
          className="mt-6 px-6 w-32 py-2 border rounded-xl bg-slate-400 active:bg-slate-700 text-primary-white"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
