import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';

type SignupProps = {};

const Signup:React.FC<SignupProps> = () => {

  const [loginDetails, setLoginDetails] = useState({});

  const handleChange = (e: any) => {
    e.preventDefault();
    const { value, name } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value
    });
  };

  const router = useRouter();

  const handleSignup = () => {};

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form>
        <label>Email:</label>
        <Input type='email' onChange={handleChange} name='email' />

        <label>Password:</label>
        <Input type='password' onChange={handleChange} name='password' />

        <label>Confirm Password:</label>
        <Input type='password' onChange={handleChange} name='confirm_password' />

        <button onClick={handleSignup}>Signup</button>
      </form>
      <button onClick={handleLogin}>Login</button>
    </main>
  )
}

export default Signup;
