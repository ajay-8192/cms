import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import LoginForm from "@/components/LoginForm";
import { RootState } from "@/store";
import { ToasterProvider } from "@/context/ToasterContext";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const user = useSelector((state: RootState) => state.user);

  const router = useRouter();

  useEffect(() => {
    console.log("USER", user);

    if (user.userLoggedIn && Object.keys(user.userDetails).length) {
      console.log("=======> ");
      router.push("/");
    }
  }, [user, router]);

  return (
    <ToasterProvider>
      <div className="p-8 min-h-screen">
        <main className="flex w-full min-h-[calc(100vh-64px)] text-primary-blue shadow-xl rounded-2xl overflow-hidden">
          <LoginForm />

          <div className="block w-1/2 relative">
            <Image
              src={"/login.jpg"}
              alt="Login"
              className="w-full h-full"
              objectFit="cover"
              fill
            />
          </div>
        </main>
      </div>
    </ToasterProvider>
  );
};

export default Login;
