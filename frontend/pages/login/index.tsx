import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { userLogin } from '@/api/user';
import { setUserDetails } from '@/store/userSlice';
import Image from 'next/image';

type LoginProps = {};

const Login:React.FC<LoginProps> = () => {

  const [loginDetails, setLoginDetails] = useState({ email: null, password: null });

  const user = useSelector((state: RootState) => state.user);

  const router = useRouter();
  const dispatch =  useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value, name } = e.target;

    setLoginDetails({
      ...loginDetails,
      [name]: value
    });

    e.stopPropagation();
  };

  useEffect(() => {
    console.log('USER', user);
    
    if (user.userLoggedIn) {
      router.push('/');
    }
  }, [user, router]);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const { email, password } = loginDetails;

    if (email && password) {
      const responseObj = await userLogin({ email, password });
      dispatch(setUserDetails(responseObj));
    }

    e.stopPropagation();
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div className='p-8 min-h-screen'>
      <main className="flex w-full min-h-[calc(100vh-64px)] text-primary-blue shadow-xl rounded-2xl overflow-hidden">
        <form className='flex flex-col justify-center items-center p-8 laptop:w-1/2 overflow-hidden'>

          <Image src={'/logo-black.png'} width={104} height={52} alt='CMS' />
          <div className='mb-12 text-3xl font-bold w-1/2'>Log in to your account</div>

          <label className='w-1/2'>Email</label>
          <Input type='email' onChange={handleChange} name='email' classes='w-1/2 mt-3 border rounded' />

          <label className='w-1/2 mt-6'>Password</label>
          <Input type='password' onChange={handleChange} name='password' classes='w-1/2 mt-3 border rounded' />

          <div className='flex justify-around items-center w-1/2'>
            <button onClick={handleLogin} className='mt-6 px-4 py-2 border rounded-xl bg-slate-400 active:bg-slate-700 text-primary-white'>Login</button>
            <button onClick={handleSignup} className='mt-6 px-4 py-2 border rounded-xl bg-orange-400 active:bg-orange-700 text-primary-white'>Sign up</button>
          </div>
        </form>

        <div className='hidden laptop:block w-1/2 relative'>
          <Image src={'/login.jpg'} alt='Login' className='w-full h-full' objectFit='cover' fill />
        </div>
      </main>
    </div>
  )
}

export default Login;
