import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';

type LoginProps = {};

const Login:React.FC<LoginProps> = () => {

  const [loginDetails, setLoginDetails] = useState({ email: null, password: null });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value, name } = e.target;

    setLoginDetails({
      ...loginDetails,
      [name]: value
    });
  };

  const handleLogin = (e: any) => {

    e.preventDefault();

    const { email, password } = loginDetails;

    if (email && password) {
      fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      })
        .then(response => {
          if (response.ok) {
            router.push('/');
          } else {
            throw new Error('Error while login');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className='flex flex-col justify-center items-center w-2/4'>

        <label className='w-full'>Email:</label>
        <Input type='email' onChange={handleChange} name='email' classes='w-full mt-3 text-black' />

        <label className='w-full mt-6'>Password:</label>
        <Input type='password' onChange={handleChange} name='password' classes='w-full mt-3 text-black' />

        <button onClick={handleLogin} className='mt-6 px-4 py-2 bg-white text-black'>Login</button>
        
      </form>
      <button onClick={handleSignup} className='px-4 py-2 bg-white text-black'>Sign up</button>
    </main>
  )
}

export default Login;
